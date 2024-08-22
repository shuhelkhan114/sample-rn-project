import { Addiction, ParentAddiction } from './addiction'
import { GenderValue } from './common'

export interface RecoveryCoach {
  id: string
  email: string
  name: string
  /** local type so that we don't have to use inline type casing */
  user_name?: string
  bio: string
  user_image: string
  avatar_image: string
  gender: GenderValue
  done_onboarding: boolean
  soberness: string
  status: string
  date_of_birth: string
  location_state: string
  firebase_id: string
  stream_chat_token: string
  calendly_link: string
  stream_activity_token: string
  device_tokens: []
  addictions: Addiction[]
  parent_addictions: ParentAddiction[]
  job_id: string
  created_at: string
  updated_at: string
}
