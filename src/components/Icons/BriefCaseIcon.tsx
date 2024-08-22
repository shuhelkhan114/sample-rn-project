import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useAppTheme from '~/hooks/useTheme'
import { SVGIconProps } from '~/typings/common'

const BriefCaseIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { stroke = theme.colors.black } = props

  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M21.84 13.256a23.933 23.933 0 01-9 1.744c-3.183 0-6.22-.62-9-1.744M16.84 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01m-7.01 8h14a2 2 0 002-2V8a2 2 0 00-2-2h-14a2 2 0 00-2 2v10a2 2 0 002 2z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default BriefCaseIcon
