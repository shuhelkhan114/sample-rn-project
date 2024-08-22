import * as stream from 'getstream'
import { UserRole } from '~/context/AuthContext'

export type StreamUser = {
  yumeEmail: string
  yumeImage: string
  yumeAvatar: string
  yumeName: string
  yumeUserName: string
  yumeRole: UserRole
  yumeRevealedCommunity: boolean
  yumeRevealedUser: string[] | null
}

export type Actor = {
  created_at: string
  updated_at: string
  id: string
  data: StreamUser
}

export type Post = {
  actor: Actor
  category: string
  foreign_id: string
  id: string
  createdAt: string
  object: string
  origin: string
  postType: string
  target: string
  time: string
  title: string
  to: string[]
  tweet: string
  verb: string
  latest_reactions: {
    like: Like[]
    comment: Comment[]
  }
  own_reactions?: {
    like: Like[]
  }
  reaction_counts?: {
    like: number
    comment: number
  }
  // local fields
  recentlyCreated: boolean
} & stream.DefaultGenerics

interface Like {
  created_at: string
  updated_at: string
  id: string
  user_id: string
  user: Actor
  kind: string
  activity_id: string
  parent: string
  latest_children: any
  children_counts: any
}

export interface Comment {
  created_at: string
  updated_at: string
  id: string
  user_id: string
  user: Actor
  kind: string
  activity_id: string
  data: {
    text: string
  }
  parent: string
  latest_children: {
    comment: Comment[]
  }
  own_children: { comment: Comment[]; like: Like[] }
  children_counts: {
    comment: number
    like: number
  }
}
