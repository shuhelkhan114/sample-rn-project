import firebaseAnalytics from '@react-native-firebase/analytics'
import { AppEventsLogger } from 'react-native-fbsdk-next'
import { GenderValue } from '~/typings/common'

class Analytics {
  setUser(
    id: string,
    params: {
      username: string
      name: string
      gender: GenderValue
      email: string
      state: string
    }
  ) {
    firebaseAnalytics().setUserId(id)
    firebaseAnalytics().setUserProperties({
      username: params.username,
      name: params.name,
      gender: params.gender,
      email: params.email,
      state: params.state,
    })
    AppEventsLogger.setUserID(id)
    AppEventsLogger.setUserData({
      email: params.email,
      state: params.state,
      firstName: params.name?.split(' ')?.[0],
      lastName: params.name?.split(' ')?.[1],
      gender:
        params.gender === GenderValue.Male
          ? 'm'
          : params.gender === GenderValue.Female
          ? 'f'
          : undefined,
    })
  }

  logEvent(name: string, params: Record<string, any> = {}) {
    firebaseAnalytics().logEvent(name, params)
    AppEventsLogger.logEvent(name, params)
  }

  logSignUpWithGoogle() {
    this.logEvent('sign_up_with_google')
  }

  logSignUpWithEmail() {
    this.logEvent('sign_up_with_email')
  }

  logSignUpWithApple() {
    this.logEvent('sign_up_with_apple')
  }

  logOTPEntered() {
    this.logEvent('otp_entered')
  }

  logEmailSubmitted(email: string) {
    this.logEvent('email_submitted', { email })
  }

  logRecoveryCoachSubscriptionInitiated() {
    this.logEvent('rc_subscription_initiated')
  }

  logRecoveryCoachSubscriptionCompleted() {
    this.logEvent('rc_subscription_completed')
  }

  logRecoveryCoachSubscriptionFailed() {
    this.logEvent('rc_subscription_failed')
  }

  logVisitRecoveryCoachSubscriptionScreen() {
    this.logEvent('rc_subscription_page')
  }

  logLifetimeSubscriptionInitiated() {
    this.logEvent('subscription_initiated_lifetime')
  }

  logYearlySubscriptionInitiated() {
    this.logEvent('subscription_initiated_yearly')
  }

  logMonthlySubscriptionInitiated() {
    this.logEvent('subscription_initiated_monthly')
  }

  logLifetimeSubscriptionCompleted() {
    this.logEvent('subscription_completed_lifetime')
  }

  logYearlySubscriptionCompleted() {
    this.logEvent('subscription_completed_yearly')
  }

  logMonthlySubscriptionCompleted() {
    this.logEvent('subscription_completed_monthly')
  }

  logSubscriptionScreenLoaded() {
    this.logEvent('subscription_page_landed')
  }

  logDateOfBirthSubmitted(date?: string) {
    this.logEvent('date_of_birth_submitted', { date })
  }

  logRevealToRecoveryCoach() {
    this.logEvent('reveal_to_rc')
  }

  logGamblingAddictionsSelected(values: string) {
    this.logEvent('gambling_sub_activities_selected', { values })
  }

  logSpouseTherapistAdded(params: Record<string, any>) {
    this.logEvent('spouse_therapist_added', params)
  }

  logGenderSelected(gender?: string) {
    this.logEvent('gender_selected', { value: gender })
  }

  logTimeSpentGamblingSubmitted(hours?: string) {
    this.logEvent('time_spent_gambling_submitted', { hours })
  }

  logLastGambleDateSubmitted(date?: string) {
    this.logEvent('last_gamble_date_submitted', { date })
  }

  logTotalMoneyLostSubmitted(amount?: number, duration?: number) {
    this.logEvent('total_loss_submitted', { amount, duration })
  }

  logStateSubmitted(state?: string) {
    this.logEvent('state_submitted', { state })
  }

  logPhoneSubmitted(phone?: string) {
    this.logEvent('phone_submitted', { phone })
  }

  logChooseAvatar() {
    this.logEvent('choose_avatar')
  }
}

export const analytics = new Analytics()
