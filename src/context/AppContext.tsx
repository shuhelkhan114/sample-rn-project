import * as stream from 'getstream'
import React, { useState } from 'react'
import { Post } from '~/typings/stream'

interface State {
  recentlyCreatedPost: stream.Activity<Post> | null
}

const defaultState: State = {
  recentlyCreatedPost: null,
}

interface RootContextValues extends State {
  setRecentlyCreatedPost: (post: stream.Activity<Post> | null) => void
}

export const RootContext = React.createContext<RootContextValues>({
  ...defaultState,
  setRecentlyCreatedPost: () => {},
})

interface RootContextProps {
  children: React.ReactNode
}

const RootContextProvider: React.FC<RootContextProps> = (props) => {
  const { children } = props
  const [state, setState] = useState(defaultState)

  const updateState = (newData: Partial<State>) => {
    setState((prevState) => ({
      ...prevState,
      ...newData,
    }))
  }

  const setRecentlyCreatedPost = (post: stream.Activity<Post> | null) => {
    updateState({ recentlyCreatedPost: post })
  }

  return (
    <RootContext.Provider value={{ ...state, setRecentlyCreatedPost }}>
      {children}
    </RootContext.Provider>
  )
}

export default RootContextProvider
