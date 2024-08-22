import auth from '@react-native-firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { ChevronRight, LogOut, Trash2 } from 'react-native-feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import FireIcon from '~/components/Icons/FireIcon'
import PersonIcon from '~/components/Icons/PersonIcon'
import ScanIcon from '~/components/Icons/ScanIcon'
import Modal from '~/components/Modal/Modal'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { UserRole } from '~/context/AuthContext'
import toast from '~/core/lib/toast'
import { useActivity } from '~/hooks/useActivity'
import useAuth from '~/hooks/useAuth'
import { useChat } from '~/hooks/useChat'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'
import UserImage from './UserImage/UserImage'

type AccountScreenProps = NativeStackScreenProps<MainStackScreens, Screens.AccountScreen>

export type AccountScreenParams = undefined

const AccountScreen: React.FC<AccountScreenProps> = (props) => {
  const { navigation } = props
  const { state, currentUser, updateState, refetchProfile } = useAuth()

  const theme = useAppTheme()

  const queryClient = useQueryClient()
  const { logout: logoutActivity } = useActivity()
  const { logout: logoutChat, setChannel } = useChat()
  const [deletePopup, setDeletePopup] = useState(false)
  const [requestedDeletion, setRequestedDeletion] = useState(false)

  const { isPending: loggingOut, mutate: logout } = useMutation({
    mutationFn: async () => {
      updateState({
        ...state,
        // @ts-ignore
        user: {
          ...state.user,
          onboarding_done: false,
        },
      })
      setTimeout(() => {
        // @ts-ignore
        navigation.navigate(Screens.GetStartedScreen)
      }, 0)
      await AsyncStorage.clear()
      await auth().signOut()
      await queryClient.resetQueries()
      logoutActivity()
      setChannel(null)
      await logoutChat()
    },
  })

  useEffect(() => {
    const checkRequestedDeletion = async () => {
      const requested = await AsyncStorage.getItem('requestedDeletion')
      setRequestedDeletion(requested === 'true')
    }

    checkRequestedDeletion()
  }, [])

  const { isPending: requestingDeletion, mutate: requestDeletion } = useMutation({
    // TODO: Integrate with backend
    mutationFn: async () => {
      await AsyncStorage.setItem('requestedDeletion', 'true')
    },
    onSuccess(res) {
      setRequestedDeletion(true)
      refetchProfile()
      setDeletePopup(false)
      toast.success('Requested', 'Account Deletion Requested!')
    },
    onError(error: any) {
      setDeletePopup(false)
      toast.error('Request', `${error.message || 'Account Deletion failed'}`)
    },
  })

  const { top } = useSafeAreaInsets()

  const handleLogout = async () => {
    if (!loggingOut) {
      logout()
    }
  }

  const handleReveal = () => {
    navigation.navigate(Screens.PreparePublicProfileScreen)
  }

  const handleViewPersonalInformation = () => {
    navigation.navigate(Screens.PersonalInformationScreen)
  }

  const handleViewAddictions = () => {
    navigation.navigate(Screens.MyAddictionsScreen)
  }

  const handleDelete = async () => {
    requestDeletion()
  }

  const handleStartDeleteAccount = () => {
    if (!requestedDeletion) {
      setDeletePopup(true)
    }
  }

  return (
    <Block flex1 style={{ paddingTop: top }}>
      <Block>
        <Typography center variation="title6SemiBold">
          My Profile
        </Typography>
      </Block>

      <Modal position="center" visible={deletePopup} onClose={() => setDeletePopup(false)}>
        <Block>
          <Typography variation="title4SemiBold">Confirm Account Deletion</Typography>
          <Typography mT="xl" color="gray500" variation="paragraphRegular">
            Are you sure you want to delete your account? This will permanently erase all your data
            from Yume, including your profile and activity history. This action cannot be undone.
            Once confirmed the account will be deleted in 30 days
          </Typography>

          <Block mT="xl">
            <Button
              loading={requestingDeletion}
              onPress={handleDelete}
              title="Delete My Account"
              style={{ backgroundColor: theme.colors.negative }}
            />
            <Button
              mT="xl"
              mR="xl"
              title="Cancel"
              variation="tertiary"
              onPress={() => setDeletePopup(false)}
            />
          </Block>
        </Block>
      </Modal>

      <ScrollView pH="xxxl">
        <Block mT="xxxl" align="center" justify="center">
          <UserImage />

          {currentUser.name ? (
            <Typography mT="lg" variation="paragraphSemiBold">
              {currentUser.name}
            </Typography>
          ) : null}

          {currentUser.username ? (
            <Typography color="gray600" mT="sm" variation="descriptionRegular">
              @{currentUser.username}
            </Typography>
          ) : null}

          {!currentUser.revealed_to_community && currentUser.role === UserRole.User ? (
            <Block mT="lg" flexDirection="row" align="center" onPress={handleReveal}>
              <ScanIcon fill={theme.colors.primary} />
              <Typography mL="md" color="primary" variation="paragraphSemiBold">
                Reveal Yourself to everyone
              </Typography>
            </Block>
          ) : null}
        </Block>

        <Block mT="xxxl">
          <Block
            pV="lg"
            pH="xl"
            shadow="sm"
            rounded="lg"
            align="center"
            bgColor="white"
            flexDirection="row"
            justify="space-between"
            onPress={handleViewPersonalInformation}>
            <Block mR="xl" pH="sm" pV="sm" bgColor="gray100" rounded="md">
              <PersonIcon fill={theme.colors.gray700} />
            </Block>
            <Typography mR="auto" variation="descriptionSemiBold">
              Personal Information
            </Typography>
            <ChevronRight stroke={theme.colors.gray700} fontSize={20} />
          </Block>
        </Block>

        <Block mT="xl">
          <Block
            pV="lg"
            pH="xl"
            shadow="sm"
            rounded="lg"
            align="center"
            bgColor="white"
            flexDirection="row"
            justify="space-between"
            onPress={handleViewAddictions}>
            <Block mR="xl" pH="sm" pV="sm" bgColor="gray100" rounded="md">
              <FireIcon stroke={theme.colors.gray700} />
            </Block>
            <Block mR="auto" flex1>
              <Typography variation="descriptionSemiBold">My addictions</Typography>
              <Block flexDirection="row" wrap>
                {currentUser.parent_addictions.map((addiction) => {
                  return (
                    <Block
                      pH="lg"
                      mT="sm"
                      pV="xs"
                      mR="md"
                      rounded="md"
                      bgColor="gray100"
                      key={addiction.id}>
                      <Typography color="gray800" variation="smallRegular">
                        {addiction.name}
                      </Typography>
                    </Block>
                  )
                })}
              </Block>
            </Block>
            <ChevronRight stroke={theme.colors.gray700} fontSize={20} />
          </Block>
        </Block>

        <Block mT="xl" onPress={handleStartDeleteAccount}>
          <Block
            pV="lg"
            pH="xl"
            shadow="sm"
            rounded="lg"
            align="center"
            bgColor="white"
            flexDirection="row"
            justify="space-between">
            <Block mR="xl" pH="sm" pV="sm" rounded="md">
              <Trash2 stroke={theme.colors.negative} />
            </Block>
            <Typography color="negative" mR="auto" variation="descriptionSemiBold">
              {requestedDeletion ? 'Pending account deletion' : 'Delete Account'}
            </Typography>
            <ChevronRight stroke={theme.colors.negative} fontSize={20} />
          </Block>
        </Block>

        <Block mT="xl" onPress={handleLogout}>
          <Block
            pV="lg"
            pH="xl"
            shadow="sm"
            rounded="lg"
            align="center"
            bgColor="white"
            flexDirection="row"
            justify="space-between">
            <Block mR="xl" pH="sm" pV="sm" rounded="md">
              <LogOut stroke={theme.colors.negative} />
            </Block>
            <Typography color="negative" mR="auto" variation="descriptionSemiBold">
              {loggingOut ? 'Logging out...' : 'Logout'}
            </Typography>
            <ChevronRight stroke={theme.colors.negative} fontSize={20} />
          </Block>
        </Block>
      </ScrollView>
    </Block>
  )
}

export default AccountScreen
