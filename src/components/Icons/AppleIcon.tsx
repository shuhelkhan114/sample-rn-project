import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { type SVGIconProps } from 'src/typings/common'
import useAppTheme from '~/hooks/useTheme'

const AppleIcon: React.FC<SVGIconProps> = (props) => {
  const theme = useAppTheme()
  const { fill = theme.colors.black } = props

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={fill} {...props}>
      <Path
        d="M20.338 8.5c-.127.099-2.38 1.368-2.38 4.19 0 3.266 2.866 4.42 2.952 4.45-.013.07-.455 1.581-1.511 3.121-.942 1.355-1.925 2.708-3.421 2.708-1.496 0-1.881-.869-3.608-.869-1.683 0-2.282.898-3.65.898-1.368 0-2.323-1.254-3.421-2.794C4.027 18.395 3 15.586 3 12.92c0-4.277 2.78-6.545 5.518-6.545 1.454 0 2.666.954 3.579.954.869 0 2.224-1.012 3.879-1.012.627 0 2.88.058 4.362 2.183zM15.19 4.507c.684-.812 1.168-1.938 1.168-3.065 0-.156-.013-.314-.041-.442-1.114.042-2.438.741-3.237 1.668-.627.712-1.212 1.839-1.212 2.98 0 .172.029.344.042.399.07.013.185.028.3.028.998 0 2.254-.668 2.98-1.568z"
        fill={fill}
      />
    </Svg>
  )
}

export default AppleIcon
