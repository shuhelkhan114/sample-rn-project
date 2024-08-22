import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const CreateCheckInIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()

  const { fill = theme.colors.gray400 } = props

  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
        fill={fill}
      />
    </Svg>
  )
}

export default CreateCheckInIcon
