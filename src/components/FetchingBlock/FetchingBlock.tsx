import { ActivityIndicator } from 'react-native'
import Block from '../Block/Block'

function FetchingBlock() {
  return (
    <Block flex1 justify="center" align="center">
      <ActivityIndicator />
    </Block>
  )
}

export default FetchingBlock
