import notifee, { EventType, Notification } from '@notifee/react-native'
import { useNetInfo } from '@react-native-community/netinfo'
import analytics from '@react-native-firebase/analytics'
import auth from '@react-native-firebase/auth'
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links'
import messaging from '@react-native-firebase/messaging'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import * as Sentry from '@sentry/react-native'
import { StreamVideo } from '@stream-io/video-react-native-sdk'
import { QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { useContext, useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import { ClickOutsideProvider } from 'react-native-click-outside'
import FastImage from 'react-native-fast-image'
import { Settings } from 'react-native-fbsdk-next'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MenuProvider } from 'react-native-popup-menu'
import Sound from 'react-native-sound'

import LogRocket from '@logrocket/react-native'
import Toast from 'react-native-toast-message'
import { requestTrackingPermission } from 'react-native-tracking-transparency'
import { TourGuideProvider } from 'rn-tourguide'
import { Chat, OverlayProvider } from 'stream-chat-react-native'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import CaretIcon from '~/components/Icons/CaretIcon'
import Typography from '~/components/Typography/Typography'
import ActivityContextProvider from '~/context/ActivityContext'
import RootContextProvider from '~/context/AppContext'
import AuthContextProvider from '~/context/AuthContext'
import ChatContextProvider, { _chatClient, _videoClient } from '~/context/ChatContext'
import ConfigContextProvider, { ConfigContext } from '~/context/ConfigContext'
import SubscriptionContextProvider, { useSubscription } from '~/context/SubscriptionContext'
import { FONTS } from '~/core/config/fonts'
import toastConfig from '~/core/config/toastConfig'
import { init } from '~/core/init'
import { requestPushNotificationPermission } from '~/core/lib/notification'
import { queryClient } from '~/core/lib/react-query'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { navigationRef, waitForNavigationToBeReady } from '~/core/utils/navigation'
import { getParameterValueFromUrl } from '~/core/utils/url'
import useAuth from '~/hooks/useAuth'
import { useChat } from '~/hooks/useChat'
import useAppTheme from '~/hooks/useTheme'
import AuthStack from '~/navigation/AuthStack'
import MainStack from '~/navigation/MainStack'
import { Screens } from '~/navigation/screens'
import ThemeContextProvider from './src/context/ThemeContext'

Settings.initializeSDK()
Settings.setAutoLogAppEventsEnabled(true)
Settings.setAdvertiserTrackingEnabled(true)
Settings.setAdvertiserIDCollectionEnabled(true)
Settings.getAdvertiserTrackingEnabled()

init()

analytics().setAnalyticsCollectionEnabled(true)

// eslint-disable-next-line @typescript-eslint/no-var-requires
const callRingRound = new Sound(require('./src/assets/Yume_call.wav'), (error) => {
  if (error) {
    console.log('failed to load the sound', error)
  }
})

interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  // States
  const { loaded, state, currentUser, refetchProfile } = useAuth()
  const { fetchConfig, config } = useContext(ConfigContext)
  const { setChannel } = useChat()
  const [fontsLoaded] = useFonts(FONTS)
  const netInfo = useNetInfo()
  const { init } = useSubscription()
  const [gifPlayed, setGifPlayed] = useState(false)

  useEffect(() => {
    notifee.getBadgeCount().then((count) => {
      if (count > 0) {
        notifee.setBadgeCount(0)
      }
    })
  }, [])

  useEffect(() => {
    async function init() {
      await requestTrackingPermission()
      Settings.setAutoLogAppEventsEnabled(true)
      Settings.setAdvertiserTrackingEnabled(true)
      Settings.setAdvertiserIDCollectionEnabled(true)
      Settings.getAdvertiserTrackingEnabled()
    }

    init()
  }, [])

  useEffect(() => {
    Settings.setAdvertiserTrackingEnabled(true)
  }, [])

  // Initialize the App Subscriptions
  useEffect(() => {
    init()
  }, [])

  // Subscribe to the Plan if the user has a recovery coach id and not subscribed yet
  const handleSubscribe = () => {
    if (state?.user?.recovery_coach_id) {
      navigationRef.current?.navigate(Screens.RecommendedRecoveryCoachScreen, {
        recoveryCoachId: state.user.recovery_coach_id,
        from: 'main',
      })
    }
  }

  // Prefetch user avatars
  useEffect(() => {
    if (config?.user_profile_avatars?.length) {
      FastImage.preload(config?.user_profile_avatars.map((avatar) => ({ uri: avatar })))
    }
  }, [config?.user_profile_avatars])

  // Request Push Notification Permissions
  useEffect(() => {
    requestPushNotificationPermission()
  }, [])

  const handleNotification = async (notification: Notification) => {
    await waitForNavigationToBeReady()

    if (notification) {
      // handle stream chat notifications
      if (notification.data?.channel_id) {
        if (navigationRef.current?.getCurrentRoute()?.name !== 'ChatScreen') {
          const channel = await API.chat.getChannelById(notification.data?.channel_id as string)
          setChannel(channel)
          navigationRef.current.navigate(Screens.ChatScreen)
        }
      } else if (notification.data?.sender === 'stream.video') {
        navigationRef.current.navigate(Screens.CallScreen, {
          callId: notification.data.call_cid,
        })
      } else if (notification.data?.notification_type === 'checkin') {
        navigationRef.current.navigate(Screens.CreateCheckinScreen)
      } else if (notification.data?.activity_id && notification.data?.reaction_id) {
        navigationRef.current.navigate(Screens.PostDetailScreen, {
          postId: notification.data.activity_id,
          commentId: notification.data.reaction_id,
        })
      } else if (notification.data?.activity_id) {
        navigationRef.current.navigate(Screens.PostDetailScreen, {
          postId: notification.data.activity_id,
        })
      }
    }
  }

  // Types of Notification events
  useEffect(() => {
    notifee.onBackgroundEvent(async ({ detail, type }) => {
      console.log(detail)
      if (type === EventType.PRESS && detail.notification) {
        handleNotification(detail.notification)
      }
    })

    notifee.getInitialNotification().then(async (initialNotification) => {
      if (initialNotification) {
        handleNotification(initialNotification.notification)
      }
    })

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage)
      // display chat notifications
      if (remoteMessage?.data?.channel_id) {
        if (navigationRef.current?.getCurrentRoute()?.name === 'ChatScreen') {
          return
        } else {
          if (!currentUser.doneOnboarding) {
            return
          }
        }
        await notifee.requestPermission({ sound: true, announcement: true, criticalAlert: true })

        notifee.displayNotification({
          title: "You've got a new message in Yume",
          body: remoteMessage.notification?.body,
          data: remoteMessage.data,
          ios: {
            sound: 'yume.wav',
          },
        })

        return null
      }

      // display video notifications
      if (remoteMessage.data?.sender === 'stream.video') {
        console.log(remoteMessage.data)
        if (remoteMessage.data?.type === 'call.ring') {
          // play sound for 3 sec.
          callRingRound.play(() => callRingRound.play())
        }

        await notifee.setNotificationCategories([
          {
            id: 'incoming-call',
            actions: [
              { id: 'Accept', title: 'Accept' },
              { id: 'Reject', title: 'Reject' },
            ],
          },
        ])
        await notifee.requestPermission({ sound: true })

        await notifee.displayNotification({
          title: 'Incoming call...',
          body: 'Tap to join',
          data: remoteMessage.data,
          ios: {
            categoryId: 'incoming-call',
            // sound: 'yume.wav',
          },
        })

        return null
      }
      // await notifee.requestPermission({ sound: true })

      // display other notifications
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        data: remoteMessage.data,
        ios: { sound: 'yume.wav' },
      })
    })

    const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS && detail.notification) handleNotification(detail.notification)
    })

    return () => {
      unsubscribe()
      unsubscribeNotifee()
    }
  }, [currentUser])

  // Fetch Config if not available in the state already
  useEffect(() => {
    if (!config?.user_profile_avatars?.[0]) {
      fetchConfig()
    }
  }, [config])

  // Network Toast Error
  useEffect(() => {
    if (netInfo?.isConnected === false) {
      // if the internet connection is not there or there is error fetching in config or profile
      toast.error(
        'Network error!',
        'Unable to sync with server, try again!',
        'Sync',
        sync,
        'top',
        60 * 1000
      )
    }
  }, [netInfo.isConnected])

  // Toast Action
  const sync = () => {
    if (auth().currentUser?.uid) {
      refetchProfile()
    }
    fetchConfig()
    Toast.hide()
  }

  // Dynamic Links Navigation Handler for Recovery Coach
  useEffect(() => {
    dynamicLinks().getInitialLink().then(handleDynamicLink)
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGifPlayed(true)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  })

  useEffect(() => {
    if (currentUser?.id) {
      if (!currentUser?.doneOnboarding) {
        LogRocket.init('jeivco/yume')
        LogRocket.identify(currentUser.id, {
          name: currentUser.name,
          email: currentUser.email,
        })
      }
    }
  }, [currentUser])

  const handleDynamicLink = async (link: FirebaseDynamicLinksTypes.DynamicLink | null) => {
    if (link) {
      await waitForNavigationToBeReady()
      const invitationId = getParameterValueFromUrl(link.url, 'invitationId')
      const email = getParameterValueFromUrl(link.url, 'email')

      navigationRef.current?.navigate(Screens.RecoveryCoachContinueWithEmailScreen, {
        invitationId,
        email,
      })
    }
  }

  return (
    <Chat client={_chatClient}>
      <Block absolute width="100%" top={0} left={0} zIndex={9999999999999}>
        <Toast config={toastConfig} />
      </Block>

      <Block bgColor="white" flex1>
        <TourGuideProvider
          dismissOnPress
          tooltipComponent={() => (
            <Block width="95%" bgColor="white" pH="xl" pV="xl" rounded="xl">
              <Block absolute right={20} top={-15}>
                <CaretIcon />
              </Block>
              <Typography variation="descriptionSemiBold">Call is not available!</Typography>
              <Typography mT="lg" color="gray600" variation="descriptionRegular">
                To respond to the therapist and initiate your connection, you need to subscribe our
                plan.
              </Typography>
              <Block>
                <Button mT="xl" title="Subscribe now" onPress={handleSubscribe} />
              </Block>
            </Block>
          )}>
          <Block flex1>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={require('~/assets/splash.gif')}
              style={{
                display: !gifPlayed || !loaded || !fontsLoaded ? 'flex' : 'none',
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                backgroundColor: '#732DF6',
              }}
            />
            {currentUser?.doneOnboarding ? <MainStack /> : <AuthStack />}
          </Block>
        </TourGuideProvider>
      </Block>
    </Chat>
  )
}

