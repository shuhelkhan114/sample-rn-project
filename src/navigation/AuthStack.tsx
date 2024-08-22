import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Screens } from '~/navigation/screens'
import ContinueWithEmailScreen, {
  ContinueWithEmailScreenParams,
} from '~/screens/Auth/ContinueWithEmailScreen/ContinueWithEmailScreen'
import ForgotPassword, { ForgotPasswordParams } from '~/screens/Auth/ForgotPassword/ForgotPassword'
import ResetPasswordScreen, {
  ResetPasswordScreenParams,
} from '~/screens/Auth/ResetPassword/ResetPasswordScreen'
import SignInScreen, { SignInScreenParams } from '~/screens/Auth/SignInScreen/SignInScreen'
import SignUpScreen, { SignUpScreenParams } from '~/screens/Auth/SignUpScreen/SignUpScreen'
import VerificationScreen, {
  VerificationScreenParams,
} from '~/screens/Auth/VerificationScreen/VerificationScreen'
import CallScreen, { CallScreenParams } from '~/screens/CallScreen/CallScreen'
import GetStartedScreen, { GetStartedScreenParams } from '~/screens/GetStartedScreen'
import RecoveryCoachAddictionsScreen, {
  RecoveryCoachAddictionsScreenParams,
} from '~/screens/RecoveryCoach/Onboarding/AddictionsScreen/AddictionsScreen'
import RecoveryCoachContinueWithEmailScreen, {
  RecoveryCoachContinueWithEmailScreenParams,
} from '~/screens/RecoveryCoach/Onboarding/ContinueWithEmailScreen/ContinueWithEmailScreen'
import RecoveryCoachDOBSelectionScreen, {
  RecoveryCoachDOBSelectionScreenParams,
} from '~/screens/RecoveryCoach/Onboarding/DOBSelectionScreen/DOBSelectionScreen'
import RecoveryCoachGenderSelectionScreen, {
  RecoveryCoachGenderSelectionScreenParams,
} from '~/screens/RecoveryCoach/Onboarding/GenderSelectionScreen/GenderSelectionScreen'
import RecoveryCoachLocationScreen, {
  RecoveryCoachLocationScreenParams,
} from '~/screens/RecoveryCoach/Onboarding/LocationScreen/LocationScreen'
import RecoveryCoachPublicViewScreen, {
  RecoveryCoachPublicViewScreenParams,
} from '~/screens/RecoveryCoach/Onboarding/PublicViewScreen/PublicViewScreen'
import RecoveryCoachSelectNameScreen, {
  RecoveryCoachSelectNameScreenParams,
} from '~/screens/RecoveryCoach/Onboarding/SelectNameScreen/SelectNameScreen'
import RecoveryCoachSobernessScreen, {
  RecoveryCoachSobernessScreenParams,
} from '~/screens/RecoveryCoach/Onboarding/SobernessScreen/SobernessScreen'
import RecoveryCoachWriteOwnStory, {
  RecoveryCoachWriteOwnStoryParams,
} from '~/screens/RecoveryCoach/Onboarding/WriteOwnStory/WriteOwnStory'
import SobernessScreen, { SobernessScreenParams } from '~/screens/SobernessScreen'
import TheBestScreen, { TheBestScreenParams } from '~/screens/TheBestScreen'
import CongratulationsScreen, {
  CongratulationsScreenParams,
} from '~/screens/User/Onboarding/CongratulationsScreen/CongratulationsScreen'
import RecommendedRecoveryCoachScreen, {
  RecommendedRecoveryCoachParams,
} from '~/screens/User/Onboarding/RecommendedRecoveryCoachScreen/RecommendedRecoveryCoachScreen'
import ScheduleCallScreen, {
  ScheduleCallScreenParams,
} from '~/screens/User/Onboarding/ScheduleCallScreen/ScheduleCallScreen'
import RevealUserScreen, {
  RevealUserScreenParams,
} from '~/screens/User/Onboarding/SubscriptionScreen/RevelUser/RevealUserScreen'
import SubscriptionScreen, {
  SubscriptionScreenParams,
} from '~/screens/User/Onboarding/SubscriptionScreen/SubscriptionScreen'
import AddictionsScreen, {
  AddictionsScreenParams,
} from '~/screens/UserOnboarding/AddictionsScreen/AddictionsScreen'
import CreditCardDebtScreen, {
  CreditCardDebtScreenParams,
} from '~/screens/UserOnboarding/CreditCardDebtScreen/CreditCardDebtScreen'
import DateOfBirthScreen, {
  DateOfBirthScreenParams,
} from '~/screens/UserOnboarding/DateOfBirthScreen/DateOfBirthScreen'
import FamilyScreen, {
  FamilyScreenParams,
} from '~/screens/UserOnboarding/FamilyScreen/FamilyScreen'
import GenderSelectionScreen, {
  GenderScreenParams,
} from '~/screens/UserOnboarding/GenderScreen/GenderScreen'
import HoursLostScreen, {
  HoursLostScreenParams,
} from '~/screens/UserOnboarding/HoursLostScreen/HoursLostScreen'
import LastGambleDayScreen, {
  LastGambleDayScreenParams,
} from '~/screens/UserOnboarding/LastGambeDayScreen/LastGambleDayScreen'
import MoneyLostScreen, {
  MoneyLostScreenParams,
} from '~/screens/UserOnboarding/MoneyLostScreen/MoneyLostScreen'
import StateScreen, { StateScreenParams } from '~/screens/UserOnboarding/StateScreen/StateScreen'
import UsernameScreen, {
  UsernameScreenParams,
} from '~/screens/UserOnboarding/UsernameScreen/UsernameScreen'

