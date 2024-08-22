import { type ViewStyle } from 'react-native'
import { getSize } from '~/core/utils/responsive'

export const defaultBottomTabItemStyle: ViewStyle = {
  borderTopWidth: 1,
  marginHorizontal: getSize(12),
  position: 'absolute',
  backgroundColor: '#333333',
}
