import { Addiction, ParentAddiction } from './addiction'
import { CheckIn } from './checkin'
import { GenderValue } from './common'
import { RecoveryCoach } from './recoveryCoach'

export interface DebtQuestions {
  hasDebt: boolean
  totalDebtAmount: number
  debtNature: string[]
  debtCreditors: string[]
  assets: string[]
  abilityToMakeMinimumPayments: string
  employmentStatus: string
  creditScore: number
  householdIncome: number
  estimatedTimeToPayOffWithoutHelp: string
  previousDebtReliefService: string[]
  mainGoal: string[]
  fullName: string
  address: string
}

export interface User {
  email_verified: boolean
  apple_id: string
  created_at: string
  date_of_birth: string
  device_tokens: []
  email: string
  firebase_id: string
  gender: GenderValue
  google_id: string
  id: string
  location_city: string
  identity_revealed: boolean
  job_id: string
  location_state: string
  meta_id: string
  recovery_coach_verified: string
  stream_activity_token: string
  stream_chat_token: string
  subscription_plan: string
  updated_at: string
  user_image: string
  avatar_image: string
  checkins: CheckIn[]
  money_lost_month?: number
  hours_spend_day: number
  /** local type so that we don't have to use inline type casing */
  name: string
  user_name: string
  user_source: string
  addictions: Addiction[]
  parent_addictions: ParentAddiction[]
  requested_deletion: boolean
  recovery_coach?: RecoveryCoach
  revealed_to_community: boolean
  onboarding_done: boolean
  revealed_to_user: User[]
  recovery_coach_id: string
  last_gamble_day: string
  money_lost_total: number
  money_lost_within_years: number
  debt: DebtQuestions
  debt_onboarding_done: boolean
  reminder_image?: string
  reminder_text?: string
  user_bio?: string
}

export interface FinancialManager {
  id: string
  email: string
  firebase_id: string
  email_verified: boolean
  name: string
  about: string
  user_image: string
  stream_chat_token: string
  stream_activity_token: string
  device_tokens: any[]
  job_id: string
  created_at: string
  updated_at: string
}
