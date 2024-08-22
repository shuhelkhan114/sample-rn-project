import Svg, { Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

function TriangleSVG(props: SVGIconProps) {
  return (
    <Svg width={29} height={26} viewBox="0 0 29 26" fill="none" {...props}>
      <Path d="M14.489.037l14.483 25.085H.006L14.49.037z" fill="#F3F4F6" />
    </Svg>
  )
}

export default TriangleSVG
