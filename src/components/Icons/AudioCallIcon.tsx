import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const AudioCallIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray500 } = props

  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" fill="none" {...props}>
      <Path
        d="M2.128 3.157a.8.8 0 01.8-.8h1.723a.8.8 0 01.789.669l.591 3.549a.8.8 0 01-.431.847L4.36 8.04a8.83 8.83 0 004.884 4.883l.62-1.238a.8.8 0 01.846-.431l3.549.591a.8.8 0 01.668.79v1.721a.8.8 0 01-.8.8h-1.6c-5.743 0-10.4-4.656-10.4-10.4v-1.6z"
        fill={fill}
      />
    </Svg>
  )
}

export default AudioCallIcon
