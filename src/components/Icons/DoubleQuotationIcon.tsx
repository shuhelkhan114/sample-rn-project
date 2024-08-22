import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const DoubleQuotationIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.primary } = props

  return (
    <Svg width={26} height={22} viewBox="0 0 26 22" fill="none" {...props}>
      <Path
        d="M7.815 11.715L10.688.5H5.797l-3.65 10.538C1.062 13.823.75 14.952.75 16.382c0 2.935 2.174 5.118 5.202 5.118 2.873 0 5.124-2.108 5.124-5.118 0-2.334-1.242-3.99-3.26-4.667zm14.674 0L25.362.5H20.47l-3.65 10.538c-1.087 2.785-1.397 3.914-1.397 5.344 0 2.935 2.174 5.118 5.202 5.118 2.872 0 5.124-2.108 5.124-5.118 0-2.334-1.242-3.99-3.26-4.667z"
        fill={fill}
      />
    </Svg>
  )
}

export default DoubleQuotationIcon
