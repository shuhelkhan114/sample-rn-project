import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

const ReplyIcon: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
        <Path fill="#D9D9D9" d="M0 0H16V16H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M5.538 10.872L2 7.333l3.538-3.538.476.472-3.067 3.066L6.014 10.4l-.476.472zM13.333 12v-2c0-.641-.228-1.19-.686-1.647A2.246 2.246 0 0011 7.667H6.024L8.758 10.4l-.476.472-3.538-3.539 3.538-3.538.476.472L6.024 7H11a2.89 2.89 0 012.121.879A2.89 2.89 0 0114 10v2h-.667z"
          fill="#1C1B1F"
        />
      </G>
    </Svg>
  )
}

export default ReplyIcon
