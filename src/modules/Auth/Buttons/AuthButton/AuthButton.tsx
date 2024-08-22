import Block, { BlockProps } from '~/components/Block/Block'
import AppleIcon from '~/components/Icons/AppleIcon'
import GoogleIcon from '~/components/Icons/GoogleIcon'
import MailIcon from '~/components/Icons/MailIcon'
import MetaIcon from '~/components/Icons/MetaIcon'
import Typography from '~/components/Typography/Typography'
import { SocialLoginTypes } from '~/typings/common'

const icons = {
  [SocialLoginTypes.Google]: <GoogleIcon />,
  [SocialLoginTypes.Apple]: <AppleIcon />,
  [SocialLoginTypes.Meta]: <MetaIcon />,
  [SocialLoginTypes.Email]: <MailIcon />,
}

interface AuthButtonProps extends BlockProps {
  title: string
  loading?: boolean
  variation: SocialLoginTypes
  disable?: boolean
}

export const AuthButton: React.FC<AuthButtonProps> = (props) => {
  const { title, loading, variation, disable, onPress } = props

  const handlePress = () => {
    if (!loading && !disable) {
      onPress?.()
    }
  }

  return (
    <Block
      bW={1}
      pV="xl"
      rounded="xl"
      bC="gray300"
      align="center"
      justify="center"
      flexDirection="row"
      {...props}
      onPress={handlePress}>
      <Block absolute left={24}>
        {icons[variation]}
      </Block>
      <Typography variation="descriptionRegular">{loading ? 'Loading...' : title}</Typography>
    </Block>
  )
}

export default AuthButton
