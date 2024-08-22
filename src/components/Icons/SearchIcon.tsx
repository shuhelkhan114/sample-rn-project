import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const SearchIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black } = props

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={fill} {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={25}>
        <Path fill="#D9D9D9" d="M0 0.5H24V24.5H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M19.485 20.654l-6.262-6.262c-.5.426-1.075.756-1.725.989-.65.233-1.303.35-1.96.35-1.601 0-2.957-.555-4.066-1.663-1.11-1.11-1.664-2.464-1.664-4.065 0-1.6.554-2.956 1.663-4.067C6.58 4.825 7.934 4.269 9.535 4.269s2.957.555 4.068 1.664c1.11 1.11 1.666 2.465 1.666 4.067a5.65 5.65 0 01-.37 2.017 5.48 5.48 0 01-.968 1.668l6.261 6.261-.707.708zM9.538 14.73c1.327 0 2.447-.457 3.361-1.37.913-.914 1.37-2.034 1.37-3.36 0-1.328-.457-2.448-1.37-3.362-.913-.913-2.034-1.37-3.36-1.37-1.328 0-2.448.457-3.361 1.37-.914.914-1.37 2.034-1.37 3.361 0 1.327.456 2.447 1.37 3.36.913.914 2.033 1.37 3.36 1.37z"
          fill={fill}
        />
      </G>
    </Svg>
  )
}

export default SearchIcon
