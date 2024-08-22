import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CallContent, StreamCall, StreamVideoClient } from '@stream-io/video-react-native-sdk'
import { useEffect, useState } from 'react'
import Typography from '~/components/Typography/Typography'
import toast from '~/core/lib/toast'
import useAuth from '~/hooks/useAuth'
import { useChat } from '~/hooks/useChat'
import { MainStackScreens, Screens } from '~/navigation/screens'

type CallScreenProps = NativeStackScreenProps<MainStackScreens, Screens.CallScreen>

export type CallScreenParams =
  | {
      mode?: 'join' | 'create'
      callId?: string
      userId?: string
      type?: 'audio' | 'video'
    }
  | undefined

const CallScreen: React.FC<CallScreenProps> = (props) => {
  const { navigation, route } = props
  const { callId, userId, mode, type = 'video' } = route.params || {}
  // const [call, setCall] = useState<Call | null>()

  const { currentUser } = useAuth()
  const { videoClient, call, setCall } = useChat()
  const [isAudioCall, setIsAudioCall] = useState(false)

  useEffect(() => {
    setIsAudioCall(type === 'audio')
  }, [])

  async function initCall(videoClient: StreamVideoClient, callId: string, userId?: string) {
    const call = videoClient.call('default', callId.replace('default:', ''))
    if (mode === 'create') {
      await call.create({
        ring: true,
        data: {
          members: [{ user_id: currentUser.id }, { user_id: userId as string }],
          custom: {
            type,
          },
        },
      })
      call.join({ ring: true })
      setCall(call)
    } else {
      call
        .get()
        .then((res) => {
          setIsAudioCall(res.call.custom?.type === 'audio')
          call.join()
          setCall(call)
        })
        .catch(() => {
          toast.error('Error', 'Unable to join call!')
        })
    }
  }

  useEffect(() => {
    if (videoClient && !call && callId) {
      initCall(videoClient, callId, userId)
    }
  }, [videoClient])

  const handleHangup = async () => {
    call?.endCall()
    setCall(null)
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate(Screens.HomeScreen)
    }
  }

  if (!call) {
    return <Typography>Loading...</Typography>
  }

  return (
    <StreamCall call={call} mediaDeviceInitialState={{ initialVideoEnabled: !isAudioCall }}>
      <CallContent onHangupCallHandler={handleHangup} />
    </StreamCall>
  )
}

export default CallScreen
