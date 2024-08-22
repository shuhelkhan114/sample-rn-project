import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const DoubleMessageIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.primary } = props

  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M2.413 5.928a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2h-2l-3 3v-3h-2a2 2 0 01-2-2v-4z"
        fill={fill}
      />
      <Path
        d="M15.413 7.928v2a4 4 0 01-4 4h-1.171l-1.767 1.766c.28.15.6.234.938.234h2l3 3v-3h2a2 2 0 002-2v-4a2 2 0 00-2-2h-1z"
        fill={fill}
      />
    </Svg>
  )
}

export default DoubleMessageIcon
