import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const NotificationIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { width = 24, height = 24, fill = theme.colors.gray700 } = props

  return (
    <Svg width={width} height={height} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M15.65 17.695h5l-1.406-1.405a2.032 2.032 0 01-.595-1.436v-3.159a6.002 6.002 0 00-4-5.658v-.342a2 2 0 00-4 0v.342c-2.33.823-4 3.046-4 5.658v3.159c0 .539-.214 1.055-.595 1.436L4.65 17.695h5m6 0v1a3 3 0 01-6 0v-1m6 0h-6"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default NotificationIcon
