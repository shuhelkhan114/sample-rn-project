import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const ScanIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black } = props

  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M4.197 6.983V5.316A1.667 1.667 0 015.863 3.65H7.53m-3.333 10v1.666a1.666 1.666 0 001.666 1.667H7.53M14.197 3.65h1.666a1.667 1.667 0 011.667 1.666v1.667m-3.334 10h1.667a1.667 1.667 0 001.667-1.667V13.65M6.697 10.316h8.333"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ScanIcon
