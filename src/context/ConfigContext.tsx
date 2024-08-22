import React, { useState } from 'react'
import API from '~/core/services'
import { Config } from '~/typings/config'

// Interfaces
interface State {
  fetching: boolean
  error: unknown
  config: Config | null
}

interface ConfigContextValues extends State {
  fetchConfig: () => void
}

// Initial states
const defaultState: State = {
  fetching: false,
  error: null,
  config: null,
}

export const ConfigContext = React.createContext<ConfigContextValues>({
  ...defaultState,
  fetchConfig: () => {},
})

interface ConfigContextProps {
  children: React.ReactNode
}

// Component definition
const ConfigContextProvider: React.FC<ConfigContextProps> = (props) => {
  const { children } = props
  const [state, setState] = useState(defaultState)

  const updateState = (newData: Partial<State>) => {
    setState((prevState) => ({
      ...prevState,
      ...newData,
    }))
  }

  const fetchConfig = async () => {
    try {
      updateState({ fetching: true })
      const configData = await API.config.fetchConfig() // What does it fetch??
      updateState({ config: { ...configData } })
    } catch (error) {
      updateState({ error })
    } finally {
      updateState({ fetching: false })
    }
  }

  return (
    <ConfigContext.Provider value={{ ...state, fetchConfig }}>{children}</ConfigContext.Provider>
  )
}

export default ConfigContextProvider
