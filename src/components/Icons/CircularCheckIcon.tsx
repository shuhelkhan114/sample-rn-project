import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const CircularCheckIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.positive } = props

  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M18.415 10.283a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zm-3.44-.94a1.5 1.5 0 10-2.121-2.12l-2.94 2.939-.939-.94a1.5 1.5 0 10-2.121 2.122l2 2a1.5 1.5 0 002.121 0l4-4z"
        fill={fill}
        stroke={fill}
      />
    </Svg>
  )
}

export default CircularCheckIcon
