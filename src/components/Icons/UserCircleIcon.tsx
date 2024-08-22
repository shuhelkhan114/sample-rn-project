import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const UserCircleIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { stroke = theme.colors.black } = props
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M5.96 18.018a13.936 13.936 0 016.88-1.804c2.5 0 4.847.656 6.879 1.804m-3.88-7.804a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default UserCircleIcon
