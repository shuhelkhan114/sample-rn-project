import { RFValue } from 'react-native-responsive-fontsize'

const STANDARD_SCREEN_HEIGHT = 844

export const getSize = (size: number) => {
  return RFValue(size, STANDARD_SCREEN_HEIGHT)
}
