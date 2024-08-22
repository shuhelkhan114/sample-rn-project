import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const ChevronBottom: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black } = props

  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill={fill} {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={25}>
        <Path fill="#D9D9D9" d="M0 0.5H24V24.5H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M12 15.202L6.692 9.894l.708-.707 4.6 4.6 4.6-4.6.708.707L12 15.202z"
          fill="#1C1B1F"
        />
      </G>
    </Svg>
  )
}

export default ChevronBottom
