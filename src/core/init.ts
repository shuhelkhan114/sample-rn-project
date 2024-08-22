import { GiphySDK } from '@giphy/react-native-sdk'
import * as Sentry from '@sentry/react-native'

export const init = () => {
  Sentry.init({
    dsn: 'https://323b19f0c4e0d74f87f74ec8d9bca095@o4506551130259456.ingest.sentry.io/4506556611297280',
    tracesSampleRate: 1.0,
    enabled: !__DEV__,
  })
  GiphySDK.configure({
    apiKey: '4jkrjHQp4P5pU1aK91h0QUC8ghRF1krc',
  })
}
