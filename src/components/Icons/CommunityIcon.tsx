import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

const CommunityIcon: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M17.256 20.72h5v-2a3 3 0 00-5.356-1.857m.356 3.857h-10m10 0v-2c0-.656-.127-1.283-.356-1.857M7.256 20.72h-5v-2a3 3 0 015.356-1.857m-.356 3.857v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15.256 7.72a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zm-14 0a2 2 0 11-4 0 2 2 0 014 0z"
        stroke="#8001FF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CommunityIcon
