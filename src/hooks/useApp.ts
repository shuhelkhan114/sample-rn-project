import { useContext } from 'react'
import { RootContext } from '~/context/AppContext'

export const useApp = () => {
  const context = useContext(RootContext)
  if (!context) {
    throw new Error(
      'AppContext not found, Make sure to wrap your root component (App.tsx) with AppContextProvider.'
    )
  }
  return context
}
