import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

const TickIcon: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}>
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M9.55 17.308l-4.97-4.97.714-.713 4.256 4.256 9.156-9.156.713.714-9.869 9.869z"
          fill="#1C1B1F"
        />
      </G>
    </Svg>
  )
}

export default TickIcon
