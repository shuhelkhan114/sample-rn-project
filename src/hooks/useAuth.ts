import { useContext } from 'react'
import { AuthContext } from '~/context/AuthContext'

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      'AuthContext not found, Make sure to wrap your root component (App.tsx) with AuthContextProvider.'
    )
  }
  return context
}

export default useAuth
