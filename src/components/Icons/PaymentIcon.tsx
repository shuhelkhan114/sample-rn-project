import Svg, { Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

function PaymentIcon(props: SVGIconProps) {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M19.665 14.72v-8c0-1.1-.9-2-2-2h-14c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0h-14v-8h14v8zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm13 0v11c0 1.1-.9 2-2 2h-17v-2h17v-11h2z"
        fill="#8001FF"
      />
    </Svg>
  )
}

export default PaymentIcon
