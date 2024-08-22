import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import CallScreen from '~/screens/CallScreen/CallScreen'
import CommunityScreen from '~/screens/CommunityScreen/CommunityScreen'
import CreateCheckinScreen from '~/screens/CreateCheckinScreen/CreateCheckinScreen'
import CreatePostScreen from '~/screens/CreatePostScreen/CreatePostScreen'
import GetHelpScreen from '~/screens/GetHelpScreen'
import AllFollowingUserScreen from '~/screens/GroupDetailScreen/AllFollowingUserScreen/AllFollowingUserScreen'
import GroupDetailScreen from '~/screens/GroupDetailScreen/GroupDetailScreen'
import MessagesScreen from '~/screens/MessagesScreen/MessagesScreen'
import NotificationsScreen from '~/screens/NotificationsScreen/NotificationsScreen'
import PostDetailScreen from '~/screens/PostDetailScreen/PostDetailScreen'
import PreparePublicProfileScreen from '~/screens/PreparePublicProfileScreen'
import PublicProfileScreen from '~/screens/PublicProfileScreen'
import AllCheckInScreen from '~/screens/Shared/AllCheckInScreen/AllCheckInScreen'
import ChatScreen from '~/screens/Shared/ChatScreen/ChatScreen'
import CheckinDetailsMessageScreen from '~/screens/Shared/ChatScreen/CheckInMessage/CheckinDeatilsMessageScreen/CheckinDeatilsMessageScreen'
import CheckInDetailScreen from '~/screens/Shared/CheckInDetailScreen/CheckInDetailScreen'
import MyAddictionsScreen from '~/screens/Shared/MyAddictionsScreen/MyAddictionsScreen'
import PersonalInformationScreen from '~/screens/Shared/PersonalInformationScreen/PersonalInformationScreen'
import UpdatePersonalInformationScreen from '~/screens/Shared/PersonalInformationScreen/UpdatePersonalInformationScreen'
import ConfirmYourIdentityScreen from '~/screens/Therapist/ConfirmYourIdentity'
import AccountScreen from '~/screens/User/Main/AccountScreen/AccountScreen'
import CongratulationsScreen from '~/screens/User/Onboarding/CongratulationsScreen/CongratulationsScreen'
import RecommendedRecoveryCoachScreen from '~/screens/User/Onboarding/RecommendedRecoveryCoachScreen/RecommendedRecoveryCoachScreen'
import ScheduleCallScreen from '~/screens/User/Onboarding/ScheduleCallScreen/ScheduleCallScreen'
import RevealUserScreen from '~/screens/User/Onboarding/SubscriptionScreen/RevelUser/RevealUserScreen'
import SubscriptionScreen from '~/screens/User/Onboarding/SubscriptionScreen/SubscriptionScreen'
import ReduceDebt0Screen from '~/screens/User/ReduceDebt/ReduceDebt0Screen/ReduceDebt0Screen'
import ReduceDebt10Screen from '~/screens/User/ReduceDebt/ReduceDebt10Screen/ReduceDebt10Screen'
import ReduceDebt11Screen from '~/screens/User/ReduceDebt/ReduceDebt11Screen/ReduceDebt11Screen'
import ReduceDebt12Screen from '~/screens/User/ReduceDebt/ReduceDebt12Screen/ReduceDebt12Screen'
import ReduceDebt1Screen from '~/screens/User/ReduceDebt/ReduceDebt1Screen/ReduceDebt1Screen'
import ReduceDebt2Screen from '~/screens/User/ReduceDebt/ReduceDebt2Screen/ReduceDebt2Screen'
import ReduceDebt3Screen from '~/screens/User/ReduceDebt/ReduceDebt3Screen/ReduceDebt3Screen'
import ReduceDebt4Screen from '~/screens/User/ReduceDebt/ReduceDebt4Screen/ReduceDebt4Screen'
import ReduceDebt5Screen from '~/screens/User/ReduceDebt/ReduceDebt5Screen/ReduceDebt5Screen'
import ReduceDebt6Screen from '~/screens/User/ReduceDebt/ReduceDebt6Screen/ReduceDebt6Screen'
import ReduceDebt7Screen from '~/screens/User/ReduceDebt/ReduceDebt7Screen/ReduceDebt7Screen'
import ReduceDebt8Screen from '~/screens/User/ReduceDebt/ReduceDebt8Screen/ReduceDebt8Screen'
import ReduceDebt9Screen from '~/screens/User/ReduceDebt/ReduceDebt9Screen/ReduceDebt9Screen'
import ReducedDebtFinalScreen from '~/screens/User/ReduceDebt/ReduceDebtFinalScreen/ReduceDebtFinalScreen'
import FamilyScreen from '~/screens/UserOnboarding/FamilyScreen/FamilyScreen'
import HoursLostScreen from '~/screens/UserOnboarding/HoursLostScreen/HoursLostScreen'
import LastGambleDayScreen from '~/screens/UserOnboarding/LastGambeDayScreen/LastGambleDayScreen'
import MoneyLostScreen from '~/screens/UserOnboarding/MoneyLostScreen/MoneyLostScreen'
import { MainStackScreens, Screens } from './screens'
import StateScreen from '~/screens/UserOnboarding/StateScreen/StateScreen'
import YourWhyScreen from '~/screens/YourWhyScreen/YourWhyScreen'
import BottomTabs from './BottomTabs'
import MembersListScreen from '~/screens/CommunityScreen/MembersListScreen'

