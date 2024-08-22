import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

const CloseIcon: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M6.215 18l12-12m-12 0l12 12"
        stroke={props.stroke || '#111827'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CloseIcon
