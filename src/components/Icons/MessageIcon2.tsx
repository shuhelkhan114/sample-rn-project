import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const MessageIcon2: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray600 } = props
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M2.255 6.298l7.997 3.998 7.997-3.998a2 2 0 00-1.997-1.884h-12a2 2 0 00-1.997 1.884z"
        fill={fill}
      />
      <Path d="M18.252 8.532l-8 4-8-4v5.882a2 2 0 002 2h12a2 2 0 002-2V8.532z" fill={fill} />
    </Svg>
  )
}

export default MessageIcon2
