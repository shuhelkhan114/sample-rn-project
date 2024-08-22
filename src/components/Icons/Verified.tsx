import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

const VerifiedCoach: React.FC<SVGIconProps> = (props) => {
  return (
    // <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
    //   <Path
    //     d="M9.256 5.959h-2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"
    //     stroke="#8001FF"
    //     strokeWidth={2}
    //     strokeLinecap="round"
    //   />
    // </Svg>
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      {...props}>
      <Path
        d="M9.66504 12.72L11.665 14.72L15.665 10.72M21.2829 6.7043C21.0783 6.71468 20.8723 6.71993 20.665 6.71993C17.5916 6.71993 14.788 5.5645 12.665 3.6643C10.542 5.56442 7.73842 6.71981 4.66504 6.71981C4.45781 6.71981 4.25181 6.71456 4.04717 6.70418C3.79774 7.66779 3.66504 8.67839 3.66504 9.71997C3.66504 15.3115 7.48936 20.0098 12.665 21.3419C17.8407 20.0098 21.665 15.3115 21.665 9.71997C21.665 8.67843 21.5323 7.66788 21.2829 6.7043Z"
        stroke="#116FA6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default VerifiedCoach
