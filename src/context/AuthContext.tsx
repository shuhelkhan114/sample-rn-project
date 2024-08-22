import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import messaging from '@react-native-firebase/messaging'
import { AxiosError } from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import Purchases from 'react-native-purchases'
import ENV from '~/core/config/env'
import { analytics } from '~/core/lib/analytics'
import toast from '~/core/lib/toast'

import API from '~/core/services'
import { getErrorMessage } from '~/core/utils/apiError'
import { navigationRef, waitForNavigationToBeReady } from '~/core/utils/navigation'
import { getRootAddictions } from '~/core/utils/transform'
import { useActivity } from '~/hooks/useActivity'
import { useChat } from '~/hooks/useChat'
import { Screens } from '~/navigation/screens'
import { CheckIn } from '~/typings/checkin'
import { ParentAddiction, RootAddiction } from '~/typings/config'
import { RecoveryCoach } from '~/typings/recoveryCoach'
import { FinancialManager, User } from '~/typings/user'

// Enums
export enum UserRole {
  User = 'user',
  RecoveryCoach = 'recoverycoach',
  FinancialManager = 'financialmanager',
}

export enum SubscriptionPlan {
  ONETIME = 'yume_one_time',
  LifetimeCommunity = 'yume_lifetimeiap',
  YearlyCommunity = 'yume_yearly_community',
  MonthlyCommunity = 'yume_monthly_community',
  MonthlyCoach = 'yume_monthly',
}

// Interfaces
interface CurrentUser {
  id: string
  name: string
  displayImage: string
  avatarImage: string
  userImage: string
  username?: string
  checkins?: CheckIn[]
  displayName: string
  background?: string
  resources?: string
  additional_info?: string
  addictions: RootAddiction[]
  parent_addictions: ParentAddiction[]
  requested_deletion?: boolean
  revealed_to_community?: boolean
  role: UserRole | null
  subscription_plan?: string
  revealedUsers?: string[]
  email: string
  dateOfBirth: string | null
  gender: string
  state: string
  doneOnboarding: boolean
  calendly_link?: string
  reminder_image?: string
  reminder_text?: string
  user_bio?: string
}

interface State {
  user: User | null
  widgets: {
    total_days: number
    soberness_days: number
    soberness_percentage: number
    cash_saved: number
    hours_saved: number
    soberness_streak: number
  } | null
  fetchingProfile: boolean
  recoveryCoach: RecoveryCoach | null
  financialManager: FinancialManager | null
  role: UserRole | null
  errorFetchingProfile: boolean
  completedOnboarding: boolean
}

// Default state
const defaultState: State = {
  user: null,
  widgets: null,
  fetchingProfile: false,
  recoveryCoach: null,
  financialManager: null,
  role: null,
  errorFetchingProfile: false,
  completedOnboarding: false,
}

const defaultCurrentUser: CurrentUser = {
  id: '',
  displayName: '',
  name: '',
  username: '',
  displayImage: '',
  revealed_to_community: false,
  addictions: [],
  parent_addictions: [],
  requested_deletion: false,
  role: null,
  revealedUsers: [],
  avatarImage: '',
  userImage: '',
  email: '',
  dateOfBirth: null,
  gender: '',
  state: '',
  doneOnboarding: false,
  subscription_plan: '',
  checkins: [],
}

// Component Interface
interface AuthContextValues {
  loaded: boolean
  state: State
  // TODO: this is a temporary solution
  blockedUsers?: string[]
  currentUser: CurrentUser
  blockUser: (userId: string) => void
  unblockUser: (userId: string) => void
  refetchProfile: (date?: Date) => void
  updateState: (state: Partial<State>) => void
}

export const AuthContext = React.createContext<AuthContextValues>({
  loaded: false,
  state: defaultState,
  blockedUsers: [],
  currentUser: defaultCurrentUser,
  refetchProfile: () => {},
  updateState: () => {},
  blockUser: () => {},
  unblockUser: () => {},
})

