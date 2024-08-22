import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const PaymentCardIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black } = props

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={fill} {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}>
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M21 6.615v10.77c0 .46-.154.844-.462 1.152a1.565 1.565 0 01-1.153.463H4.615c-.46 0-.844-.154-1.153-.462A1.565 1.565 0 013 17.385V6.615c0-.46.154-.844.462-1.152A1.565 1.565 0 014.615 5h14.77c.46 0 .844.154 1.152.463.309.308.463.692.463 1.152zM4 8.808h16V6.615a.588.588 0 00-.192-.423.588.588 0 00-.423-.192H4.615a.588.588 0 00-.423.192.588.588 0 00-.192.423v2.193zm0 2.384v6.193c0 .153.064.294.192.423.129.128.27.192.423.192h14.77a.588.588 0 00.423-.192.588.588 0 00.192-.423v-6.193H4z"
          fill={fill}
        />
      </G>
    </Svg>
  )
}

export default PaymentCardIcon
