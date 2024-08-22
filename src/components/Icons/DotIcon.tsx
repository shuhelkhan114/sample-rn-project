import * as React from 'react'
import Svg, { Circle } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const DotIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray600 } = props

  return (
    <Svg width={5} height={5} viewBox="0 0 5 5" fill="none" {...props}>
      <Circle cx={2.06982} cy={2.81604} r={2.02783} fill={fill} />
    </Svg>
  )
}

export default DotIcon
