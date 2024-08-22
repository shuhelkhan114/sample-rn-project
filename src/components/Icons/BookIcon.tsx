import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const BookIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black } = props

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={fill} {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={25}>
        <Path fill="#D9D9D9" d="M0 0.5H24V24.5H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M17.5 22v-3h-3v-1h3v-3h1v3h3v1h-3v3h-1zM5.615 19.5c-.46 0-.844-.154-1.152-.462A1.565 1.565 0 014 17.885V7.115c0-.46.154-.844.463-1.152A1.565 1.565 0 015.615 5.5h1.77V3.27h1.077V5.5h5.153V3.27h1V5.5h1.77c.46 0 .844.154 1.152.463.309.308.463.692.463 1.152v5.716a7.262 7.262 0 00-1 0v-1.716H5v6.77c0 .153.064.294.192.423.129.128.27.192.423.192h6.674c0 .167.005.333.017.5.011.167.033.333.063.5H5.615zM5 10.115h12v-3a.588.588 0 00-.192-.423.588.588 0 00-.423-.192H5.615a.588.588 0 00-.423.192.588.588 0 00-.192.423v3z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default BookIcon
