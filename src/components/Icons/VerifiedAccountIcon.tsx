import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const VerifiedAccountIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { width = 24, height = 24, fill = theme.colors.primary } = props
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}>
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M9.023 21.23l-1.67-2.815-3.176-.684.311-3.277L2.346 12l2.142-2.454-.311-3.277 3.177-.684 1.67-2.816L12 4.027l2.977-1.258 1.67 2.816 3.176.684-.311 3.277L21.654 12l-2.142 2.454.311 3.277-3.177.684-1.669 2.816L12 19.973l-2.977 1.258zm1.927-6.372L15.908 9.9l-.708-.72-4.25 4.25-2.15-2.138-.708.708 2.858 2.858z"
          fill={fill}
        />
      </G>
    </Svg>
  )
}

export default VerifiedAccountIcon
