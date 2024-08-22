import Svg, { Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

const DocumentIcon: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M9.256 12.016h6m-6 4h6m2 5h-10a2 2 0 01-2-2v-14a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v9.586a2 2 0 01-2 2z"
        stroke="#8001FF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default DocumentIcon
