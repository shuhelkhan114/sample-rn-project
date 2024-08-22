import { useContext } from 'react'
import { ChatContext } from '~/context/ChatContext'

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error(
      'ChatContext not found, Make sure to wrap your root component (App.tsx) with ChatContextProvider.'
    )
  }
  return context
}