// APP Normal FLow
const Root: React.FC = () => {
  const theme = useAppTheme()

  const routeNameRef = useRef()

  const extendedTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.white,
    },
  }

  const handleStateChange = async () => {
    const previousRouteName = routeNameRef.current
    // @ts-ignore
    const currentRouteName = navigationRef?.current?.getCurrentRoute?.()?.name

    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      })
    }
    routeNameRef.current = currentRouteName
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SubscriptionContextProvider>
        <StreamVideo client={_videoClient}>
          <MenuProvider>
            <ClickOutsideProvider>
              <ChatContextProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <OverlayProvider>
                    <ThemeContextProvider>
                      <ActivityContextProvider>
                        <AuthContextProvider>
                          <ConfigContextProvider>
                            <RootContextProvider>
                              <NavigationContainer
                                onStateChange={handleStateChange}
                                onReady={() => {
                                  routeNameRef.current =
                                    navigationRef?.current?.getCurrentRoute?.()?.name
                                }}
                                ref={navigationRef}
                                theme={extendedTheme}>
                                <App />
                              </NavigationContainer>
                            </RootContextProvider>
                          </ConfigContextProvider>
                        </AuthContextProvider>
                      </ActivityContextProvider>
                    </ThemeContextProvider>
                  </OverlayProvider>
                </GestureHandlerRootView>
              </ChatContextProvider>
            </ClickOutsideProvider>
          </MenuProvider>
        </StreamVideo>
      </SubscriptionContextProvider>
    </QueryClientProvider>
  )
}

export default Sentry.wrap(Root)
