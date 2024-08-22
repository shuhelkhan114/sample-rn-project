import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const HomeIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray600 } = props

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={fill} {...props}>
      <Path
        d="M11.261 2.987a1 1 0 00-1.414 0l-7 7a1 1 0 101.415 1.414l.292-.293v6.586a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1V11.11l.293.292a1 1 0 101.415-1.414l-7-7z"
        fill={fill}
      />
    </Svg>
  )
}

export default HomeIcon
