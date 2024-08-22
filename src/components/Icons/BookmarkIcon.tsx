import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const BookmarkIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.primary, width = 24, height = 24 } = props

  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" {...props}>
      <Path d="M4 3.2a1.6 1.6 0 011.6-1.6h4.8A1.6 1.6 0 0112 3.2v11.2l-4-2-4 2V3.2z" fill={fill} />
    </Svg>
  )
}

export default BookmarkIcon
