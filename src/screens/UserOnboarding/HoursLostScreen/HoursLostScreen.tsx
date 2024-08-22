import { useKeyboard } from '@react-native-community/hooks'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import Block from '~/components/Block/Block'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import TextInput from '~/components/TextInput/TextInput'
import Typography from '~/components/Typography/Typography'
import { analytics } from '~/core/lib/analytics'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { spacing } from '~/core/styles/theme'
import { getAmountValidationSchema } from '~/core/validation/atoms'
import useAppTheme from '~/hooks/useTheme'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { MainStackScreens, Screens } from '~/navigation/screens'
import Footer from '../_components/Footer/Footer'
import Header from '../_components/Header/Header'
import TooltipBanner from '../_components/TooltipBanner/TooltipBanner'

type HouseLostScreenProps = NativeStackScreenProps<
  AuthStackScreens | MainStackScreens,
  Screens.HoursLostScreen
>

export type HoursLostScreenParams = {
  from: 'onboarding' | 'home'
}

function HoursLostScreen({ navigation, route }: HouseLostScreenProps) {
  const { from = 'onboarding' } = route.params || {}
  const [hours, setHours] = useState<string | undefined>()

  const { keyboardShown } = useKeyboard()
  const theme = useAppTheme()

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    async mutationFn() {
      // 1. validate `amount`
      await getAmountValidationSchema('Hours').validate(hours)

      // 2. update user profile
      await API.user.updateProfile({ hours_spend_day: Number(hours) })
    },
    onSuccess() {
      analytics.logTimeSpentGamblingSubmitted(hours)

      navigation.navigate(Screens.FamilyScreen, { from })
    },
    onError(error: unknown) {
      toast.error('Error', `${(error as Error).message || 'Something went wrong'}`)
    },
  })

  const styles = useMemo(
    () =>
      StyleSheet.create({
        input: {
          marginTop: spacing['6xl'],
        },
        scrollContainer: {
          minHeight: keyboardShown ? undefined : '100%',
          flex: Number(hours) > 0 ? undefined : 1,
        },
      }),
    [theme, keyboardShown, hours]
  )

  const dailySaving = Number(hours)
  const yearlySaving = Math.round((Number(hours) * 365) / 24)

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Header
              step={from === 'home' ? 3 : 7}
              totalSteps={from === 'home' ? 4 : undefined}
              description="How much of your day did gambling and related activities, like monitoring scores, checking stock prices, occupy?"
            />

            <TextInput
              value={hours}
              minValue={1}
              maxValue={24}
              placeholder="Enter"
              suffix="hours a day"
              style={styles.input}
              onChangeText={setHours}
              keyboardType="number-pad"
            />

            <Block mB="auto">
              {Number(hours) > 0 && (
                <TooltipBanner mT="sm" mB="auto">
                  <Typography color="gray800" variation="title5Light">
                    You&apos;ll get{' '}
                    <Typography color="primary" variation="title5SemiBold">
                      {dailySaving} hours
                    </Typography>{' '}
                    each day you don&apos;t gamble.{'\n\n'}That&apos;s{' '}
                    <Typography color="primary" variation="title5SemiBold">
                      {yearlySaving} days
                    </Typography>{' '}
                    a year! Yume will help you achieve that.
                  </Typography>
                </TooltipBanner>
              )}
            </Block>

            <Footer
              mT="xxxl"
              onNext={updateProfile}
              loading={updatingProfile}
              error={updateProfileError}
              disabled={hours === undefined || hours === ''}
            />
          </ScrollView>
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default HoursLostScreen
