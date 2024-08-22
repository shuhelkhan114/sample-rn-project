import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const MessageIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray600 } = props
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.954 5.694v8a2 2 0 01-2 2h-5l-5 4v-4h-2a2 2 0 01-2-2v-8a2 2 0 012-2h12a2 2 0 012 2zm-11 3h-2v2h2v-2zm2 0h2v2h-2v-2zm6 0h-2v2h2v-2z"
        fill={fill}
      />
    </Svg>
  )
}

export default MessageIcon
