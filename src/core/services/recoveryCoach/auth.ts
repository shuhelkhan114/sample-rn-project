import auth from '@react-native-firebase/auth'
import apiInstance from '~/core/lib/axios'
import { Addiction } from '~/typings/addiction'
import { CheckIn } from '~/typings/checkin'
import { GenderValue } from '~/typings/common'
import { RecoveryCoach } from '~/typings/recoveryCoach'

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
  password: string
  invitationId?: string
}

export const signup = async (params: SignUpParams) => {
  await apiInstance.post('/recoverycoaches/signup', params)
}

export const signIn = async (params: SignUpParams) => {
  await apiInstance.post('/recoverycoaches/signup', params)
}

export const fetchProfile = async () => {
  return await apiInstance.get<RecoveryCoach>('/recoverycoaches/profile')
}

interface UpdateProfileParams {
  gender?: GenderValue
  name?: string
  bio?: string
  date_of_birth?: string
  location_state?: string
  addiction_ids?: string[]
  user_image?: string
  done_onboarding?: boolean
  soberness?: string
  device_tokens?: string[]
}

export const updateProfile = async (params: UpdateProfileParams) => {
  return await apiInstance.put<RecoveryCoach>('/recoverycoaches/profile', params, {})
}

export const uploadImage = async (imageFile: string) => {
  const formData = new FormData()

  // @ts-ignore
  formData.append('file', {
    uri: imageFile,
    name: imageFile.split('/').reverse()[0],
    type: 'image/jpeg',
  })

  return await apiInstance.post<{ image_url: string }>('/recoverycoaches/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8; boundary=------random-boundary',
    },
  })
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
  return await apiInstance.get<UserResponse>(`/recoverycoaches/view/users/profile/${userId}`)
}

export const getRecoveryCoach = async (userId: string) => {
  return await apiInstance.get<UserResponse>(`/recoverycoaches/view/profile/${userId}`)
}

export const getCheckins = async (id: string) => {
  return await apiInstance.get<CheckIn>(`/checkins/users/${id}`)
}
