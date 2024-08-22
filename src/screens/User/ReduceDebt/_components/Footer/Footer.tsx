import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block, { BlockProps } from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import Typography from '~/components/Typography/Typography'

interface FooterProps extends BlockProps {
  error: unknown
  disabled: boolean
  loading: boolean
  onNext: () => void
}

function Footer({ error, disabled, loading, onNext, ...restProps }: FooterProps) {
  const { bottom } = useSafeAreaInsets()

  return (
    <Block style={{ paddingBottom: bottom }} {...restProps}>
      <ErrorText error={error} />

      <Typography mB="lg" pV="sm" center variation="paragraphLight">
        Your identity or information will not be revealed to the community
      </Typography>

      <Button
        mB="xl"
        title="Next"
        onPress={onNext}
        loading={loading}
        disabled={disabled}
        variation={disabled ? 'secondary' : 'primary'}
      />
    </Block>
  )
}

export default Footer
