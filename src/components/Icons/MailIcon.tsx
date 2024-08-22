import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const MailIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black } = props

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={fill} {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}>
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M4 20c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 012 18V6c0-.55.196-1.02.587-1.412A1.926 1.926 0 014 4h16c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v12c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0120 20H4zm8-7l8-5V6l-8 5-8-5v2l8 5z"
          fill={fill}
        />
      </G>
    </Svg>
  )
}

export default MailIcon
