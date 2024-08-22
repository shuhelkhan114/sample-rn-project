import messaging from '@react-native-firebase/messaging'
import { Call, StreamVideoClient, StreamVideoRN } from '@stream-io/video-react-native-sdk'

import * as stream from 'getstream'
import React, { useRef, useState } from 'react'
import { DefaultGenerics, Channel as IChannel, StreamChat } from 'stream-chat'
import { DefaultStreamChatGenerics } from 'stream-chat-react-native-core'
import ENV from '~/core/config/env'
import { setupCallPushConfig } from '~/core/lib/stream'

interface ChatContextValues {
  chatClient: StreamChat<DefaultGenerics> | null
  user: stream.StreamFeed<stream.DefaultGenerics> | null
  setupChatClient: (username: string, authToken: string) => void
  logout: () => Promise<any>
  channel: IChannel<DefaultStreamChatGenerics> | null
  setChannel: any
  thread: any | null
  setThread: any
  call: Call | null
  setCall: (call: Call | null) => void
  videoClient: StreamVideoClient | null
}

export const ChatContext = React.createContext<ChatContextValues>({
  chatClient: null,
  videoClient: null,
  user: null,
  setupChatClient: () => {},
  logout: async () => Promise.resolve(''),
  channel: null,
  setChannel: () => {},
  thread: null,
  setThread: () => {},
  call: null,
  setCall: () => {},
})

interface ChatContextProps {
  children: React.ReactNode
}

export const _chatClient = StreamChat.getInstance(ENV.stream.apiKey)
export const _videoClient = new StreamVideoClient(ENV.stream.apiKey)

const ChatContextProvider: React.FC<ChatContextProps> = (props) => {
  const { children } = props
  const [chatClient, setChatClient] = useState<StreamChat<DefaultGenerics> | null>(null)
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null)
  const [user, setUser] = useState<ChatContextValues['user'] | null>(null)
  const [channel, setChannel] = useState<IChannel<DefaultStreamChatGenerics> | null>(null)
  const [thread, setThread] = useState(null)
  const [call, setCall] = useState<Call | null>(null)
  const unsubscribeTokenRefreshListenerRef = useRef<() => void>()

  const registerPushToken = async (userId: string) => {
    unsubscribeTokenRefreshListenerRef.current?.()
    const token = await messaging().getToken()
    const push_provider = 'firebase'
    const push_provider_name = ENV.stream.pushProviderName

    await _chatClient.addDevice(token, push_provider, userId, push_provider_name)

    unsubscribeTokenRefreshListenerRef.current = messaging().onTokenRefresh(async (newToken) => {
      await Promise.all([
        _chatClient.addDevice(newToken, push_provider, userId, push_provider_name),
      ])
    })
  }

  const setupChatClient = (userId: string, authToken: string) => {
    const initChat = async () => {
      await _chatClient.connectUser({ id: userId }, authToken)
      await _videoClient.connectUser({ id: userId }, authToken)
      await registerPushToken(userId)
      setupCallPushConfig()
      setChatClient(_chatClient)
      setVideoClient(_videoClient)
    }
    initChat()
  }

  const logout = async () => {
    await chatClient?.disconnectUser()
    await _chatClient.disconnectUser()
    await _videoClient.disconnectUser()
    StreamVideoRN.onPushLogout()

    setChatClient(null)
    setUser(null)
    setChannel(null)
    setThread(null)
    setCall(null)
  }

  return (
    <ChatContext.Provider
      value={{
        videoClient,
        chatClient,
        user,
        setupChatClient,
        logout,
        setChannel,
        channel,
        setThread,
        thread,
        call,
        setCall,
      }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider
