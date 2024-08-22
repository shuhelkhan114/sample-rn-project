import { AndroidImportance } from '@notifee/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StreamVideoClient, StreamVideoRN } from '@stream-io/video-react-native-sdk'
import { Screens } from '~/navigation/screens'
import ENV from '../config/env'
import { navigationRef, waitForNavigationToBeReady } from '../utils/navigation'

export const setupCallPushConfig = () => {
  StreamVideoRN.setPushConfig({
    ios: {
      // add your push_provider_name for iOS that you have setup in Stream dashboard
      pushProviderName: ENV.stream.pushProviderName,
    },
    android: {
      // add your push_provider_name for Android that you have setup in Stream dashboard
      pushProviderName: ENV.stream.pushProviderName,
      // configure the notification channel to be used for incoming calls for Android.
      incomingCallChannel: {
        id: 'stream_incoming_call',
        name: 'Incoming call notifications',
        // This is the advised importance of receiving incoming call notifications.
        // This will ensure that the notification will appear on-top-of applications.
        importance: AndroidImportance.HIGH,
        sound: 'yume.wav',
      },
      // configure the functions to create the texts shown in the notification
      // for incoming calls in Android.
      incomingCallNotificationTextGetters: {
        getTitle: (createdUserName: string) => 'Incoming call',
        getBody: (_createdUserName: string) => 'Tap to answer the call',
      },
    },
    // add the callback to be executed a call is accepted, used for navigation
    navigateAcceptCall: () => {
      waitForNavigationToBeReady().then(() => {
        navigationRef.current({ name: Screens.CallScreen, params: undefined })
      })
    },
    // add the callback to be executed when a notification is tapped,
    // but the user did not press accept or decline, used for navigation
    navigateToIncomingCall: () => {
      waitForNavigationToBeReady().then((res) => {
        navigationRef.current({ name: Screens.CallScreen, params: undefined })
      })
    },
    // add the async callback to create a video client
    // for incoming calls in the background on a push notification
    createStreamVideoClient: async () => {
      // note that since the method is async,
      // you can call your server to get the user data or token or retrieve from offline storage.
      const userId = await AsyncStorage.getItem('userId')
      const userName = await AsyncStorage.getItem('userName')
      const token = await AsyncStorage.getItem('userToken')

      if (!userName || !token) return undefined

      const user = { id: userId, name: userName, token }

      // @ts-ignore
      return new StreamVideoClient({
        apiKey: ENV.stream.apiKey,
        user,
        token,
      })
    },
  })
}
