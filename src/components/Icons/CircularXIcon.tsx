import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const CircularXIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray900 } = props

  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M18.415 10.306a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zm-8.44-3.06a1.5 1.5 0 10-2.121 2.12l.94.94-.94.94a1.5 1.5 0 102.121 2.12l.94-.939.939.94a1.5 1.5 0 102.121-2.122l-.94-.94.94-.939a1.5 1.5 0 10-2.121-2.12l-.94.938-.939-.939z"
        fill={fill}
        stroke={fill}
      />
    </Svg>
  )
}

export default CircularXIcon
