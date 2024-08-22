import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import Block from '~/components/Block/Block'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type ScheduleCallScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.ScheduleCallScreen>

export type ScheduleCallScreenParams = {
  link: string
}

const ScheduleCallScreen: React.FC<ScheduleCallScreenProps> = (props) => {
  const { route, navigation } = props
  const { link } = route.params

  const { bottom } = useSafeAreaInsets()
  const from: any = 'main'

  const handleButtonPress = () => {
    navigation.navigate(Screens.CongratulationsScreen, {
      from,
    })
  }

  return (
    <Block flex1 style={{ paddingBottom: bottom }}>
      <NavigationBar button={true} buttonTitle={'Done'} onPressButton={handleButtonPress} />
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: link,
          }}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </View>
    </Block>
  )
}

export default ScheduleCallScreen
