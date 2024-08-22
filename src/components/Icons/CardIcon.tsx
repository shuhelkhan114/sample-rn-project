import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const CardIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { stroke = theme.colors.black, ...restProps } = props

  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...restProps}>
      <Path
        d="M3.893 10.01h18m-14 5h1m4 0h1m-7 4h12a3 3 0 003-3v-8a3 3 0 00-3-3h-12a3 3 0 00-3 3v8a3 3 0 003 3z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CardIcon
