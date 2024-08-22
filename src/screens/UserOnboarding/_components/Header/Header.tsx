import Block from '~/components/Block/Block'
import Link from '~/components/Link/Link'
import Typography from '~/components/Typography/Typography'
import { TOTAL_USER_ONBOARDING_STEPS } from '~/core/config/onboarding'

interface HeaderProps {
  step: number
  totalSteps?: number
  description?: string
  isOptional?: boolean
  onSkip?: () => void
}

function Header(props: HeaderProps) {
  const { step, description, totalSteps, isOptional, onSkip } = props

  return (
    <Block>
      <Block wrap flexDirection="row" align="center" justify="space-between">
        <Typography variation="paragraphRegular">
          Question {step} of {totalSteps || TOTAL_USER_ONBOARDING_STEPS}{' '}
          {isOptional && '(Optional)'}
        </Typography>
        {isOptional && (
          <Link color="primary" variation="descriptionSemiBold" onPress={onSkip}>
            Skip
          </Link>
        )}
      </Block>
      {description && (
        <Typography mT="xl" variation="paragraphLight" color="gray700">
          {description}
        </Typography>
      )}
    </Block>
  )
}

export default Header
