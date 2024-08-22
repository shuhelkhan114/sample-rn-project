import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'

const CommentWithDotsIcon: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M6.667 8.333h.008m3.325 0h.008m3.325 0h.009m-5.842 5H4.167c-.92 0-1.667-.746-1.667-1.666V5c0-.92.746-1.667 1.667-1.667h11.666c.92 0 1.667.746 1.667 1.667v6.667c0 .92-.746 1.666-1.667 1.666h-4.166L7.5 17.5v-4.167z"
        stroke="#6C727F"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CommentWithDotsIcon
