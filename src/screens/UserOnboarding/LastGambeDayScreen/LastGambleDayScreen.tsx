import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Block from '~/components/Block/Block'
import InlineDatePicker from '~/components/InlineDatePicker/InlineDatePicker'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import { analytics } from '~/core/lib/analytics'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { MainStackScreens, Screens } from '~/navigation/screens'
import Footer from '../_components/Footer/Footer'
import Header from '../_components/Header/Header'
import Callout from './Callout/Callout'

type LastGambleDayScreenProps = NativeStackScreenProps<
  AuthStackScreens | MainStackScreens,
  Screens.LastGambleDayScreen
>

export type LastGambleDayScreenParams = {
  from?: 'onboarding' | 'home'
}

function LastGambleDayScreen(props: LastGambleDayScreenProps) {
  const { navigation, route } = props
  const { from = 'onboarding' } = route.params || {}

  const [gambleDate, setGambleDate] = useState<Date | null>(null)

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      analytics.logLastGambleDateSubmitted(gambleDate?.toISOString())
      navigation.navigate(Screens.MoneyLostScreen, { from })
    },
    onError(error: unknown) {
      toast.error('Error', `${(error as Error).message || 'Something went wrong'}`)
    },
  })

  const handleNext = () => {
    if (gambleDate && gambleDate > new Date()) {
      toast.error('Error', 'Please select a date in the past')
    } else {
      updateProfile({ last_gamble_day: gambleDate?.toISOString() || null })
    }
  }

  // count the days between the last gamble day and today
  const days = gambleDate
    ? Math.floor((Date.now() - gambleDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <Block flex1>
      <NavigationBar />

      <Block pH="xl" flex1 justify="space-between">
        <ScrollView>
          <Header
            step={from === 'home' ? 1 : 5}
            totalSteps={from === 'home' ? 4 : undefined}
            description="What was your last gamble day? If you don't recall exactly, your best guess."
          />

          <Block mT="4xl">
            <InlineDatePicker
              key="gambleDate"
              date={gambleDate}
              onChange={setGambleDate}
              label="Select last gamble date"
              minDate={new Date(1923, 1, 1)}
            />
          </Block>

          {gambleDate && days >= 0 && <Callout days={days} />}
        </ScrollView>
        <Footer
          onNext={handleNext}
          disabled={!gambleDate}
          loading={updatingProfile}
          error={updateProfileError}
        />
      </Block>
    </Block>
  )
}

export default LastGambleDayScreen
