import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const VideoCallIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray500 } = props

  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M2.528 6.757a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2h-6a2 2 0 01-2-2v-8zM15.081 7.863a1 1 0 00-.553.894v4a1 1 0 00.553.895l2 1a1 1 0 001.447-.895v-6a1 1 0 00-1.447-.894l-2 1z"
        fill={fill}
      />
    </Svg>
  )
}

export default VideoCallIcon
