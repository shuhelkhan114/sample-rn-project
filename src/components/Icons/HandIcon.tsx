import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const HandIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray400 } = props

  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M10.183 3.028a.5.5 0 011 0v5.5a1 1 0 102 0v-4.5a.5.5 0 011 0v4.5a1 1 0 102 0v-2.5a.5.5 0 011 0v5a6.5 6.5 0 01-13 0v-2a.5.5 0 111 0v2.5a1 1 0 102 0v-7.5a.5.5 0 111 0v4.5a1 1 0 102 0v-5.5z"
        fill={fill}
        stroke={fill}
      />
    </Svg>
  )
}

export default HandIcon