const Stack = createNativeStackNavigator<MainStackScreens>()

const MainStack = () => {
  return (
    <Block flex1>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          component={BottomTabs}
          name={Screens.HomeScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name={Screens.MessagesScreen} component={MessagesScreen} />
        <Stack.Screen name={Screens.PostDetailScreen} component={PostDetailScreen} />
        <Stack.Screen name={Screens.AccountScreen} component={AccountScreen} />
        <Stack.Screen name={Screens.ChatScreen} component={ChatScreen} />
        <Stack.Screen
          component={PreparePublicProfileScreen}
          name={Screens.PreparePublicProfileScreen}
        />
        <Stack.Screen name={Screens.CommunityScreen} component={CommunityScreen} />
        <Stack.Screen name={Screens.GroupDetailScreen} component={GroupDetailScreen} />
        <Stack.Screen name={Screens.PublicProfileScreen} component={PublicProfileScreen} />
        <Stack.Screen name={Screens.GetHelpScreen} component={GetHelpScreen} />
        <Stack.Screen name={Screens.CreatePostScreen} component={CreatePostScreen} />
        <Stack.Screen name={Screens.NotificationsScreen} component={NotificationsScreen} />
        <Stack.Screen name={Screens.CreateCheckinScreen} component={CreateCheckinScreen} />
        <Stack.Screen
          name={Screens.ConfirmYourIdentityScreen}
          component={ConfirmYourIdentityScreen}
        />
        <Stack.Screen name={Screens.CallScreen} component={CallScreen} />
        <Stack.Screen name={Screens.AllCheckInScreen} component={AllCheckInScreen} />
        <Stack.Screen name={Screens.CheckInDetailScreen} component={CheckInDetailScreen} />
        <Stack.Screen name={Screens.SubscriptionScreen} component={SubscriptionScreen} />
        <Stack.Screen name={Screens.CongratulationsScreen} component={CongratulationsScreen} />
        <Stack.Screen
          name={Screens.PersonalInformationScreen}
          component={PersonalInformationScreen}
        />
        <Stack.Screen
          name={Screens.UpdatePersonalInformationScreen}
          component={UpdatePersonalInformationScreen}
        />
        <Stack.Screen name={Screens.ScheduleCallScreen} component={ScheduleCallScreen} />
        <Stack.Screen name={Screens.MyAddictionsScreen} component={MyAddictionsScreen} />
        <Stack.Screen name={Screens.AllFollowingUserScreen} component={AllFollowingUserScreen} />
        <Stack.Screen
          name={Screens.CheckinDetailsMessageScreen}
          component={CheckinDetailsMessageScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen name={Screens.RevealUserScreen} component={RevealUserScreen} />
        <Stack.Screen name={Screens.YourWhyScreen} component={YourWhyScreen} />
        <Stack.Screen name={Screens.MembersListScreen} component={MembersListScreen} />
        <Stack.Screen
          name={Screens.RecommendedRecoveryCoachScreen}
          component={RecommendedRecoveryCoachScreen}
        />

        {/* User onboarding */}
        <Stack.Screen name={Screens.LastGambleDayScreen} component={LastGambleDayScreen} />
        <Stack.Screen name={Screens.MoneyLostScreen} component={MoneyLostScreen} />
        <Stack.Screen name={Screens.HoursLostScreen} component={HoursLostScreen} />
        <Stack.Screen name={Screens.FamilyScreen} component={FamilyScreen} />
        <Stack.Screen name={Screens.StateScreen} component={StateScreen} />

        {/* Reduce Debt Screens */}
        <Stack.Screen name={Screens.ReduceDebt0Screen} component={ReduceDebt0Screen} />
        <Stack.Screen name={Screens.ReduceDebt1Screen} component={ReduceDebt1Screen} />
        <Stack.Screen name={Screens.ReduceDebt2Screen} component={ReduceDebt2Screen} />
        <Stack.Screen name={Screens.ReduceDebt3Screen} component={ReduceDebt3Screen} />
        <Stack.Screen name={Screens.ReduceDebt4Screen} component={ReduceDebt4Screen} />
        <Stack.Screen name={Screens.ReduceDebt5Screen} component={ReduceDebt5Screen} />
        <Stack.Screen name={Screens.ReduceDebt6Screen} component={ReduceDebt6Screen} />
        <Stack.Screen name={Screens.ReduceDebt7Screen} component={ReduceDebt7Screen} />
        <Stack.Screen name={Screens.ReduceDebt8Screen} component={ReduceDebt8Screen} />
        <Stack.Screen name={Screens.ReduceDebt9Screen} component={ReduceDebt9Screen} />
        <Stack.Screen name={Screens.ReduceDebt10Screen} component={ReduceDebt10Screen} />
        <Stack.Screen name={Screens.ReduceDebt11Screen} component={ReduceDebt11Screen} />
        <Stack.Screen name={Screens.ReduceDebt12Screen} component={ReduceDebt12Screen} />
        <Stack.Screen name={Screens.ReducedDebtFinalScreen} component={ReducedDebtFinalScreen} />
      </Stack.Navigator>
    </Block>
  )
}

export default MainStack
