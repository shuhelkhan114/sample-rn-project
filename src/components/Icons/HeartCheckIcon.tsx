import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'

const HeartCheckIcon: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}>
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M11 21l-3.175-2.85a93.169 93.169 0 01-3.088-2.9c-.858-.85-1.566-1.65-2.125-2.4-.558-.75-.966-1.475-1.225-2.175A6.303 6.303 0 011 8.475c0-1.567.525-2.87 1.575-3.912C3.625 3.52 4.933 3 6.5 3A5.882 5.882 0 0111 5.075 5.881 5.881 0 0115.5 3c1.417 0 2.604.43 3.563 1.287.958.859 1.554 1.863 1.787 3.013a3.717 3.717 0 00-1.05-.25c-.367-.033-.742-.05-1.125-.05-1.417 0-2.717.57-3.9 1.713C13.592 9.854 13 11.283 13 13c0 .8.175 1.613.525 2.438.35.824.842 1.495 1.475 2.012-.317.283-.73.646-1.238 1.088-.508.441-.945.829-1.312 1.162L11 21zm6.95-4.825L15.1 13.35l1.425-1.4 1.425 1.4 3.525-3.525 1.425 1.4-4.95 4.95z"
          fill="#8001FF"
        />
      </G>
    </Svg>
  )
}

export default HeartCheckIcon
