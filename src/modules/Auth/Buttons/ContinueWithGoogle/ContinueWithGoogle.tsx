import auth from '@react-native-firebase/auth'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import Block, { BlockProps } from '~/components/Block/Block'
import ENV from '~/core/config/env'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getErrorMessage } from '~/core/utils/apiError'
import { ContinueWithMode, SocialLoginTypes } from '~/typings/common'
import AuthButton from '../AuthButton/AuthButton'

interface ContinueWithGoogleProps extends BlockProps {
  mode: ContinueWithMode
  loading?: boolean
  checkTermAndCondition?: boolean
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

const ContinueWithGoogle: React.FC<ContinueWithGoogleProps> = (props) => {
  const { mode, loading, setLoading, checkTermAndCondition, ...restProps } = props

  const { isPending, mutate: login } = useMutation({
    mutationFn: async () => {
      try {
        await GoogleSignin.hasPlayServices()
        const { idToken, user } = await GoogleSignin.signIn()

        await API.user.signup({ email: user.email, user_source: SocialLoginTypes.Google })

        const googleCredentials = auth.GoogleAuthProvider.credential(idToken)
        await auth().signInWithCredential(googleCredentials)
      } catch (error: any) {
        let message = ''
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            message = 'User not found, please sign up!'
          } else {
            message = getErrorMessage(error)
          }
        } else {
          if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
            message = 'Sign in cancelled'
          } else if (error.code === statusCodes.IN_PROGRESS) {
            message = 'Signing In...'
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            message = 'Play services not available or outdated'
          } else {
            message = 'Unexpected error has occurred, Please try again later!'
          }
        }
        throw new Error(message)
      } finally {
        setLoading?.(false)
      }
    },
    onError(error: any) {
      setLoading?.(false)
      toast.error('Error', error.message)
    },
  })

  useEffect(() => {
    GoogleSignin.configure({ webClientId: ENV.firebase.webClientId })
  }, [])

  const handlePress = () => {
    if (checkTermAndCondition) {
      setLoading?.(true)
      login()
    } else {
      toast.show('Terms and conditions', 'Please accept terms and conditions')
    }
  }

  return (
    <Block>
      <AuthButton
        loading={isPending}
        onPress={handlePress}
        title="Continue with Google"
        variation={SocialLoginTypes.Google}
        disable={loading}
        {...restProps}
      />
    </Block>
  )
}

export default ContinueWithGoogle
