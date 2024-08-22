import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import Purchases from 'react-native-purchases'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import BriefCaseIcon from '~/components/Icons/BriefCaseIcon'
import ChevronRight from '~/components/Icons/ChevronRight'
import ClipboardIcon from '~/components/Icons/ClipboardIcon'
import ClockIcon from '~/components/Icons/ClockIcon'
import CommunityIcon from '~/components/Icons/CommunityIcon'
import DocumentIcon from '~/components/Icons/DocumentIcon'
import HandIcon from '~/components/Icons/HandIcon'
import PaymentIcon from '~/components/Icons/PaymentIcon'
import PersonIcon from '~/components/Icons/PersonIcon'
import Modal from '~/components/Modal/Modal'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { SubscriptionPlan } from '~/context/AuthContext'
import { Subscriptions, useSubscription } from '~/context/SubscriptionContext'
import { analytics } from '~/core/lib/analytics'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { colors } from '~/core/styles/theme'
import { roundToNearest } from '~/core/utils/common'
import { usdFormatter } from '~/core/utils/currency'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import BuyRecoveryCoachCard from '~/modules/Cards/BuyRecoveryCoachCard'
import { MainStackScreens, Screens } from '~/navigation/screens'
import { SubscriptionPackage } from '~/typings/common'
import Callout from './Callout/Callout'

const plans = {
  lifetimeCommunity: {
    bestValue: 'Limited time offer',
    cost: '$99',
    id: 'yume_lifetimeiap',
    description:
      '•  Once decision, Beat Gambling once and for all. \n•  Exclusively for select individuals.',
  },
  monthlyCommunity: {
    bestValue: '',
    monthCost: '$19.99',
    id: 'yume_monthly_community',
    description: 'Flexible monthly subscription, changeable as needed.',
  },
  monthlyRecoveryCoach: {
    bestValue: '',
    id: 'yume_monthly',
    monthCost: 'US$249.99',
    description: '30% cheaper than BetterHelp',
  },
}

type SubscriptionScreenProps = NativeStackScreenProps<MainStackScreens, Screens.SubscriptionScreen>

