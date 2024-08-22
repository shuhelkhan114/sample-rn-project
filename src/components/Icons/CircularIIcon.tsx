import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const CircularIIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray900 } = props

  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M18.415 10.329a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zm-7.5-2.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-1 1a1.5 1.5 0 00-.5 2.914v2.586a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 00.5-2.915V10.33a1.5 1.5 0 00-1.5-1.5h-1z"
        fill={fill}
        stroke={fill}
      />
    </Svg>
  )
}

export default CircularIIcon
