import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'

const CircularStarIcon: React.FC<SVGIconProps> = (props) => {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Circle cx={12.1899} cy={12.166} r={12} fill="#1E40AF" fillOpacity={1} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.97 7.016c.356 0 .645.288.645.643v.644h.643a.644.644 0 110 1.288h-.643v.644a.644.644 0 11-1.288 0V9.59h-.644a.644.644 0 010-1.288h.644V7.66c0-.355.288-.643.644-.643zm0 6.438c.356 0 .645.288.645.643v.644h.643a.644.644 0 010 1.288h-.643v.644a.644.644 0 11-1.288 0v-.644h-.644a.644.644 0 110-1.288h.644v-.644c0-.355.288-.643.644-.643zM13.477 7.016c.293 0 .548.196.623.479l.759 2.868 2.16 1.245a.644.644 0 010 1.116l-2.16 1.245-.76 2.868a.644.644 0 01-1.244 0l-.76-2.868-2.158-1.245a.644.644 0 010-1.116l2.159-1.245.76-2.868a.644.644 0 01.621-.48z"
        fill="#fff"
        fillOpacity={1}
      />
    </Svg>
  )
}

export default CircularStarIcon
