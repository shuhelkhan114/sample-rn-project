import Svg, { Circle, Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

const InfoIcon: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Circle cx={12.3003} cy={12.6375} r={12} fill="#F3F4F6" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.45 12.637a5.15 5.15 0 11-10.3 0 5.15 5.15 0 0110.3 0zm-4.506 2.576a.644.644 0 11-1.287 0 .644.644 0 011.287 0zM12.3 9.418a.644.644 0 00-.644.644v2.575a.644.644 0 001.288 0v-2.575a.644.644 0 00-.644-.644z"
        fill="#9DA3AE"
      />
    </Svg>
  )
}

export default InfoIcon