export type SubscriptionScreenParams = undefined

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = (props) => {
  const { navigation } = props

  const theme = useAppTheme()

  const { currentOfferings, init, customerInfo } = useSubscription()

  const [readMoreModalVisible, setReadMoreModalVisible] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>(Subscriptions.Lifetime)
  const { bottom } = useSafeAreaInsets()
  const { state, refetchProfile, updateState } = useAuth()

  const {
    isPending: purchasing,
    error: purchaseError,
    mutate: purchase,
  } = useMutation({
    mutationFn: async () => {
      if (selectedPlan === SubscriptionPlan.LifetimeCommunity) {
        analytics.logLifetimeSubscriptionCompleted()
      } else if (selectedPlan === SubscriptionPlan.YearlyCommunity) {
        analytics.logYearlySubscriptionInitiated()
      } else {
        analytics.logMonthlySubscriptionInitiated()
      }

      if (Object.values(customerInfo?.entitlements?.active || []).length > 0) {
        toast.show('Success', 'You are already subscribed to a plan!')
      } else if (currentOfferings) {
        const currentOffer =
          Subscriptions.Lifetime === selectedPlan
            ? currentOfferings?.[SubscriptionPackage?.LifetimeCommunity]?.lifetime
            : Subscriptions.YearlyCommunity === selectedPlan
            ? currentOfferings?.[SubscriptionPackage.YearlyCommunity].annual
            : currentOfferings?.[SubscriptionPackage.Basic].monthly
        // show purchase dialog
        // @ts-ignore
        const purchaseResponse = await Purchases.purchasePackage(currentOffer)
        await API.user.updateProfile({
          revenuecat_customer_id: purchaseResponse.customerInfo.originalAppUserId,
        })
      }
      // // Assign recovery coach if user doesn't have one
      if (!state.user?.recovery_coach) {
        const recoveryCoach = await API.user.matchRecoveryCoach()
        await API.user.assignRecoveryCoach(recoveryCoach.recovery_coach.id)
      }
      // update subscription plan
      await API.user.updateProfile({
        onboarding_done: true,
        subscription_plan:
          Subscriptions.Lifetime === selectedPlan
            ? SubscriptionPlan.ONETIME
            : Subscriptions.YearlyCommunity === selectedPlan
            ? SubscriptionPlan.YearlyCommunity
            : SubscriptionPlan.MonthlyCommunity,
      })
    },
    onSuccess: () => {
      if (selectedPlan === SubscriptionPlan.LifetimeCommunity) {
        analytics.logLifetimeSubscriptionCompleted()
      } else if (selectedPlan === SubscriptionPlan.YearlyCommunity) {
        analytics.logYearlySubscriptionCompleted()
      } else {
        analytics.logMonthlySubscriptionCompleted()
      }
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
        navigation.replace(Screens.HomeScreen)
      }, 300)
    },
    onError(error) {
      console.log(error)
      toast.error('Error', 'Unable to make purchase!')
    },
  })

  useEffect(() => {
    analytics.logSubscriptionScreenLoaded()
  }, [])

  // initialize subscriptions if not already
  useEffect(() => {
    if (!currentOfferings) {
      init()
    }
  }, [currentOfferings])

  const handleReadMore = () => {
    setReadMoreModalVisible(true)
  }

  const dailySavings = state.user?.money_lost_total
    ? state.user?.money_lost_total / (state.user.money_lost_within_years * 365)
    : 0

  const benefitItems = [
    {
      id: '0',
      icon: PaymentIcon,
      title: 'Unlock Your Savings',
      description: (
        <Typography color="gray700" variation="descriptionLight">
          {usdFormatter.format(dailySavings)} a Day and {state.user?.hours_spend_day} Extra Hour
          Daily - Break Free from Gambling with Our Support!{' '}
          {state.user?.debt?.hasDebt && (
            <Typography
              color="primary"
              style={{
                textDecorationColor: theme.colors.primary,
                textDecorationLine: 'underline',
              }}>
              You may qualify to save up to{' '}
              <Typography color="primary" variation="descriptionSemiBold">
                {usdFormatter.format(
                  roundToNearest(Number(state.user.debt?.totalDebtAmount || '0') * 0.3, 10)
                )}{' '}
                -{' '}
                {usdFormatter.format(
                  roundToNearest(Number(state.user.debt?.totalDebtAmount || '0') * 0.4, 10)
                )}{' '}
              </Typography>
              of your credit card debt.
            </Typography>
          )}
        </Typography>
      ),
    },
    {
      id: '1',
      icon: CommunityIcon,
      title: 'Supportive strong community',
      description: 'Join our community, get paired with an accountability partner',
    },
    {
      id: '2',
      icon: () => <PersonIcon fill={colors.primary} />,
      title: 'Recovery Team Check-ins',
      description:
        'Our recovery team will call you every two weeks to check in on your progress, we really care. Real people, real check ins',
    },
    {
      id: '3',
      icon: ClipboardIcon,
      title: 'Group Therapy Access',
      description:
        'Participate in group therapy for shared healing and support in a professionally moderated environment',
    },
    {
      id: '4',
      icon: DocumentIcon,
      title: 'Enriching Content',
      description:
        'Discover a treasure trove of resources, from mindfulness techniques to sobriety maintenance strategies.',
    },
    {
      id: '5',
      icon: () => <ClockIcon stroke={colors.primary} />,
      title: 'Accountability Check-Ins',
      description:
        'Keep your recovery on track with regular, encouraging check-ins that celebrate your progress.',
    },
    {
      id: '6',
      icon: () => <BriefCaseIcon stroke={colors.primary} />,
      title: 'Tailored Support',
      description:
        'Yume meets you where you are in your recovery, offering flexible support to match your unique journey.',
    },
  ]

  if (!currentOfferings) {
    return (
      <Block flex1 justify="center" align="center">
        <ActivityIndicator />
      </Block>
    )
  }

  return (
    <Block flex1 style={{ paddingBottom: bottom }}>
      <NavigationBar />

      <Modal visible={readMoreModalVisible} onClose={setReadMoreModalVisible}>
        <Block mT="lg">
          <Typography variation="paragraphSemiBold">We Give Back:</Typography>
          <Typography mT="xl" color="gray700" variation="descriptionRegular">
            Uncover How a Portion of Our Profits Fuels Meaningful Change.
          </Typography>
          <Typography mT="xl" color="gray700" variation="descriptionRegular">
            Yume is deeply dedicated to not only helping individuals on their recovery journey but
            also to giving back to those who make this journey possible. We proudly allocate 5% of
            our profits to our Recovery Coaches — brave individuals who have triumphed over their
            own addictions and are now pillars of strength and guidance in our community. This
            contribution aids their continued growth and well-being, ensuring they can keep making a
            profound impact.
          </Typography>
          <Typography mT="xl" color="gray700" variation="descriptionRegular">
            Additionally, a portion of these funds is channeled into resources and initiatives aimed
            at further supporting and enriching the recovery community at large. At Yume, we believe
            in a cycle of support and growth, where success feeds back into the system to uplift and
            empower more lives
          </Typography>
        </Block>
      </Modal>

      <ScrollView>
        <Block mH="xl">
          <Typography variation="title3SemiBold">Yume Subscription</Typography>

          <BuyRecoveryCoachCard
            selected={selectedPlan}
            plan={plans.lifetimeCommunity}
            onSelect={() => setSelectedPlan(plans.lifetimeCommunity.id)}
          />
          <BuyRecoveryCoachCard
            selected={selectedPlan}
            plan={plans.monthlyCommunity}
            onSelect={() => setSelectedPlan(plans.monthlyCommunity.id)}
          />

          <ErrorText error={purchaseError} />

          <Block
            pV="lg"
            pH="lg"
            mT="xl"
            shadow="sm"
            rounded="xl"
            align="center"
            bgColor="white"
            flexDirection="row"
            justify="space-between"
            onPress={handleReadMore}>
            <Block flexDirection="row" align="center">
              <HandIcon />
              <Typography mL="md" color="gray700" variation="paragraphRegular">
                We Give Back
              </Typography>
            </Block>
            <Block flexDirection="row" align="center">
              <Typography color="gray400" variation="paragraphRegular">
                Read more...
              </Typography>
              <ChevronRight />
            </Block>
          </Block>

          <Callout mT="xxl" />

          <Typography mT="xxxl" mB="xl" variation="paragraphSemiBold">
            What are you getting
          </Typography>

          {/* TODO: Move this to recommended recovery coach! */}
          {/* <Block pH="xl" pV="lg" mB="xl" rounded="4xl" bgColor="lightprpl" flexDirection="row">
              <VerifiedCoach />
              <Block mL="lg" pR="xl">
                <Typography color="headerGray" variation="paragraphSemiBold">
                  Certified Recovery Coaches
                </Typography>
                <Typography color="gray700" variation="descriptionLight">
                  Join our recovery program with confidence, backed by a money-back guarantee if
                  you&apos;re not satisfied with your first session. Our Certified Recovery Coaches,
                  who have personally triumphed over addiction, will provide weekly 45-minute
                  sessions and unlimited access to support you every step of the way. Commit to a
                  life of transformation and let us guide you towards lasting recovery.
                </Typography>
              </Block>
            </Block> */}

          <Block>
            {benefitItems.map((benefit) => {
              return (
                <Block
                  pH="xl"
                  pV="lg"
                  mB="xl"
                  rounded="4xl"
                  key={benefit.id}
                  bgColor="gray100"
                  flexDirection="row">
                  <Block pT="sm">
                    <benefit.icon />
                  </Block>

                  <Block mL="lg" pR="xl">
                    <Typography color="headerGray" variation="paragraphSemiBold">
                      {benefit.title}
                    </Typography>
                    <Typography color="gray700" variation="descriptionLight">
                      {benefit.description}
                    </Typography>
                  </Block>
                </Block>
              )
            })}
          </Block>
          <Typography center mB="xxxl">
            Begin your path to healing today with{'\n'} Yume – where recovery is a shared journey.
          </Typography>
        </Block>
      </ScrollView>

      <Block mH="xl" mB="xl">
        <Button
          title="Next"
          loading={purchasing}
          onPress={() => purchase()}
          disabled={!currentOfferings}
        />
      </Block>
    </Block>
  )
}

export default SubscriptionScreen