interface AuthContextProps {
  children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = (props) => {
  const { children } = props
  const [state, setState] = useState(defaultState)
  const [loaded, setLoaded] = useState(false)
  const [blockedUsers, setBlockedUsers] = useState<string[]>([])

  const { setupClient } = useActivity()
  const { setupChatClient } = useChat()

  // Firebase Auth Listener
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const tokenResult = await auth().currentUser?.getIdTokenResult()

          let dbUser
          await waitForNavigationToBeReady()

          if (tokenResult?.claims.role === UserRole.RecoveryCoach) {
            dbUser = await API.recoveryCoach.fetchProfile()
            updateState({ recoveryCoach: dbUser, role: UserRole.RecoveryCoach })
            const token = await messaging().getToken()

            API.recoveryCoach.updateProfile({
              device_tokens: [token],
            })

            AsyncStorage.multiSet([
              ['userId', dbUser.id],
              ['userName', dbUser.name],
              ['userToken', dbUser.stream_chat_token],
            ])

            if (!dbUser.done_onboarding) {
              navigationRef.current.navigate(Screens.RecoveryCoachSelectNameScreen)
            }
          } else if (tokenResult?.claims.role === UserRole.User) {
            const profile = await API.user.fetchProfile()
            dbUser = profile.user
            updateState({ user: dbUser, widgets: profile.widgets, role: UserRole.User })

            AsyncStorage.multiSet([
              ['userId', dbUser.id],
              ['userName', dbUser.user_name],
              ['userToken', dbUser.stream_chat_token],
            ])

            analytics.setUser(dbUser.id, {
              username: dbUser.user_name,
              name: dbUser.name,
              gender: dbUser.gender,
              email: dbUser.email,
              state: dbUser.location_state,
            })

            if (!dbUser.onboarding_done) {
              if (tokenResult?.claims?.firebase?.sign_in_provider === 'google.com') {
                analytics.logSignUpWithGoogle()
              } else if (tokenResult?.claims?.firebase?.sign_in_provider === 'apple.com') {
                analytics.logSignUpWithApple()
              } else {
                analytics.logSignUpWithEmail()
              }

              if (dbUser.email_verified) {
                navigationRef.current.navigate(Screens.UsernameScreen)
              } else {
                navigationRef.current.navigate(Screens.VerificationScreen, {
                  forgetPassword: false,
                  email: dbUser.email,
                })
              }
            }

            const token = await messaging().getToken()
            API.user.updateProfile({
              device_tokens: [token],
            })
          } else {
            dbUser = await API.financialManager.fetchProfile()
            updateState({ financialManager: dbUser, role: UserRole.FinancialManager })

            AsyncStorage.multiSet([
              ['userId', dbUser.id],
              ['userName', dbUser.name],
              ['userToken', dbUser.stream_chat_token],
            ])

            // const token = await messaging().getToken()
            // API.financialManager.updateProfile({
            //   device_tokens: [token],
            // })
          }

          Purchases.configure({
            apiKey: ENV.revenueCat.ios,
            usesStoreKit2IfAvailable: false,
            appUserID: dbUser.id,
          })

          setupClient(dbUser.id, dbUser.stream_activity_token)
          setupChatClient(dbUser.id, dbUser.stream_chat_token)
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error?.status === 404 || error?.response?.status === 404) {
              await auth().signOut()
            }
            updateState({ errorFetchingProfile: true })
          }
        } finally {
          setLoaded(true)
        }
      } else {
        setState(defaultState)
        setLoaded(true)
      }
    })
    return subscriber
  }, [])

  const updateState = (newData: Partial<State>) => {
    setState((prevState) => ({
      ...prevState,
      ...newData,
    }))
  }

  const refetchProfile = async () => {
    try {
      updateState({ fetchingProfile: true })
      let dbUser
      if (state.role === 'user') {
        dbUser = await API.user.fetchProfile()
        updateState({ user: dbUser.user, widgets: dbUser.widgets })
      } else {
        dbUser = await API.recoveryCoach.fetchProfile()
        updateState({ recoveryCoach: dbUser })
      }
    } catch (error) {
      toast.error('Error', getErrorMessage(error))
      updateState({ errorFetchingProfile: true })
    } finally {
      updateState({ fetchingProfile: false })
    }
  }

  const blockUser = async (userId: string) => {
    const res = await AsyncStorage.getItem('blockedUsers')
    const existingUsers = JSON.parse(res || '[]') || []
    const newUsers = [...existingUsers, userId]
    setBlockedUsers(newUsers)
    await AsyncStorage.setItem('blockedUsers', JSON.stringify(newUsers))
  }

  const unblockUser = async (userId: string) => {
    const res = await AsyncStorage.getItem('blockedUsers')
    const existingUsers = (JSON.parse(res || '[]') || []) as string[]
    const newUsers = existingUsers.filter((uId) => uId !== userId)
    setBlockedUsers(newUsers)
    await AsyncStorage.setItem('blockedUsers', JSON.stringify(newUsers))
  }

  useEffect(() => {
    async function init() {
      const res = await AsyncStorage.getItem('blockedUsers')
      const existingUsers = JSON.parse(res || '[]') || []
      setBlockedUsers(existingUsers)
    }
    init()
  }, [])

  const currentUser: CurrentUser = useMemo(() => {
    if (state.role === UserRole.RecoveryCoach && state.recoveryCoach) {
      return {
        id: state.recoveryCoach.id,
        displayName: state.recoveryCoach.name,
        name: state.recoveryCoach.name,
        displayImage: state.recoveryCoach.user_image,
        addictions: getRootAddictions(state.recoveryCoach.addictions),
        parent_addictions: state.recoveryCoach.parent_addictions,
        role: UserRole.RecoveryCoach,
        avatarImage: state.recoveryCoach.avatar_image,
        userImage: state.recoveryCoach.user_image,
        email: state.recoveryCoach.email,
        dateOfBirth: state.recoveryCoach?.date_of_birth,
        gender: state.recoveryCoach?.gender,
        state: state.recoveryCoach?.location_state,
        doneOnboarding: state.recoveryCoach.done_onboarding,
        calendly_link: state.recoveryCoach.calendly_link,
      }
    } else if (state.role === UserRole.User && state.user) {
      return {
        id: state.user.id,
        displayName: state.user.revealed_to_community ? state.user.name : state.user.user_name,
        username: state.user.user_name,
        name: state.user.name,
        displayImage: state.user.revealed_to_community
          ? state.user.user_image || state.user.avatar_image
          : state.user.avatar_image,
        addictions: getRootAddictions(state.user.addictions),
        parent_addictions: state.user.parent_addictions,
        requested_deletion: state.user.requested_deletion,
        revealed_to_community: state.user.revealed_to_community,
        role: UserRole.User,
        avatarImage: state.user.avatar_image,
        checkins: state.user.checkins,
        userImage: state.user.user_image,
        subscription_plan: state?.user?.subscription_plan,
        email: state.user.email,
        revealedUsers: state.user?.revealed_to_user.map((user) => user.id),
        gender: state.user?.gender,
        dateOfBirth: state.user.date_of_birth,
        state: state.user.location_state,
        doneOnboarding: state.user.onboarding_done,
        reminder_image: state.user.reminder_image,
        reminder_text: state.user.reminder_text,
        user_bio: state.user.user_bio,
      }
    } else if (state.role === UserRole.FinancialManager && state.financialManager) {
      return {
        id: state.financialManager?.id,
        displayName: state.financialManager?.name,
        name: state.financialManager?.name,
        displayImage: state.financialManager?.user_image,
        addictions: [],
        parent_addictions: [],
        role: UserRole.FinancialManager,
        avatarImage: state.financialManager?.user_image,
        userImage: state.financialManager?.user_image,
        email: state.financialManager?.email,
        dateOfBirth: null,
        doneOnboarding: true,
        gender: '',
        state: '',
      }
    } else {
      return defaultCurrentUser
    }
  }, [state])

  return (
    <AuthContext.Provider
      value={{
        loaded,
        state,
        currentUser,
        blockedUsers,
        updateState,
        refetchProfile,
        blockUser,
        unblockUser,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
