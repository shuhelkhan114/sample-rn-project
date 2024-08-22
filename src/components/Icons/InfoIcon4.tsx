import Svg, { Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

const InfoIcon4: React.FC<SVGIconProps> = (props) => {
  const { width = 25, height = 24 } = props
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M12.893 11.5v5m0-8.99l.01-.011M12.893 22c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
        stroke="#4D5562"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default InfoIcon4
