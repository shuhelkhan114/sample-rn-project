import { useContext } from 'react'
import { ActivityContext } from '~/context/ActivityContext'

export const useActivity = () => {
  const context = useContext(ActivityContext)
  if (!context) {
    throw new Error(
      'Activity Context not found, Make sure to wrap your root component (App.tsx) with AuthContextProvider.'
    )
  }
  return context
}
