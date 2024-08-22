import { colors } from '~/core/styles/theme'

export interface PostType {
  id: string
  name: string
  color: keyof typeof colors
}

export interface PostCategory {
  id: string
  name: string
  followers?: number
  isFollowing?: boolean
}
