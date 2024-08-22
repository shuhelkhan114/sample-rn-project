import { BlockProps } from '~/components/Block/Block'
import toast from '~/core/lib/toast'
import { ContinueWithMode, SocialLoginTypes } from '~/typings/common'
import AuthButton from '../AuthButton/AuthButton'

interface ContinueWithMetaProps extends BlockProps {
  mode: ContinueWithMode
  loading?: boolean
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

const ContinueWithMeta: React.FC<ContinueWithMetaProps> = (props) => {
  const { mode, loading, setLoading, ...restProps } = props

  const handlePress = () => {
    setLoading?.(true)
    toast.show('Meta', 'Work in progress!')
    setLoading?.(false)
  }

  return (
    <AuthButton
      onPress={handlePress}
      title="Continue with Meta"
      variation={SocialLoginTypes.Meta}
      disable={loading}
      {...restProps}
    />
  )
}

export default ContinueWithMeta
