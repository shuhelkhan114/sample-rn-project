import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const ScheduleCallIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray400 } = props
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M2.5 5.833c0-.92.746-1.666 1.667-1.666h11.666c.92 0 1.667.746 1.667 1.666v10c0 .92-.746 1.667-1.667 1.667H4.167c-.92 0-1.667-.746-1.667-1.667v-10z"
        fill="#fff"
      />
      <Path
        d="M6.667 5.833V2.5m6.666 3.333V2.5m-7.5 6.667h8.334m-10 8.333h11.666c.92 0 1.667-.746 1.667-1.667v-10c0-.92-.746-1.666-1.667-1.666H4.167c-.92 0-1.667.746-1.667 1.666v10c0 .92.746 1.667 1.667 1.667z"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ScheduleCallIcon
