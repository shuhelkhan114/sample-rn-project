import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const GroupIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray600 } = props

  return (
    <Svg width={24} height={24} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M9.754 6.694a3 3 0 11-6 0 3 3 0 016 0zM17.755 6.694a3 3 0 11-6 0 3 3 0 016 0zM13.684 17.694c.046-.326.07-.66.07-1a6.97 6.97 0 00-1.5-4.33 5 5 0 017.5 4.33v1h-6.07zM6.754 11.694a5 5 0 015 5v1h-10v-1a5 5 0 015-5z"
        fill={fill}
      />
    </Svg>
  )
}

export default GroupIcon
