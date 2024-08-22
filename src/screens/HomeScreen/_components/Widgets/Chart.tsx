import Svg, { G, Mask, Path } from 'react-native-svg'
import { SVGIconProps } from '~/typings/common'

function Chart(props: SVGIconProps) {
  return (
    <Svg width={137} height={70} viewBox="0 0 137 70" fill="none" {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={137} height={70}>
        <Path fill="#D9D9D9" d="M0.800293 0.319824H136.293293V69.678624H0.800293z" />
      </Mask>
      <G mask="url(#a)">
        <Mask id="b" fill="#fff">
          <Path d="M.8 69.64a67.002 67.002 0 0127.125-53.844l17.262 23.308A38 38 0 0029.804 69.64H.8z" />
        </Mask>
        <Path
          d="M.8 69.64a67.002 67.002 0 0127.125-53.844l17.262 23.308A38 38 0 0029.804 69.64H.8z"
          stroke="#8001FF"
          strokeWidth={100}
          mask="url(#b)"
        />
        <Mask id="c" fill="#fff">
          <Path d="M67.93 2.138a67.004 67.004 0 0133.612 8.825L87.154 36.146a38 38 0 00-19.062-5.005L67.93 2.138z" />
        </Mask>
        <Path
          d="M67.93 2.138a67.004 67.004 0 0133.612 8.825L87.154 36.146a38 38 0 00-19.062-5.005L67.93 2.138z"
          stroke="#F0E5FC"
          strokeWidth={100}
          mask="url(#c)"
        />
        <Mask id="d" fill="#fff">
          <Path d="M29.152 14.765a67.003 67.003 0 0136.89-12.59l.98 28.987a37.999 37.999 0 00-20.923 7.14L29.152 14.766z" />
        </Mask>
        <Path
          d="M29.152 14.765a67.003 67.003 0 0136.89-12.59l.98 28.987a37.999 37.999 0 00-20.923 7.14L29.152 14.766z"
          stroke="#C6D2FD"
          strokeWidth={100}
          mask="url(#d)"
        />
        <Mask id="e" fill="#fff">
          <Path d="M103.478 12.218a67 67 0 0120.255 18.79l-23.686 16.74A38 38 0 0088.56 37.09l14.918-24.873z" />
        </Mask>
        <Path
          d="M103.478 12.218a67 67 0 0120.255 18.79l-23.686 16.74A38 38 0 0088.56 37.09l14.918-24.873z"
          stroke="#E5EAFC"
          strokeWidth={100}
          mask="url(#e)"
        />
        <Mask id="f" fill="#fff">
          <Path d="M103.478 12.218a67 67 0 0120.255 18.79l-23.686 16.74A38 38 0 0088.56 37.09l14.918-24.873z" />
        </Mask>
        <Path
          d="M103.478 12.218a67 67 0 0120.255 18.79l-23.686 16.74A38 38 0 0088.56 37.09l14.918-24.873z"
          stroke="#E5EAFC"
          strokeWidth={100}
          mask="url(#f)"
        />
        <Mask id="g" fill="#fff">
          <Path d="M124.507 32.286a66.995 66.995 0 0111.779 37.002l-29 .412a37.999 37.999 0 00-6.681-20.985l23.902-16.43z" />
        </Mask>
        <Path
          d="M124.507 32.286a66.995 66.995 0 0111.779 37.002l-29 .412a37.999 37.999 0 00-6.681-20.985l23.902-16.43z"
          stroke="#C6D2FD"
          strokeWidth={100}
          mask="url(#g)"
        />
      </G>
    </Svg>
  )
}

export default Chart