export type AuthStackScreens = {
  // User onboarding
  [Screens.UsernameScreen]: UsernameScreenParams
  [Screens.DateOfBirthScreen]: DateOfBirthScreenParams
  [Screens.GenderScreen]: GenderScreenParams
  [Screens.StateScreen]: StateScreenParams
  [Screens.LastGambleDayScreen]: LastGambleDayScreenParams
  [Screens.MoneyLostScreen]: MoneyLostScreenParams
  [Screens.HoursLostScreen]: HoursLostScreenParams
  [Screens.CreditCardDebtScreen]: CreditCardDebtScreenParams

  [Screens.GetStartedScreen]: GetStartedScreenParams
  [Screens.SignUpScreen]: SignUpScreenParams
  [Screens.RecommendedRecoveryCoachScreen]: RecommendedRecoveryCoachParams
  [Screens.VerificationScreen]: VerificationScreenParams
  [Screens.ForgotPassword]: ForgotPasswordParams
  [Screens.ResetPasswordScreen]: ResetPasswordScreenParams
  [Screens.AddictionsScreen]: AddictionsScreenParams
  [Screens.ContinueWithEmailScreen]: ContinueWithEmailScreenParams
  [Screens.SignInScreen]: SignInScreenParams
  [Screens.SubscriptionScreen]: SubscriptionScreenParams
  [Screens.RecoveryCoachContinueWithEmailScreen]: RecoveryCoachContinueWithEmailScreenParams
  [Screens.RecoveryCoachSelectNameScreen]: RecoveryCoachSelectNameScreenParams
  [Screens.RecoveryCoachDOBSelectionScreen]: RecoveryCoachDOBSelectionScreenParams
  [Screens.RecoveryCoachGenderSelectionScreen]: RecoveryCoachGenderSelectionScreenParams
  [Screens.RecoveryCoachLocationScreen]: RecoveryCoachLocationScreenParams
  [Screens.RecoveryCoachAddictionsScreen]: RecoveryCoachAddictionsScreenParams
  [Screens.RecoveryCoachWriteOwnStory]: RecoveryCoachWriteOwnStoryParams
  [Screens.RecoveryCoachSobernessScreen]: RecoveryCoachSobernessScreenParams
  [Screens.RecoveryCoachPublicViewScreen]: RecoveryCoachPublicViewScreenParams
  [Screens.SobernessScreen]: SobernessScreenParams
  [Screens.TheBestScreen]: TheBestScreenParams
  [Screens.CongratulationsScreen]: CongratulationsScreenParams
  [Screens.ScheduleCallScreen]: ScheduleCallScreenParams
  [Screens.CallScreen]: CallScreenParams
  [Screens.RevealUserScreen]: RevealUserScreenParams
  [Screens.FamilyScreen]: FamilyScreenParams
}

