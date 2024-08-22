import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

const WarningCircle: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Circle cx={12.1289} cy={12.8846} r={12} fill="orange" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.28 12.885a5.15 5.15 0 11-10.301 0 5.15 5.15 0 0110.3 0zm-4.507 2.575a.644.644 0 11-1.288 0 .644.644 0 011.288 0zm-.644-5.794a.644.644 0 00-.644.643v2.576a.644.644 0 001.288 0v-2.576a.644.644 0 00-.644-.643z"
        fill="#fff"
      />
    </Svg>
  )
}

export default WarningCircle
