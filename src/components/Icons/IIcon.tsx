import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const IIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { width = 24, height = 24, fill = theme.colors.black } = props

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={fill} {...props}>
      <Path
        d="M18.375 10.988a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zm-7.5-2.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-1 1a1.5 1.5 0 00-.5 2.915v2.585a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 00.5-2.914v-2.586a1.5 1.5 0 00-1.5-1.5h-1z"
        fill={fill}
        stroke={fill}
      />
    </Svg>
  )
}

export default IIcon
