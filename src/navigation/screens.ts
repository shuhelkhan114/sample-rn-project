import { CallScreenParams } from '~/screens/CallScreen/CallScreen'
import { CommunityScreenParams } from '~/screens/CommunityScreen/CommunityScreen'
import { MembersListScreenParams } from '~/screens/CommunityScreen/MembersListScreen'
import { CreateCheckinScreenParams } from '~/screens/CreateCheckinScreen/CreateCheckinScreen'
import { CreatePostScreenParams } from '~/screens/CreatePostScreen/CreatePostScreen'
import { GetHelpScreenParams } from '~/screens/GetHelpScreen'
import { AllFollowingUserScreenParams } from '~/screens/GroupDetailScreen/AllFollowingUserScreen/AllFollowingUserScreen'
import { GroupDetailScreenParams } from '~/screens/GroupDetailScreen/GroupDetailScreen'
import { HomeScreenParams } from '~/screens/HomeScreen/HomeScreen'
import { MessageScreenParams } from '~/screens/MessagesScreen/MessagesScreen'
import { NotificationsScreenParams } from '~/screens/NotificationsScreen/NotificationsScreen'
import { PostDetailScreenParams } from '~/screens/PostDetailScreen/PostDetailScreen'
import { PreparePublicProfileScreenParams } from '~/screens/PreparePublicProfileScreen'
import { PublicProfileScreenParams } from '~/screens/PublicProfileScreen'
import { AllCheckInScreenParams } from '~/screens/Shared/AllCheckInScreen/AllCheckInScreen'
import { ChatScreenParams } from '~/screens/Shared/ChatScreen/ChatScreen'
import { CheckinDetailsMessageScreenParams } from '~/screens/Shared/ChatScreen/CheckInMessage/CheckinDeatilsMessageScreen/CheckinDeatilsMessageScreen'
import { CheckInDetailScreenParams } from '~/screens/Shared/CheckInDetailScreen/CheckInDetailScreen'
import { MyAddictionsScreenParams } from '~/screens/Shared/MyAddictionsScreen/MyAddictionsScreen'
import { PersonalInformationScreenParams } from '~/screens/Shared/PersonalInformationScreen/PersonalInformationScreen'
import { UpdatePersonalInformationScreenParams } from '~/screens/Shared/PersonalInformationScreen/UpdatePersonalInformationScreen'
import { ConfirmYourIdentityScreenParams } from '~/screens/Therapist/ConfirmYourIdentity'
import { AccountScreenParams } from '~/screens/User/Main/AccountScreen/AccountScreen'
import { CongratulationsScreenParams } from '~/screens/User/Onboarding/CongratulationsScreen/CongratulationsScreen'
import { RecommendedRecoveryCoachParams } from '~/screens/User/Onboarding/RecommendedRecoveryCoachScreen/RecommendedRecoveryCoachScreen'
import { ScheduleCallScreenParams } from '~/screens/User/Onboarding/ScheduleCallScreen/ScheduleCallScreen'
import { RevealUserScreenParams } from '~/screens/User/Onboarding/SubscriptionScreen/RevelUser/RevealUserScreen'
import { SubscriptionScreenParams } from '~/screens/User/Onboarding/SubscriptionScreen/SubscriptionScreen'
import { ReduceDebt0ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt0Screen/ReduceDebt0Screen'
import { ReduceDebt10ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt10Screen/ReduceDebt10Screen'
import { ReduceDebt11ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt11Screen/ReduceDebt11Screen'
import { ReduceDebt12ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt12Screen/ReduceDebt12Screen'
import { ReduceDebt1ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt1Screen/ReduceDebt1Screen'
import { ReduceDebt2ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt2Screen/ReduceDebt2Screen'
import { ReduceDebt3ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt3Screen/ReduceDebt3Screen'
import { ReduceDebt4ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt4Screen/ReduceDebt4Screen'
import { ReduceDebt5ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt5Screen/ReduceDebt5Screen'
import { ReduceDebt6ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt6Screen/ReduceDebt6Screen'
import { ReduceDebt7ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt7Screen/ReduceDebt7Screen'
import { ReduceDebt8ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt8Screen/ReduceDebt8Screen'
import { ReduceDebt9ScreenParams } from '~/screens/User/ReduceDebt/ReduceDebt9Screen/ReduceDebt9Screen'
import { ReducedDebtFinalScreenParams } from '~/screens/User/ReduceDebt/ReduceDebtFinalScreen/ReduceDebtFinalScreen'
import { FamilyScreenParams } from '~/screens/UserOnboarding/FamilyScreen/FamilyScreen'
import { HoursLostScreenParams } from '~/screens/UserOnboarding/HoursLostScreen/HoursLostScreen'
import { LastGambleDayScreenParams } from '~/screens/UserOnboarding/LastGambeDayScreen/LastGambleDayScreen'
import { MoneyLostScreenParams } from '~/screens/UserOnboarding/MoneyLostScreen/MoneyLostScreen'
import { StateScreenParams } from '~/screens/UserOnboarding/StateScreen/StateScreen'
import { YourWhyScreenPropsParams } from '~/screens/YourWhyScreen/YourWhyScreen'

export enum Screens {
  GetStartedScreen = 'GetStartedScreen',

  // User onboarding
  UsernameScreen = 'UsernameScreen',
  GenderScreen = 'GenderSelectionScreen',
  DateOfBirthScreen = 'DateOfBirthScreen',
  StateScreen = 'StateScreen',
  LastGambleDayScreen = 'LastGambleDayScreen',
  MoneyLostScreen = 'MoneyLostScreen',
  HoursLostScreen = 'HoursLostScreen',
  FamilyScreen = 'FamilyScreen',
  CreditCardDebtScreen = 'CreditCardDebtScreen',

  // Reduce Debt Screens
  ReduceDebt0Screen = 'ReduceDebt0Screen',
  ReduceDebt1Screen = 'ReduceDebt1Screen',
  ReduceDebt2Screen = 'ReduceDebt2Screen',
  ReduceDebt3Screen = 'ReduceDebt3Screen',
  ReduceDebt4Screen = 'ReduceDebt4Screen',
  ReduceDebt5Screen = 'ReduceDebt5Screen',
  ReduceDebt6Screen = 'ReduceDebt6Screen',
  ReduceDebt7Screen = 'ReduceDebt7Screen',
  ReduceDebt8Screen = 'ReduceDebt8Screen',
  ReduceDebt9Screen = 'ReduceDebt9Screen',
  ReduceDebt10Screen = 'ReduceDebt10Screen',
  ReduceDebt11Screen = 'ReduceDebt11Screen',
  ReduceDebt12Screen = 'ReduceDebt12Screen',
  ReducedDebtFinalScreen = 'ReducedDebtFinalScreen',

  ContinueWithEmailScreen = 'ContinueWithEmailScreen',
  SignUpScreen = 'SignUpScreen',
  VerificationScreen = 'VerificationScreen',
  ResetPasswordScreen = 'ResetPasswordScreen',
  ForgotPassword = 'ForgotPassword',
  RecommendedRecoveryCoachScreen = 'RecommendedRecoveryCoachScreen',
  AddictionsScreen = 'AddictionsScreen',
  SobernessScreen = 'SobernessScreen',
  TheBestScreen = 'TheBestScreen',
  SelectAvatarScreen = 'SelectAvatarScreen',
  HomeScreen = 'HomeScreen',
  MessagesScreen = 'MessagesScreen',
  CreateScreen = 'CreateScreen',
  CreatePostScreen = 'CreatePostScreen',
  CommunityScreen = 'CommunityScreen',
  GroupDetailScreen = 'GroupDetailScreen',
  NotificationsScreen = 'NotificationsScreen',
  SignInScreen = 'SignInScreen',
  SignInWithEmail = 'SignInWithEmail',
  PublicProfileScreen = 'PublicProfileScreen',
  GetHelpScreen = 'GetHelpScreen',
  AddPostScreen = 'AddPostScreen',
  AccountScreen = 'AccountScreen',
  PreparePublicProfileScreen = 'PreparePublicProfileScreen',
  TherapistSignUpScreen = 'TherapistSignUpScreen',
  NiceToSeeYouScreen = 'NiceToSeeYouScreen',
  ConfirmYourIdentityScreen = 'ConfirmYourIdentityScreen',
  ReviewInformationScreen = 'ReviewInformationScreen',
  WelcomeToYumeScreen = 'WelcomeToYumeScreen',
  VerifiedWelcomeToYumeScreen = 'VerifiedWelcomeToYumeScreen',
  TherapistResponsibilitiesScreen = 'TherapistResponsibilitiesScreen',
  SupportCommunityScreen = 'SupportCommunityScreen',
  PostDetailScreen = 'PostDetailScreen',
  ChatScreen = 'ChatScreen',
  SubscriptionScreen = 'SubscriptionScreen',
  RecoveryCoachContinueWithEmailScreen = 'RecoveryCoachContinueWithEmailScreen',
  RecoveryCoachSelectNameScreen = 'RecoveryCoachSelectNameScreen',
  RecoveryCoachDOBSelectionScreen = 'RecoveryCoachDOBSelectionScreen',
  RecoveryCoachGenderSelectionScreen = 'RecoveryCoachGenderSelectionScreen',
  RecoveryCoachLocationScreen = 'RecoveryCoachLocationScreen',
  RecoveryCoachAddictionsScreen = 'RecoveryCoachAddictionsScreen',
  RecoveryCoachWriteOwnStory = 'RecoveryCoachWriteOwnStory',
  RecoveryCoachSobernessScreen = 'RecoveryCoachSobernessScreen',
  RecoveryCoachPublicViewScreen = 'RecoveryCoachPublicViewScreen',
  CreateCheckinScreen = 'CreateCheckinScreen',
  CallScreen = 'CallScreen',
  CongratulationsScreen = 'CongratulationsScreen',
  AllCheckInScreen = 'AllCheckInScreen',
  CheckInDetailScreen = 'CheckInDetailScreen',
  PersonalInformationScreen = 'PersonalInformationScreen',
  UpdatePersonalInformationScreen = 'UpdatePersonalInformationScreen',
  MyAddictionsScreen = 'MyAddictionsScreen',
  ScheduleCallScreen = 'ScheduleCallScreen',
  RevealUserScreen = 'RevealUserScreen',
  AllFollowingUserScreen = 'AllFollowingUserScreen',
  CheckinDetailsMessageScreen = 'CheckinDetailsMessageScreen',
  YourWhyScreen = 'YourWhyScreen',
  MembersListScreen = 'MembersListScreen',
}

export type MainStackScreens = {
  [Screens.HomeScreen]: HomeScreenParams
  [Screens.MessagesScreen]: MessageScreenParams
  [Screens.PostDetailScreen]: PostDetailScreenParams
  [Screens.AccountScreen]: AccountScreenParams
  [Screens.PreparePublicProfileScreen]: PreparePublicProfileScreenParams
  [Screens.CreatePostScreen]: CreatePostScreenParams
  [Screens.CommunityScreen]: CommunityScreenParams
  [Screens.GroupDetailScreen]: GroupDetailScreenParams
  [Screens.PublicProfileScreen]: PublicProfileScreenParams
  [Screens.GetHelpScreen]: GetHelpScreenParams
  [Screens.NotificationsScreen]: NotificationsScreenParams
  [Screens.ConfirmYourIdentityScreen]: ConfirmYourIdentityScreenParams
  [Screens.ChatScreen]: ChatScreenParams
  [Screens.CreateCheckinScreen]: CreateCheckinScreenParams
  [Screens.CallScreen]: CallScreenParams
  [Screens.CongratulationsScreen]: CongratulationsScreenParams
  [Screens.AllCheckInScreen]: AllCheckInScreenParams
  [Screens.CheckInDetailScreen]: CheckInDetailScreenParams
  [Screens.SubscriptionScreen]: SubscriptionScreenParams
  [Screens.PersonalInformationScreen]: PersonalInformationScreenParams
  [Screens.UpdatePersonalInformationScreen]: UpdatePersonalInformationScreenParams
  [Screens.MyAddictionsScreen]: MyAddictionsScreenParams
  [Screens.AllFollowingUserScreen]: AllFollowingUserScreenParams
  [Screens.ScheduleCallScreen]: ScheduleCallScreenParams
  [Screens.CheckinDetailsMessageScreen]: CheckinDetailsMessageScreenParams
  [Screens.RevealUserScreen]: RevealUserScreenParams
  [Screens.RecommendedRecoveryCoachScreen]: RecommendedRecoveryCoachParams
  [Screens.YourWhyScreen]: YourWhyScreenPropsParams
  [Screens.MembersListScreen]: MembersListScreenParams

  // User onboarding screen
  [Screens.LastGambleDayScreen]: LastGambleDayScreenParams
  [Screens.HoursLostScreen]: HoursLostScreenParams
  [Screens.MoneyLostScreen]: MoneyLostScreenParams
  [Screens.FamilyScreen]: FamilyScreenParams
  [Screens.StateScreen]: StateScreenParams

  // Reduce Debt Screens
  [Screens.ReduceDebt0Screen]: ReduceDebt0ScreenParams
  [Screens.ReduceDebt1Screen]: ReduceDebt1ScreenParams
  [Screens.ReduceDebt2Screen]: ReduceDebt2ScreenParams
  [Screens.ReduceDebt3Screen]: ReduceDebt3ScreenParams
  [Screens.ReduceDebt4Screen]: ReduceDebt4ScreenParams
  [Screens.ReduceDebt5Screen]: ReduceDebt5ScreenParams
  [Screens.ReduceDebt6Screen]: ReduceDebt6ScreenParams
  [Screens.ReduceDebt7Screen]: ReduceDebt7ScreenParams
  [Screens.ReduceDebt8Screen]: ReduceDebt8ScreenParams
  [Screens.ReduceDebt9Screen]: ReduceDebt9ScreenParams
  [Screens.ReduceDebt10Screen]: ReduceDebt10ScreenParams
  [Screens.ReduceDebt11Screen]: ReduceDebt11ScreenParams
  [Screens.ReduceDebt12Screen]: ReduceDebt12ScreenParams
  [Screens.ReducedDebtFinalScreen]: ReducedDebtFinalScreenParams
}
