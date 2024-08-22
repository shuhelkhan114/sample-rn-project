import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const RecoveryCoachInfoIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { stroke = theme.colors.primary, fill = theme.colors.white } = props

  return (
    <Svg width={15} height={15} viewBox="0 0 15 15" fill="none" {...props}>
      <Path d="M12.778 7.757a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" fill={fill} />
      <Path
        d="M8.112 10.09h-.584V7.758h-.583m.583-2.333h.006m5.244 2.333a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default RecoveryCoachInfoIcon
