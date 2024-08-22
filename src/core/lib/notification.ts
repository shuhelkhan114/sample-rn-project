import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid, Platform } from 'react-native'
import toast from './toast'

export const requestPushNotificationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      await messaging().requestPermission({
        sound: true,
        alert: true,
      })
    } else {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
    }
  } catch (error) {
    toast.error(
      'Notification permission denied!',
      'Unable to request permission, please turn in on manually'
    )
  }
}
