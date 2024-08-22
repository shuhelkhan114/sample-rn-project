import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const ReloadIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black } = props

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={fill} {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}>
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M5.235 15.204a7.434 7.434 0 01-.547-1.537A7.015 7.015 0 014.5 12.05c0-2.092.73-3.874 2.19-5.344C8.15 5.236 9.92 4.5 12 4.5h1.386l-2.1-2.1.708-.708L15.302 5l-3.308 3.308-.707-.708 2.1-2.1H12c-1.808 0-3.343.636-4.606 1.907C6.131 8.677 5.5 10.226 5.5 12.05c0 .395.04.797.121 1.208.08.41.202.809.364 1.196l-.75.75zm6.77 7.104L8.699 19l3.308-3.308.707.708-2.1 2.1H12c1.808 0 3.343-.636 4.606-1.907 1.263-1.27 1.894-2.819 1.894-4.643 0-.395-.04-.797-.121-1.208a6.216 6.216 0 00-.364-1.196l.75-.75c.239.492.42 1.005.546 1.537a7.01 7.01 0 01.189 1.617c0 2.092-.73 3.874-2.19 5.344-1.46 1.47-3.23 2.206-5.31 2.206h-1.386l2.1 2.1-.708.708z"
          fill={fill}
        />
      </G>
    </Svg>
  )
}

export default ReloadIcon
