import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'

const PlusIcon2: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 18.545a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2h-2a1 1 0 000 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2v-2z"
        fill="#8001FF"
      />
    </Svg>
  )
}

export default PlusIcon2
