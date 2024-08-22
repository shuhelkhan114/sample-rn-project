export interface Channel {
  channel: Channel2
  messages: Message[]
  pinned_messages: any[]
  watcher_count: number
  read: Read[]
  members: Member[]
  membership: Membership
}

export interface Channel2 {
  id: string
  type: string
  cid: string
  last_message_at: string
  created_at: string
  updated_at: string
  created_by: CreatedBy
  frozen: boolean
  disabled: boolean
  member_count: number
  config: Config
  own_capabilities: string[]
  hidden: boolean
  marketingMessageSent: boolean
}

export interface CreatedBy {
  id: string
  role: string
  created_at: string
  updated_at: string
  last_active: string
  banned: boolean
  online: boolean
  name: string
  email: string
  yumeRole: string
}

export interface Config {
  created_at: string
  updated_at: string
  name: string
  typing_events: boolean
  read_events: boolean
  connect_events: boolean
  search: boolean
  reactions: boolean
  replies: boolean
  quotes: boolean
  mutes: boolean
  uploads: boolean
  url_enrichment: boolean
  custom_events: boolean
  push_notifications: boolean
  reminders: boolean
  mark_messages_pending: boolean
  message_retention: string
  max_message_length: number
  automod: string
  automod_behavior: string
  commands: Command[]
}

export interface Command {
  name: string
  description: string
  args: string
  set: string
}

export interface Message {
  id: string
  text: string
  html: string
  type: string
  user: User
  attachments: any[]
  latest_reactions: any[]
  own_reactions: any[]
  reaction_counts: ReactionCounts
  reaction_scores: ReactionScores
  reply_count: number
  deleted_reply_count: number
  cid: string
  created_at: string
  updated_at: string
  shadowed: boolean
  mentioned_users: any[]
  silent: boolean
  pinned: boolean
  pinned_at: any
  pinned_by: any
  pin_expires: any
}

export interface User {
  id: string
  role: string
  created_at: string
  updated_at: string
  last_active: string
  banned: boolean
  online: boolean
  name: string
  email: string
  yumeRole: string
}

export interface ReactionCounts {}

export interface ReactionScores {}

export interface Read {
  user: User2
  last_read: string
  unread_messages: number
  last_read_message_id?: string
}

export interface User2 {
  id: string
  role: string
  created_at: string
  updated_at: string
  last_active: string
  banned: boolean
  online: boolean
  name: string
  email: string
  yumeRole: string
}

export interface Member {
  user_id: string
  user: User3
  status: string
  created_at: string
  updated_at: string
  banned: boolean
  shadow_banned: boolean
  role: string
  channel_role: string
  notifications_muted: boolean
}

export interface User3 {
  id: string
  role: string
  created_at: string
  updated_at: string
  last_active: string
  banned: boolean
  online: boolean
  name: string
  email: string
  yumeRole: string
}

export interface Membership {
  user: User4
  status: string
  created_at: string
  updated_at: string
  banned: boolean
  shadow_banned: boolean
  channel_role: string
  notifications_muted: boolean
}

export interface User4 {
  id: string
  role: string
  created_at: string
  updated_at: string
  last_active: string
  banned: boolean
  online: boolean
  name: string
  email: string
  yumeRole: string
}

export enum CustomEvents {
  FirstMessage = 'custom:first-message',
  AcceptRequest = 'custom:accept-request',
  IgnoreRequest = 'custom:ignore-request',
  RevealUser = 'custom:reveal-user',
}
