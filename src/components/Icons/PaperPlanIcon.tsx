import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const PaperPlanIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray400 } = props

  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" {...props} fill="none">
      <Path
        d="M5.678 12.57l-2.017 9 18.147-9-18.147-9 2.017 9zm0 0h8.065"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default PaperPlanIcon
