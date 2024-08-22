export interface CheckIn {
  id: string
  user_id: string
  addiction_id: string
  days: number
  mood: string
  relapse: boolean
  support: string
  notes: string
  job_id: string
  created_at: string
  updated_at: string
  urge: boolean
  addiction_notes: string
  honest: boolean
  other_notes: string
  thankfull_notes: string
  addition_name?: string
}
