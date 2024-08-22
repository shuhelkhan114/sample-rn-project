export interface Notification {
  id: string
  imageUrl: string
  username: string
  type: 'new-message' | 'mention'
  comment?: string
}
