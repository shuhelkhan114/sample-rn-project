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
import { usdFormatter } from '~/core/utils/currency'
import { getAmountValidationSchema } from '~/core/validation/atoms'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import Footer from '../_components/Footer/Footer'
import Header from '../_components/Header/Header'
import TooltipBanner from '../_components/TooltipBanner/TooltipBanner'

type MoneyLostScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.MoneyLostScreen>

export type MoneyLostScreenParams = {
  from: 'onboarding' | 'home'
}

function MoneyLostScreen({ navigation, route }: MoneyLostScreenProps) {
  const { from = 'onboarding' } = route.params || {}

  const [amount, setAmount] = useState<string | undefined>()
  const [duration, setDuration] = useState<string | undefined>()
  const [durationType, setDurationType] = useState<string>('years')

  const { refetchProfile } = useAuth()

  const { keyboardShown } = useKeyboard()
  const theme = useAppTheme()

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    async mutationFn() {
      // 1. validate `amount`
      await getAmountValidationSchema('Amount', 0, 100000000).validate(amount)

      // 2. update user profile
      await API.user.updateProfile({
        money_lost_total: Number(amount),
        ...(durationType === 'years' && { money_lost_within_years: Number(duration) }),
        ...(durationType === 'months' && { money_lost_within_months: Number(duration) }),
      })
    },
    onSuccess() {
      analytics.logTotalMoneyLostSubmitted(Number(amount), Number(duration))
      refetchProfile()
      navigation.navigate(Screens.CreditCardDebtScreen, { from })
    },
    onError(error: unknown) {
      toast.error('Error', `${(error as Error).message || 'Something went wrong'}`)
    },
  })

  const styles = useMemo(
    () =>
      StyleSheet.create({
        input: {
          marginTop: spacing.xxxl,
        },
        scrollContainer: {
          minHeight: keyboardShown ? undefined : '100%',
          flex: Number(amount) > 0 ? undefined : 1,
        },
      }),
    [theme, keyboardShown, amount]
  )

  const dailySaving = Number(amount) / (Number(duration) * 365)
  const yearlySaving = Number(amount) / Number(duration)

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Header
              step={from === 'home' ? 2 : 6}
              totalSteps={from === 'home' ? 4 : undefined}
              description="How much have you lost in total gambling?"
            />

            <TextInput
              isCurrencyInput
              value={amount}
              placeholder="Enter"
              style={styles.input}
              onChangeText={setAmount}
              keyboardType="number-pad"
            />

            {amount && (
              <Block mT="xxxl">
                <Typography>Over what period of times?</Typography>
                <TextInput
                  // TODO: disabled temporarily
                  // suffixOptions={[
                  //   {
                  //     label: 'Years',
                  //     value: 'years',
                  //   },
                  //   {
                  //     label: 'Months',
                  //     value: 'months',
                  //   },
                  // ]}
                  minValue={1}
                  maxValue={100}
                  suffix={durationType}
                  onSuffixChange={setDurationType}
                  value={duration}
                  placeholder="Enter"
                  style={styles.input}
                  onChangeText={setDuration}
                  keyboardType="number-pad"
                />
              </Block>
            )}

            <Block mB="auto">
              {Number(amount) > 0 && Number(duration) > 0 && (
                <TooltipBanner mT="sm" mB="auto">
                  <Typography color="gray800" variation="title5Light">
                    You&apos;ll save{' '}
                    <Typography color="primary" variation="title5SemiBold">
                      {usdFormatter.format(dailySaving)}
                    </Typography>{' '}
                    dollars each day you don&apos;t gamble.{'\n\n'}That&apos;s{' '}
                    <Typography color="primary" variation="title5SemiBold">
                      {usdFormatter.format(yearlySaving)}
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
              disabled={amount === undefined}
            />
          </ScrollView>
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default MoneyLostScreen
