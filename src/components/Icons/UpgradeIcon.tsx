import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const UpgradeIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black } = props

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={fill} {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}>
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M7.5 19v-1h9v1h-9zm4-3.385V6.883L8.38 9.996l-.688-.688L12 5l4.308 4.308-.689.688L12.5 6.883v8.732h-1z"
          fill={fill}
        />
      </G>
    </Svg>
  )
}

export default UpgradeIcon
