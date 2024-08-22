import * as React from 'react'
import Svg, { G, Mask, Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const SOSIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.white } = props

  return (
    <Svg width={34} height={34} viewBox="0 0 34 34" fill="none" {...props}>
      <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={34} height={34}>
        <Path fill="#D9D9D9" d="M0 0H34V34H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M14.875 24.083c-.78 0-1.446-.277-2.001-.832a2.728 2.728 0 01-.832-2.001v-8.5c0-.78.277-1.446.832-2.001a2.728 2.728 0 012.001-.833h4.25c.78 0 1.446.278 2.001.833.555.555.832 1.222.832 2v8.5c0 .78-.277 1.447-.832 2.002a2.729 2.729 0 01-2.001.832h-4.25zm-13.458 0V21.25h5.666v-2.834H4.25c-.78 0-1.446-.277-2.001-.832a2.728 2.728 0 01-.832-2V12.75c0-.78.277-1.446.832-2.001a2.728 2.728 0 012.001-.833h5.667v2.834H4.25v2.833h2.833c.78 0 1.447.278 2.001.833.555.554.833 1.221.833 2v2.834c0 .779-.278 1.446-.833 2a2.729 2.729 0 01-2 .833H1.416zm22.666 0V21.25h5.667v-2.834h-2.833c-.78 0-1.447-.277-2.001-.832a2.728 2.728 0 01-.833-2V12.75c0-.78.278-1.446.833-2.001a2.728 2.728 0 012-.833h5.667v2.834h-5.666v2.833h2.833c.78 0 1.446.278 2.001.833.555.554.832 1.221.832 2v2.834c0 .779-.277 1.446-.832 2a2.729 2.729 0 01-2.001.833h-5.667zm-9.208-2.833h4.25v-8.5h-4.25v8.5z"
          fill={fill}
        />
      </G>
    </Svg>
  )
}

export default SOSIcon
