import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const ClipboardListIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { stroke = theme.colors.gray900 } = props
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M9.84 5.107h-2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default ClipboardListIcon
