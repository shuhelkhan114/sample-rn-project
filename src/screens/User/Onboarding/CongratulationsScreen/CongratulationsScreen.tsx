import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AlertBanner from '~/components/AlertBanner/AlertBanner'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { SubscriptionPlan } from '~/context/AuthContext'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { useChat } from '~/hooks/useChat'
import { MainStackScreens, Screens } from '~/navigation/screens'

type CongratulationsScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.CongratulationsScreen
>

export type CongratulationsScreenParams = {
  from?: 'main'
}

const CongratulationsScreen: React.FC<CongratulationsScreenProps> = (props) => {
  const { route, navigation } = props
  const { from } = route.params
  const { top, bottom } = useSafeAreaInsets()

  const { chatClient, setChannel } = useChat()
  const { state, refetchProfile, updateState } = useAuth()

  const { mutate: processChannel } = useMutation({
    mutationFn: API.chat.getChannel,
    onSuccess(channel) {
      setChannel(channel)
      navigation.navigate(Screens.HomeScreen)
      setTimeout(() => {
        navigation.navigate(Screens.ChatScreen)
      }, 0)
    },
  })

  const { isPending: updatingProfile, mutate: updateProfile } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess: async () => {
      refetchProfile()
      updateState({
        ...state,
        // @ts-ignore
        user: {
          ...state.user,
          onboarding_done: true,
        },
      })
      setTimeout(() => {
        if (chatClient?.user?.id && state?.user?.recovery_coach?.id) {
          processChannel([chatClient?.user?.id, state?.user?.recovery_coach?.id])
        }
      }, 0)
    },
  })

  const handleStart = async () => {
    updateProfile({ onboarding_done: true, subscription_plan: SubscriptionPlan.MonthlyCoach })
  }

  return (
    <Block flex1 pH="xl" style={{ paddingTop: top, paddingBottom: bottom }}>
      <Block mT="xl" align="center">
        <Block
          width={92}
          height={92}
          align="center"
          justify="center"
          bgColor="gray100"
          style={{ borderRadius: 92 }}>
          <Image size={49} source={require('~/assets/success_party.png')} />
        </Block>
        <Typography mT="xxxl" variation="title4SemiBold">
          Congratulations
        </Typography>
        <Typography center mT="md" color="gray800" variation="paragraphLight">
          Congratulations on starting {'\n'}your Recovery
        </Typography>
      </Block>

      {from === 'main' && <Typography mT="4xl">Thank you for scheduling the call.</Typography>}

      <AlertBanner
        mT="xl"
        variation="warning"
        text="You are still anonymous. Your identity is only revealed to your Recovery Coach who has a confidentiality agreement"
      />

      <Block mB="auto" mT="xl" rounded="lg" shadow="sm" pV="xl" pH="xxxl" bgColor="white">
        <Block>
          <Typography color="gray700" variation="descriptionSemiBold">
            Consistent Sessions:
          </Typography>
          <Typography color="gray700" mT="xl" variation="descriptionRegular">
            Try to keep the same time on a weekly basis to meet with your recovery coach
          </Typography>
        </Block>
        <Block>
          <Typography color="gray700" mT="xxl" variation="descriptionSemiBold">
            Resource Assistance:
          </Typography>
          <Typography color="gray700" variation="descriptionRegular">
            For legal, financial, or debt help, email us at consultations@yu-me.us with your
            information. We&apos;re here to support your recovery journey.
          </Typography>
        </Block>
      </Block>

      <Button title="Let's start!" loading={updatingProfile} onPress={handleStart} />
    </Block>
  )
}

export default CongratulationsScreen
