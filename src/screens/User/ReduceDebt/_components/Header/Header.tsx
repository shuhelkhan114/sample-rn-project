import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import { totalSteps } from '../../config'

interface HeaderProps {
  step: number
  description: string
}

function Header(props: HeaderProps) {
  const { step, description } = props

  return (
    <Block>
      <Typography variation="paragraphRegular">
        Question {step} of {totalSteps}
      </Typography>
      <Typography mT="xl" variation="paragraphLight" color="gray700">
        {description}
      </Typography>
    </Block>
  )
}

export default Header
