import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const PersonIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray900 } = props

  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" {...props} fill="none">
      <Path
        d="M14.226 5.931a3.333 3.333 0 11-6.667 0 3.333 3.333 0 016.667 0zM10.893 11.764a5.833 5.833 0 00-5.834 5.834h11.667a5.833 5.833 0 00-5.833-5.834z"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default PersonIcon
