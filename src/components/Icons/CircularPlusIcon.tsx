import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const CircularPlusIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray600 } = props

  return (
    <Svg width={24} height={24} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.354 18.694a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2h-2a1 1 0 000 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2v-2z"
        fill={fill}
      />
    </Svg>
  )
}

export default CircularPlusIcon
