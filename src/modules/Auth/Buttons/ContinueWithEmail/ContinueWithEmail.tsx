import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BlockProps } from '~/components/Block/Block'
import toast from '~/core/lib/toast'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import { ContinueWithMode, SocialLoginTypes } from '~/typings/common'
import AuthButton from '../AuthButton/AuthButton'

interface ContinueWithEmailProps extends BlockProps {
  mode: ContinueWithMode
  loading?: boolean
  checkTermAndCondition?: boolean
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

const ContinueWithEmail: React.FC<ContinueWithEmailProps> = (props) => {
  const { mode, loading, setLoading, checkTermAndCondition, ...restProps } = props

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackScreens, Screens.SignUpScreen>>()

  const handlePress = () => {
    if (checkTermAndCondition) {
      navigation.navigate(Screens.ContinueWithEmailScreen, { mode })
    } else {
      toast.show('Terms and conditions', 'Please accept terms and conditions')
    }
  }

  return (
    <AuthButton
      onPress={handlePress}
      title="Continue with Email"
      variation={SocialLoginTypes.Email}
      disable={loading}
      {...restProps}
    />
  )
}

export default ContinueWithEmail
