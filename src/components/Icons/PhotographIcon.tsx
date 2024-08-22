import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

const PhotographIcon: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M4.215 16l4.586-4.586a2 2 0 012.828 0L16.215 16m-2-2l1.586-1.586a2 2 0 012.828 0L20.215 14m-6-6h.01m-8.01 12h12a2 2 0 002-2V6a2 2 0 00-2-2h-12a2 2 0 00-2 2v12a2 2 0 002 2z"
        stroke={props.stroke || '#111827'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default PhotographIcon
