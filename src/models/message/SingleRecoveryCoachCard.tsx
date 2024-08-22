import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'
import { useMutation } from '@tanstack/react-query'
import { customAlphabet } from 'nanoid/non-secure'
import { useEffect } from 'react'
import { TourGuideZone, useTourGuideController } from 'rn-tourguide'
import Block from '~/components/Block/Block'
import MessageIcon from '~/components/Icons/MessageIcon'
import PhoneIcon from '~/components/Icons/PhoneIcone'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { SubscriptionPlan } from '~/context/AuthContext'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getSize } from '~/core/utils/responsive'
import useAuth from '~/hooks/useAuth'
import { useChat } from '~/hooks/useChat'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

interface RecoveryCoachCardProps {
  id: string
  name: string
  image?: any
  addictions: string[]
  notification?: number
  isOnline: boolean
  soberness: string
}

const RecoveryCoachCard: React.FC<RecoveryCoachCardProps> = (props) => {
  const { id, name, image, addictions, isOnline } = props

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.ChatScreen>>()
  const { currentUser } = useAuth()
  const { chatClient, setChannel } = useChat()

  const theme = useAppTheme()
  const allowToContactCoach = currentUser?.subscription_plan === SubscriptionPlan?.MonthlyCoach

  const { stop, start } = useTourGuideController()
  const { videoClient } = useChat()

  const { mutate: processChannel } = useMutation({
    mutationFn: API.chat.getChannel,
    onSuccess(channel) {
      setChannel(channel)
      navigation.navigate(Screens.ChatScreen)
    },
  })

  useEffect(() => {
    if (allowToContactCoach) {
      stop()
    }
  }, [currentUser?.subscription_plan])

  const handleMessage = () => {
    if (chatClient?.user?.id) {
      processChannel([chatClient?.user?.id, id])
    }
  }

  const handlePress = async () => {
    if (currentUser?.subscription_plan !== SubscriptionPlan?.MonthlyCoach) {
      navigation.navigate(Screens.RecommendedRecoveryCoachScreen)
    } else if (chatClient?.user?.id) {
      processChannel([chatClient?.user?.id, id])
    }
  }

  const handleCall = () => {
    if (currentUser?.subscription_plan !== SubscriptionPlan?.MonthlyCoach) {
      start()
    } else {
      try {
        if (videoClient) {
          const callId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)()
          navigation.navigate(Screens.CallScreen, {
            callId,
            userId: id,
            mode: 'create',
            type: 'audio',
          })
        } else {
          toast.error('Unable to initiate call', 'Please restart the app!')
        }
      } catch (error) {
        toast.error('Unable to initiate call', 'Please restart the app!')
      }
    }
  }

  return (
    <Block
      mV="lg"
      pV="xl"
      pH="xl"
      shadow="sm"
      rounded="lg"
      align="center"
      bgColor="white"
      flexDirection="row"
      onPress={handlePress}
      justify="space-between">
      <Block flex1 flexDirection="row" align="center">
        <Block>
          <Image circular size={getSize(56)} uri={image} />
          {isOnline && (
            <Block
              bW={1}
              absolute
              bottom={1}
              right={1}
              width={12}
              bC="white"
              height={12}
              rounded="xxxl"
              bgColor="positive"
            />
          )}
        </Block>

        <Block mL="lg" flex1>
          <Typography variation="descriptionSemiBold">{name}</Typography>
          <Typography color="gray600" variation="smallRegular" numberOfLines={1}>
            {addictions.join(', ')}
          </Typography>
        </Block>
      </Block>

      <Block>
        <Block mB="lg" flexDirection="row" align="center" justify="flex-end">
          <VerifiedAccountIcon width={16} height={16} />
          <Typography mL="sm" color="primary" variation="smallRegular">
            Verified
          </Typography>
        </Block>
        <Block flexDirection="row" align="center">
          <Block
            pH="lg"
            pV="md"
            mR="md"
            rounded="md"
            onPress={handleMessage}
            bgColor="backgroundPrimary">
            <MessageIcon fill={theme.colors.primary} width={11} height={11} />
          </Block>
          <TourGuideZone zone={1} style={{ paddingHorizontal: 0, borderRadius: 20 }}>
            <Block
              pH="lg"
              pV="md"
              rounded="md"
              onPress={handleCall}
              bgColor={allowToContactCoach ? 'backgroundPrimary' : 'gray100'}>
              <PhoneIcon fill={allowToContactCoach ? theme.colors.primary : theme.colors.gray300} />
            </Block>
          </TourGuideZone>
        </Block>
      </Block>
    </Block>
  )
}

export default RecoveryCoachCard
