import Svg, { Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

function ArrowSVG(props: SVGIconProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.329 4.642a1.118 1.118 0 011.58 0l6.706 6.706a1.118 1.118 0 010 1.58l-6.706 6.706a1.118 1.118 0 01-1.58-1.58l4.797-4.798H4.178a1.118 1.118 0 010-2.236h12.948L12.33 6.224a1.118 1.118 0 010-1.581z"
        fill="#8001FF"
      />
    </Svg>
  )
}

export default ArrowSVG
