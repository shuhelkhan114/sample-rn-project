export interface Addiction {
  id: string
  name: string
  description: string
  parent_id: string
  cover_image: string
  created_at: string
  updated_at: string
  sub_addictions?: Addiction[]
  sober_days?: number
}
export interface ParentAddiction {
  id: string
  name: string
  sober_days: number
  cover_image: string
  description: string
  parent_id: null | string
}
