import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Purchases from 'react-native-purchases'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import BookmarkIcon from '~/components/Icons/BookmarkIcon'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import Modal from '~/components/Modal/Modal'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { SubscriptionPlan } from '~/context/AuthContext'
import { useSubscription } from '~/context/SubscriptionContext'
import { analytics } from '~/core/lib/analytics'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import { SubscriptionPackage } from '~/typings/common'

type RecommendedRecoveryCoachProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.RecommendedRecoveryCoachScreen
>

export type RecommendedRecoveryCoachParams = undefined

const RecommendedRecoveryCoachScreen: React.FC<RecommendedRecoveryCoachProps> = (props) => {
  const { navigation } = props
  const { bottom } = useSafeAreaInsets()
  const [importantNoteModelVisibility, setImportantNoteModelVisibility] = useState(false)
  const { state, refetchProfile } = useAuth()
  const { currentOfferings, init } = useSubscription()
  const recoveryCoach = state.user?.recovery_coach
  const {
    isPending: assigningRecoveryCoach,
    error: assigningRecoveryCoachError,
    mutate: assignRecoveryCoach,
  } = useMutation({
    mutationFn: async (id: string) => {
      analytics.logRecoveryCoachSubscriptionInitiated()
      if (currentOfferings) {
        await API.user.assignRecoveryCoach(id)

        await Purchases.purchasePackage(
          currentOfferings?.[SubscriptionPackage.RecoveryCoach].availablePackages[0]
        )

        await API.user.updateProfile({
          onboarding_done: true,
          subscription_plan: SubscriptionPlan.MonthlyCoach,
        })
      }
    },
    onSuccess() {
      analytics.logRecoveryCoachSubscriptionCompleted()
      refetchProfile()
      navigation.replace(Screens.RevealUserScreen, {
        from: 'main',
        recoveryCoachId: recoveryCoach?.id,
      })
    },
    onError(error) {
      analytics.logRecoveryCoachSubscriptionFailed()
      console.log('error: ', error)
    },
  })

  useEffect(() => {
    analytics.logVisitRecoveryCoachSubscriptionScreen()
  }, [])

  // initialize subscriptions if not already
  useEffect(() => {
    if (!currentOfferings) {
      init()
    }
  }, [currentOfferings])

  const handleProceedWithRecoveryCoach = () => {
    if (recoveryCoach?.id && currentOfferings) {
      assignRecoveryCoach(recoveryCoach.id)
      // setImportantNoteModelVisibility(true)
    } else {
      toast.error('Error', 'Unable to process your request!')
    }
  }

  const handleAgree = () => {
    setImportantNoteModelVisibility(false)
    if (recoveryCoach) {
      navigation.navigate(Screens.SubscriptionScreen)
    }
  }

  let content: React.ReactNode = null

  if (!recoveryCoach) {
    content = (
      <Block flex1 align="center">
        <Block flex1 justify="center" align="center">
          <Typography variation="title4SemiBold">No Recovery Coach Matched</Typography>
          <Typography
            color="primary"
            variation="paragraphRegular"
            pV="md"
            onPress={() => refetchProfile()}>
            Try Again
          </Typography>
        </Block>
      </Block>
    )
  } else {
    content = (
      <ScrollView>
        <Block mH="5xl">
          <Block>
            <Typography center mT="md" variation="descriptionRegular" color="gray700">
              Based on your answers, we recommend this recovery coach. You can always change it
              later.
            </Typography>
          </Block>

          <Block mV="xl" bW={1} shadow="sm" rounded="xl" bC="gray100" bgColor="white">
            <Block relative>
              <Block
                zIndex={10}
                absolute
                bottom={8}
                right={8}
                flexDirection="row"
                align="center"
                bgColor="white"
                pV="md"
                pH="md"
                rounded="lg">
                <BookmarkIcon width={16} height={16} />
                <Typography color="primary" variation="smallRegular" mL="sm">
                  Recommended
                </Typography>
              </Block>
              <Block justify="center" align="center">
                <Image uri={recoveryCoach?.user_image} width={200} height={200} />
              </Block>
            </Block>
            <Block pH="xxl" pB="xxl" pT="md">
              <Block flexDirection="row" justify="space-between" align="center">
                <Typography variation="paragraphSemiBold" style={{ textTransform: 'capitalize' }}>
                  {recoveryCoach?.name}
                </Typography>
                <Block flexDirection="row" align="center">
                  <VerifiedAccountIcon width={16} height={16} />
                  <Typography mL="sm" color="primary" variation="smallRegular">
                    Verified
                  </Typography>
                </Block>
              </Block>

              <Block>
                <Typography mR="sm" variation="descriptionRegular" flex1>
                  {recoveryCoach?.parent_addictions.map((addiction) => addiction.name).join(', ')}
                </Typography>
              </Block>
            </Block>
          </Block>
          {recoveryCoach?.bio && (
            <Block mB="xxl">
              <Typography variation="title5SemiBold">My Story 🍀</Typography>
              <Typography mT="xl" variation="descriptionRegular" color="gray700">
                {recoveryCoach?.bio}
              </Typography>
            </Block>
          )}
        </Block>
      </ScrollView>
    )
  }

  return (
    <Block flex1>
      <NavigationBar />

      <Modal visible={importantNoteModelVisibility} onClose={setImportantNoteModelVisibility}>
        <Typography mT="xxxl" variation="title4SemiBold">
          Important note
        </Typography>

        <Typography mT="xxxl" variation="paragraphLight" color="gray700">
          You are in a safe environment
        </Typography>
        <Typography mT="lg" variation="paragraphLight" color="gray700">
          <Typography variation="paragraphSemiBold">
            Your identity is visible only to your recovery coach.
          </Typography>
          Everyone else in our community sees you as anonymous.
        </Typography>
        <Button loading={assigningRecoveryCoach} onPress={handleAgree} mT="xxxl" title="Proceed" />
      </Modal>

      {content}

      <Block mH="xl" mT="lg" style={{ paddingBottom: bottom }}>
        <ErrorText error={assigningRecoveryCoachError} />
        <Button
          loading={assigningRecoveryCoach}
          variation="primary"
          title="Confirm ($249/month)"
          onPress={handleProceedWithRecoveryCoach}
        />
        {/* <Button
          mT="lg"
          variation="tertiary"
          loading={exploringCommunity}
          onPress={handleExploreCommunity}
          title="I want to explore the community first"
        /> */}
      </Block>
    </Block>
  )
}

export default RecommendedRecoveryCoachScreen
