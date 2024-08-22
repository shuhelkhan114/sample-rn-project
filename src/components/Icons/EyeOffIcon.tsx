import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const EyeOffIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.gray600 } = props
  return (
    <Svg width={21} height={20} viewBox="0 0 21 20" fill="none" {...props}>
      <G clipPath="url(#clip0_4576_7261)" fill={fill}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.207 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0020.042 10c-1.274-4.057-5.064-7-9.542-7a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
        />
        <Path d="M12.954 16.697l-2.704-2.705a4 4 0 01-3.742-3.741L2.835 6.578A9.98 9.98 0 00.958 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
      </G>
      <Defs>
        <ClipPath id="clip0_4576_7261">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default EyeOffIcon
