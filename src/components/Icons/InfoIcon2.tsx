import Svg, { Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

const InfoIcon2: React.FC<SVGIconProps> = (props) => {
  const { width = 21, height = 21 } = props
  return (
    <Svg width={width} height={height} viewBox="0 0 21 21" fill="none">
      <Path
        d="M10.986 14.261h-.833v-3.333h-.834m.834-3.333h.008m7.492 3.333a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        stroke="#6C727F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default InfoIcon2
