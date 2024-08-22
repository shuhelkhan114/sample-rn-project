import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const CommentIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray600 } = props
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={25} height={25}>
        <Path fill="#D9D9D9" d="M0.0310059 0.416504H24.0310059V24.416504H0.0310059z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M3.031 20.493V5.032c0-.46.154-.845.463-1.153a1.565 1.565 0 011.152-.462h14.77c.46 0 .844.154 1.152.462.309.308.463.693.463 1.153v10.77c0 .46-.154.844-.462 1.152a1.565 1.565 0 01-1.153.462H6.108L3.03 20.493zm2.65-4.076h13.735a.588.588 0 00.423-.193.588.588 0 00.192-.423V5.031a.588.588 0 00-.192-.422.588.588 0 00-.423-.192H4.646a.588.588 0 00-.423.192.588.588 0 00-.192.423V18.06l1.65-1.645z"
          fill={fill}
        />
      </G>
    </Svg>
  )
}

export default CommentIcon
