import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const PhoneIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black } = props

  return (
    <Svg width={11} height={11} viewBox="0 0 11 11" fill="none" {...props}>
      <Path
        d="M1.342 1.807c0-.288.233-.521.52-.521h1.123c.254 0 .472.184.514.435l.385 2.312a.521.521 0 01-.281.551l-.807.404a5.751 5.751 0 003.181 3.18l.404-.806a.521.521 0 01.551-.28l2.312.384c.251.042.435.26.435.514v1.122a.521.521 0 01-.52.521H8.115A6.774 6.774 0 011.342 2.85V1.807z"
        fill={fill}
      />
    </Svg>
  )
}

export default PhoneIcon
