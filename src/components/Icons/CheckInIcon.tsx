import * as React from 'react'
import { Path, Svg } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const CheckInIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray500 } = props

  return (
    <Svg width={21} height={19} viewBox="0 0 21 19" fill="none" {...props}>
      <Path
        d="M11.91.695c-5.09-.14-9.26 3.95-9.26 9H.86c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8a.5.5 0 00-.36-.85H4.65c0-3.9 3.18-7.05 7.1-7 3.72.05 6.85 3.18 6.9 6.9.05 3.91-3.1 7.1-7 7.1-1.61 0-3.1-.55-4.28-1.48a.994.994 0 00-1.32.08c-.42.42-.39 1.13.08 1.49a8.858 8.858 0 005.52 1.91c5.05 0 9.14-4.17 9-9.26-.13-4.69-4.05-8.61-8.74-8.74zm-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.34-.74-.75-.74z"
        fill={fill}
      />
    </Svg>
  )
}

export default CheckInIcon
