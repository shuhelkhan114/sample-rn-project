import { Addiction } from './addiction'

export interface RootAddiction {
  id: string
  name: string
  sober_days: number
}
export interface ParentAddiction {
  id: string
  name: string
  sober_days: number
  cover_image: string
  description: string
  parent_id: null | string
}

export interface Config {
  user_profile_avatars: string[]
  addictions: Addiction[]
  therapist_responsibilities: Array<{
    id: number
    text: string
  }>
  financial_manager: {
    id: string
    email: string
    firebase_id: string
    email_verified: boolean
    name: string
    about: string
    user_image: string
    stream_chat_token: string
    stream_activity_token: string
    device_tokens: string[]
    job_id: string
    created_at: string
    updated_at: string
  }
}
