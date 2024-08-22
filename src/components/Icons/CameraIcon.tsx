import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'

const CameraIcon: React.FC<SVGIconProps> = (props) => {
  const { width = 24, height = 24 } = props

  return (
    <Svg width={width} height={height} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M3.15 9.098a2 2 0 012-2h.93a2 2 0 001.664-.89l.813-1.22a2 2 0 011.664-.89h3.859a2 2 0 011.664.89l.813 1.22a2 2 0 001.664.89h.93a2 2 0 012 2v9a2 2 0 01-2 2h-14a2 2 0 01-2-2v-9z"
        stroke="#9DA3AE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.15 13.098a3 3 0 11-6 0 3 3 0 016 0z"
        stroke="#9DA3AE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CameraIcon
