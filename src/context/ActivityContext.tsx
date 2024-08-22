import React, { useState } from 'react'

import * as stream from 'getstream'
import ENV from '~/core/config/env'

interface ActivityContextValues {
  client: stream.StreamClient<stream.DefaultGenerics> | null
  user: stream.StreamFeed<stream.DefaultGenerics> | null
  setupClient: (username: string, authToken: string) => void
  logout: () => void
}

export const ActivityContext = React.createContext<ActivityContextValues>({
  client: null,
  user: null,
  setupClient: () => {},
  logout: () => {},
})

interface ActivityContextProps {
  children: React.ReactNode
}

const ActivityContextProvider: React.FC<ActivityContextProps> = (props) => {
  const { children } = props
  const [client, setClient] = useState<stream.StreamClient<stream.DefaultGenerics> | null>(null)
  const [user, setUser] = useState<ActivityContextValues['user'] | null>(null)

  const setupClient = (userId: string, authToken: string) => {
    const client = stream.connect(ENV.stream.apiKey, authToken, ENV.stream.appId)

    const user = client.feed('user', userId, authToken)

    // TODO: move this logic to server side. currently it's here for the existing users
    user.following().then((res) => {
      const followingYume = res.results.find((result) => result.target_id === 'yume:yume')
      if (!followingYume) {
        user.follow('yume', 'yume')
      }
    })

    setClient(client)
    setUser(user)
  }

  const logout = () => {
    setClient(null)
    setUser(null)
  }

  return (
    <ActivityContext.Provider value={{ client, user, setupClient, logout }}>
      {children}
    </ActivityContext.Provider>
  )
}

export default ActivityContextProvider
