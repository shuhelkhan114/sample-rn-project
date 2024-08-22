import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const ThreePanelIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { stroke = theme.colors.gray900, ...restProps } = props

  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...restProps}>
      <Path
        d="M9.893 17.799v-10m0 10a2 2 0 01-2 2h-2a2 2 0 01-2-2v-10a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2m-6-10a2 2 0 012-2h2a2 2 0 012 2m0 10v-10m0 10a2 2 0 002 2h2a2 2 0 002-2v-10a2 2 0 00-2-2h-2a2 2 0 00-2 2"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ThreePanelIcon
