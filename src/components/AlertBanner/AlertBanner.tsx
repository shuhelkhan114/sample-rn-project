import React from 'react'
import { ThemeColor } from '~/core/styles/theme'
import useAppTheme from '~/hooks/useTheme'
import Block, { BlockProps } from '../Block/Block'
import WarningCircle from '../Icons/WarningCircle'
import Typography from '../Typography/Typography'

type Variation = 'warning'

interface AlertBannerProps extends BlockProps {
  text: string
  variation: Variation
}

const variationColorMapping: Record<Variation, ThemeColor> = {
  warning: 'warning',
}

const variationIconMapping: Record<Variation, React.ReactNode> = {
  warning: <WarningCircle />,
}

const AlertBanner: React.FC<AlertBannerProps> = (props) => {
  const { variation = 'warning', text, ...restProps } = props

  const theme = useAppTheme()

  return (
    <Block
      pH="lg"
      pV="lg"
      rounded="lg"
      flexDirection="row"
      style={{ backgroundColor: theme.colors[variationColorMapping[variation]] + '26' }}
      {...restProps}>
      {variationIconMapping[variation]}
      <Typography mL="lg" variation="descriptionRegular">
        {text}
      </Typography>
    </Block>
  )
}

export default AlertBanner
