import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'

const GoogleIcon: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_261_1262)">
        <Path
          d="M12 10.364v3.485h4.844a4.15 4.15 0 01-1.809 2.709l2.921 2.266c1.702-1.571 2.684-3.878 2.684-6.62 0-.637-.057-1.251-.164-1.84H12z"
          fill="#4285F4"
        />
        <Path
          d="M6.956 13.713l-.659.504-2.332 1.816C5.446 18.971 8.482 21 12 21c2.43 0 4.467-.802 5.956-2.176l-2.92-2.267c-.803.54-1.825.867-3.036.867-2.34 0-4.328-1.579-5.04-3.706l-.004-.005z"
          fill="#34A853"
        />
        <Path
          d="M3.966 7.966A8.89 8.89 0 003 12c0 1.456.352 2.823.966 4.034 0 .008 2.994-2.324 2.994-2.324A5.393 5.393 0 016.674 12c0-.598.106-1.17.286-1.71L3.966 7.966z"
          fill="#FBBC05"
        />
        <Path
          d="M12 6.584c1.325 0 2.504.458 3.445 1.341l2.577-2.577C16.459 3.892 14.43 3 12 3 8.482 3 5.446 5.02 3.965 7.966L6.96 10.29c.712-2.127 2.7-3.706 5.04-3.706z"
          fill="#EA4335"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_261_1262">
          <Path fill="#fff" transform="translate(3 3)" d="M0 0H17.64V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default GoogleIcon
