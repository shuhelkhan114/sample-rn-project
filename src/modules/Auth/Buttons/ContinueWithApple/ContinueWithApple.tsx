import { appleAuth } from '@invertase/react-native-apple-authentication'
import auth from '@react-native-firebase/auth'
import { BlockProps } from '~/components/Block/Block'
import { ContinueWithMode, SocialLoginTypes } from '~/typings/common'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import AuthButton from '../AuthButton/AuthButton'

interface ContinueWithAppleProps extends BlockProps {
  mode: ContinueWithMode
  loading?: boolean
  checkTermAndCondition?: boolean
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

const ContinueWithApple: React.FC<ContinueWithAppleProps> = (props) => {
  const { mode, loading, setLoading, checkTermAndCondition, ...restProps } = props

  const { isPending, mutate: login } = useMutation({
    mutationFn: async () => {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        })

        if (!appleAuthRequestResponse.identityToken) {
          throw new Error('Apple Sign-In failed - no identify token returned')
        }

        const { identityToken, nonce, email, user } = appleAuthRequestResponse
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)
        if (email) {
          await API.user.signup({
            apple_id: user,
            email,
            user_source: SocialLoginTypes.Apple,
          })
        }

        await auth().signInWithCredential(appleCredential)
      } catch (error: any) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            throw new Error('User not found, Please sign up!')
          } else if (error.response?.status === 409) {
            throw new Error('User Already exist, Please sign in!')
          }
        }
        throw new Error(error.message)
      } finally {
        setLoading?.(false)
      }
    },
    onSuccess() {
      toast.success(
        'Success',
        `${mode === ContinueWithMode.Login ? 'Logged In' : 'Signed Up'} successfully!`
      )
    },
    onError(error: any) {
      toast.error('Error', error.message)
    },
  })

  const handlePress = () => {
    if (checkTermAndCondition) {
      setLoading?.(true)
      login()
    } else {
      toast.show('Terms and conditions', 'Please accept terms and conditions')
    }
  }

  return (
    <AuthButton
      loading={isPending}
      onPress={handlePress}
      title="Continue with Apple ID"
      variation={SocialLoginTypes.Apple}
      disable={loading}
      {...restProps}
    />
  )
}

export default ContinueWithApple
