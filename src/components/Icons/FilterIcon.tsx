import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const FilterIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { width = 24, height = 21, fill = theme.colors.gray700 } = props

  return (
    <Svg width={width} height={height} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M3.15 4.195a1 1 0 011-1h13a1 1 0 011 1v1.92a1 1 0 01-.294.707l-5.247 5.247a1 1 0 00-.293.707v2.086l-3.334 3.333v-5.419a1 1 0 00-.292-.707L3.442 6.822a1 1 0 01-.293-.708V4.195z"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default FilterIcon
