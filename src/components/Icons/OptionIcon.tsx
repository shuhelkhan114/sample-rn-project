import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const OptionIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black } = props

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={fill} {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}>
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M12 18.538a.963.963 0 01-.706-.293.963.963 0 01-.294-.707c0-.275.098-.51.294-.706a.963.963 0 01.706-.294c.275 0 .51.098.706.294a.963.963 0 01.294.706c0 .275-.098.51-.294.707a.963.963 0 01-.706.293zM12 13a.963.963 0 01-.706-.294A.963.963 0 0111 12c0-.275.098-.51.294-.706A.963.963 0 0112 11c.275 0 .51.098.706.294A.963.963 0 0113 12c0 .275-.098.51-.294.706A.963.963 0 0112 13zm0-5.539a.963.963 0 01-.706-.293A.963.963 0 0111 6.46c0-.275.098-.51.294-.706A.963.963 0 0112 5.461c.275 0 .51.098.706.294a.963.963 0 01.294.706c0 .275-.098.51-.294.707A.963.963 0 0112 7.46z"
          fill={fill}
        />
      </G>
    </Svg>
  )
}

export default OptionIcon
