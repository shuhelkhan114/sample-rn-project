import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const FireIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { stroke = theme.colors.gray900 } = props
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M15.607 16.25a6.667 6.667 0 01-9.428-9.428s.547 1.381 2.214 2.214c0-1.666.416-4.166 2.488-5.833 1.678 1.667 3.42 2.315 4.726 3.62a6.646 6.646 0 011.952 4.713c0 1.707-.65 3.413-1.952 4.714z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.125 14.137a2.5 2.5 0 101.78-4.267l-.846 2.5H8.393c0 .64.244 1.28.732 1.768z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default FireIcon