const Stack = createNativeStackNavigator<AuthStackScreens>()

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Screens.GetStartedScreen}>
      {/* User onboarding */}
      <Stack.Screen name={Screens.UsernameScreen} component={UsernameScreen} />
      <Stack.Screen name={Screens.DateOfBirthScreen} component={DateOfBirthScreen} />
      <Stack.Screen name={Screens.GenderScreen} component={GenderSelectionScreen} />
      <Stack.Screen name={Screens.StateScreen} component={StateScreen} />
      <Stack.Screen name={Screens.LastGambleDayScreen} component={LastGambleDayScreen} />
      <Stack.Screen name={Screens.MoneyLostScreen} component={MoneyLostScreen} />
      <Stack.Screen name={Screens.HoursLostScreen} component={HoursLostScreen} />
      <Stack.Screen name={Screens.FamilyScreen} component={FamilyScreen} />

      <Stack.Screen name={Screens.GetStartedScreen} component={GetStartedScreen} />
      <Stack.Screen name={Screens.SignInScreen} component={SignInScreen} />
      <Stack.Screen name={Screens.SignUpScreen} component={SignUpScreen} />
      <Stack.Screen name={Screens.ContinueWithEmailScreen} component={ContinueWithEmailScreen} />
      <Stack.Screen name={Screens.VerificationScreen} component={VerificationScreen} />
      <Stack.Screen name={Screens.AddictionsScreen} component={AddictionsScreen} />
      <Stack.Screen
        name={Screens.RecommendedRecoveryCoachScreen}
        component={RecommendedRecoveryCoachScreen}
      />
      <Stack.Screen name={Screens.SubscriptionScreen} component={SubscriptionScreen} />
      <Stack.Screen name={Screens.ForgotPassword} component={ForgotPassword} />
      <Stack.Screen name={Screens.ResetPasswordScreen} component={ResetPasswordScreen} />
      <Stack.Screen
        name={Screens.RecoveryCoachContinueWithEmailScreen}
        component={RecoveryCoachContinueWithEmailScreen}
      />
      <Stack.Screen
        name={Screens.RecoveryCoachSelectNameScreen}
        component={RecoveryCoachSelectNameScreen}
      />
      <Stack.Screen
        name={Screens.RecoveryCoachLocationScreen}
        component={RecoveryCoachLocationScreen}
      />
      <Stack.Screen
        name={Screens.RecoveryCoachDOBSelectionScreen}
        component={RecoveryCoachDOBSelectionScreen}
      />
      <Stack.Screen
        name={Screens.RecoveryCoachGenderSelectionScreen}
        component={RecoveryCoachGenderSelectionScreen}
      />
      <Stack.Screen
        name={Screens.RecoveryCoachAddictionsScreen}
        component={RecoveryCoachAddictionsScreen}
      />
      <Stack.Screen
        name={Screens.RecoveryCoachWriteOwnStory}
        component={RecoveryCoachWriteOwnStory}
      />
      <Stack.Screen
        name={Screens.RecoveryCoachSobernessScreen}
        component={RecoveryCoachSobernessScreen}
      />
      <Stack.Screen
        name={Screens.RecoveryCoachPublicViewScreen}
        component={RecoveryCoachPublicViewScreen}
      />
      <Stack.Screen name={Screens.SobernessScreen} component={SobernessScreen} />
      <Stack.Screen name={Screens.TheBestScreen} component={TheBestScreen} />
      <Stack.Screen name={Screens.CongratulationsScreen} component={CongratulationsScreen} />
      <Stack.Screen name={Screens.CallScreen} component={CallScreen} />
      <Stack.Screen name={Screens.ScheduleCallScreen} component={ScheduleCallScreen} />
      <Stack.Screen name={Screens.RevealUserScreen} component={RevealUserScreen} />
      <Stack.Screen name={Screens.CreditCardDebtScreen} component={CreditCardDebtScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack
