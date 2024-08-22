import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'

import { setupCallPushConfig } from '~/core/lib/stream'
import App from './App'
import { name as appName } from './app.json'

setupCallPushConfig()
AppRegistry.registerComponent(appName, () => App)
