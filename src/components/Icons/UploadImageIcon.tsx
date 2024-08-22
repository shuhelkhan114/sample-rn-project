import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const UploadImageIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { width = 24, height = 24, fill = theme.colors.primary } = props

  return (
    <Svg width={width} height={height} viewBox="0 0 49 48" fill="none" {...props}>
      <Path
        d="M28.5 8h-16a4 4 0 00-4 4v20m0 0v4a4 4 0 004 4h24a4 4 0 004-4v-8m-32 4l9.172-9.172a4 4 0 015.656 0L28.5 28m12-8v8m0 0l-3.172-3.172a4 4 0 00-5.656 0L28.5 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default UploadImageIcon
