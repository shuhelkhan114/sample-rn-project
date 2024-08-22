import { useContext } from 'react'
import { ConfigContext } from '~/context/ConfigContext'

export const useConfig = () => {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error(
      'ConfigContext not found, Make sure to wrap your root component (App.tsx) with ConfigContextProvider.'
    )
  }
  return context
}
