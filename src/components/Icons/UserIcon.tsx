import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const UserIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { width = 24, height = 24, fill = theme.colors.gray600 } = props

  return (
    <Svg width={width} height={height} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.154 10.694a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916 5.986 5.986 0 004.547 2.084A5.986 5.986 0 0014.7 14.61a5 5 0 00-4.547-2.916z"
        fill={fill}
      />
    </Svg>
  )
}

export default UserIcon
