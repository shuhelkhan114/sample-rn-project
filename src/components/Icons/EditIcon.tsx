import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const EditIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black, width = 16, height = 16 } = props

  return (
    <Svg width={width} height={height} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M16.447 5.238a2.4 2.4 0 113.394 3.395l-.952.951-3.394-3.394.952-.952zM13.798 7.887L3.744 17.941v3.395h3.394L17.192 11.28l-3.394-3.394z"
        fill={fill}
      />
    </Svg>
  )
}

export default EditIcon
