import auth from '@react-native-firebase/auth'
import { SubscriptionPlan } from '~/context/AuthContext'
import apiInstance from '~/core/lib/axios'
import { Addiction } from '~/typings/addiction'
import { CheckIn } from '~/typings/checkin'
import { GenderValue, SocialLoginTypes } from '~/typings/common'
import { RecoveryCoach } from '~/typings/recoveryCoach'
import { DebtQuestions, User } from '~/typings/user'
import AUTHCONSTANTS from './authConstants'

interface FirebaseSignUpParams {
  email: string
  password: string
}

export const firebaseSignup = async (params: FirebaseSignUpParams) => {
  const { email, password } = params
  return await auth().createUserWithEmailAndPassword(email, password)
}

interface SignUpParams {
  email: string
  user_source: SocialLoginTypes
  password?: string
  apple_id?: string
  google_id?: string
  device_tokens?: string[]
}

export const signup = async (params: SignUpParams) => {
  return await apiInstance.post('/users/signup', params)
}

interface VerifyEmailParams {
  otp: string
  email?: string
}

export const verifyEmail = async (params: VerifyEmailParams) => {
  await apiInstance.post('/users/verifyEmail', params)
}

export const forgotVerifyEmail = async (params: VerifyEmailParams) => {
  await apiInstance.post('/users/verifyForgotPasswordCode', params)
}

interface VerifyUpdateEmailParams {
  otp: string
  email: string
  password: string
}

export const verifyUpdatePassword = async (params: VerifyUpdateEmailParams) => {
  await apiInstance.post('/users/verifyUpdatePassword', params)
}

interface resendEmailParams {
  email: string
}

export const resendVerifyEmail = async (params: resendEmailParams) => {
  await apiInstance.post('/users/resendVerificationEmail', params)
}

export const forgetPassword = async (params: resendEmailParams) => {
  await apiInstance.post('/users/forgotPasswordCode', params)
}

export const resendForgetPasswordVerifyEmail = async (params: resendEmailParams) => {
  await apiInstance.post('/users/resendCode', params)
}

export interface FetchProfileResponse {
  user: User
  widgets: {
    total_days: number
    soberness_days: number
    soberness_percentage: number
    cash_saved: number
    hours_saved: number
    soberness_streak: number
  }
}

export const fetchProfile = async () => {
  return await apiInstance.get<FetchProfileResponse>('/users/profile')
}

interface UpdateProfileParams {
  name?: string | null
  date_of_birth?: string | null
  gender?: GenderValue
  location_state?: string
  user_image?: string | null
  avatar_image?: string | null
  user_name?: string
  onboarding_done?: boolean
  subscription_plan?: SubscriptionPlan
  addiction_ids?: string[]
  device_tokens?: string[]
  revealed_to_community?: boolean
  background?: string
  additional_info?: string
  resources?: string
  last_gamble_day?: string | null
  money_lost_total?: number
  hours_spend_day: number
  money_lost_within_years: number
  money_lost_within_months: number
  debt: DebtQuestions
  debt_onboarding_done: boolean
  location_city: string
  phone_number: string
  transaction_id: string
  family_members: Array<{
    name: string
    email?: string
    phone?: string
    relationship?: string
  }>
  revenuecat_customer_id: string
  reminder_text: string
  reminder_image: string
  user_bio: string
  email?: string
}

export const updateProfile = async (params: Partial<UpdateProfileParams>) => {
  return await apiInstance.put('/users/profile', params)
}

interface revealYourSelfParams {
  revealed_to_community?: boolean
  reveal_to_user_id?: string
}

export const revealYourSelf = async (params: revealYourSelfParams) => {
  return await apiInstance.post(`${AUTHCONSTANTS.REVEAL_USER}`, params)
}

export const fetchUsername = async () => {
  return await apiInstance.get<string>('/users/username')
}

export const uploadImage = async (imageFile: string) => {
  const formData = new FormData()

  // @ts-ignore
  formData.append('file', {
    uri: imageFile,
    name: imageFile.split('/').reverse()[0],
    type: 'image/jpeg',
  })

  return await apiInstance.post<{ image_url: string }>('/users/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8; boundary=------random-boundary',
    },
  })
}

interface MatchRecoveryCoach {
  recovery_coach: RecoveryCoach
}

export const matchRecoveryCoach = async () => {
  return await apiInstance.get<MatchRecoveryCoach>('/users/match/recoverycoach')
}

export const recommendedRecoveryCoach = async () => {
  return await apiInstance.get<RecoveryCoach[]>('users/recommend/recoverycoaches')
}

interface AssignRecoveryCoachResponse {
  recoveryCoach: RecoveryCoach
}

export const assignRecoveryCoach = async (recoveryCoachId: string) => {
  return await apiInstance.post<AssignRecoveryCoachResponse>(
    `/users/assign/recoverycoach/${recoveryCoachId}`
  )
}

export interface CreateCheckInParams {
  addiction_id: string
  honest: boolean
  urge?: boolean
  mood: string
  other_notes: string
  thankfull_notes: string
  addiction_notes: string
}

export const createCheckIn = async (params: CreateCheckInParams[]) => {
  return await apiInstance.post<string>('/checkins', params)
}

interface UserResponse {
  id: string
  name: string
  image: string
  addictions: Addiction[]
  created_at: string
  bio?: string
}

export const getUser = async (userId: string) => {
  return await apiInstance.get<UserResponse>(`/users/view/profile/${userId}`)
}

export const getCheckIn = async (checkInId: string) => {
  return Promise.resolve({
    id: '11704bc2-c7c7-47a2-a189-912144bc8e9c',
    user_id: '92dd25de-e04c-4301-8216-9d42c73fd304',
    addiction_id: 'ddb70ee2-f56a-4b8e-9362-369cb7b205cb',
    days: 3,
    mood: 'Unhappy',
    relapse: false,
    honest: true,
    urge: true,
    thankfull_notes: 'hello',
    other_notes: '',
    addiction_notes: '',
    support: 'any',
    notes: 'test',
    job_id: 'W0ZvqNubnAepYUijGM6cNkZZyG53',
    created_at: '2023-10-13T06:41:12.246Z',
    updated_at: '2023-10-13T06:41:12.246Z',
  })
}

export const getAllCheckins = async () => {
  return await apiInstance.get<CheckIn[]>('/checkins/mine')
}
export const getCheckins = async (id: string) => {
  return await apiInstance.get<CheckIn>(`/checkins/mine/${id}`)
}

export const getRecoveryCoach = async (recoveryCoachId: string) => {
  return await apiInstance.get<UserResponse>(`/recoverycoaches/view/profile/${recoveryCoachId}`)
}

export const updateSubscription = async (plan: string, transactionId: string) => {
  const data: any = { subscription_plan: plan, transaction_id: transactionId }
  return await apiInstance.put<any>('/users/profile', data)
}

export const userDeletionRequest = async () => {
  return await apiInstance.post('/users/requestDeletion')
}

export const getNearestCities = async (state: string) => {
  return await apiInstance.get<string[]>(`/meetings/cities/${state}`)
}

interface Meeting {
  meeting: {
    id: string
    weekday: string
    name: string
    meeting_type: string
    city: string
    meeting_id: string
    state: string
    meeting_starttime: string
    meeting_source: string
    meeting_passcode: string
    meeting_link: string
    job_id: string
    created_at: string
    updated_at: string
  }
  local_time: string
  status: string
}

export const fetchUpcomingMeetings = async (timezone: string) => {
  const url = '/meetings/upcoming/' + encodeURIComponent(timezone)
  return await apiInstance.get<Meeting[]>(url)
}
