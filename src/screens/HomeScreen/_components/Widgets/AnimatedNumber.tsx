import Block from '~/components/Block/Block'

import Typography from '~/components/Typography/Typography'
import { baseTypography, fonts } from '~/core/styles/theme'
import useAppTheme from '~/hooks/useTheme'

interface AnimatedNumberProps {
  value: number
  isCurrency?: boolean
}

function AnimatedNumber({ value, isCurrency }: AnimatedNumberProps) {
  const theme = useAppTheme()
  // the blow logic is to add commas to the number doesn't work

  const commaSeparated = isCurrency ? value.toLocaleString() : value

  return (
    <Block>
      <Block flexDirection="row">
        {isCurrency && (
          <Typography
            color="gray600"
            style={{
              ...fonts.bold,
              ...baseTypography.title2,
              ...(value >= 1000000 && { fontSize: 28 }),
              color: theme.colors.gray600,
            }}>
            $
          </Typography>
        )}

        <Typography
          color="gray600"
          style={{
            ...fonts.bold,
            ...baseTypography.title2,
            ...(value >= 1000000 && { fontSize: 28 }),
            color: theme.colors.gray600,
          }}>
          {commaSeparated}
        </Typography>
      </Block>
    </Block>
  )
}

export default AnimatedNumber
