import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const ExclamationIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray400 } = props

  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4 8A6.4 6.4 0 111.6 8a6.4 6.4 0 0112.8 0zm-5.6 3.2a.8.8 0 11-1.6 0 .8.8 0 011.6 0zM8 4a.8.8 0 00-.8.8V8a.8.8 0 001.6 0V4.8A.8.8 0 008 4z"
        fill={fill}
      />
    </Svg>
  )
}

export default ExclamationIcon
