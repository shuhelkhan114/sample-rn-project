import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CircularPlusIcon from '~/components/Icons/CircularPlusIcon'
import GroupIcon from '~/components/Icons/GroupIcon'
import HomeIcon from '~/components/Icons/HomeIcon'
import MessageIcon from '~/components/Icons/MessageIcon'
import UserIcon from '~/components/Icons/UserIcon'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'
import { Screens } from '~/navigation/screens'
import CommunityScreen from '~/screens/CommunityScreen/CommunityScreen'
import CreatePostScreen from '~/screens/CreatePostScreen/CreatePostScreen'
import HomeScreen from '~/screens/HomeScreen/HomeScreen'
import MessagesScreen from '~/screens/MessagesScreen/MessagesScreen'
import AccountScreen from '~/screens/User/Main/AccountScreen/AccountScreen'

// Bow can I add screens to an existing navigation stack
export enum Stacks {
  HomeStack = 'HomeStack',
  MessageStack = 'MessageStack',
  CreateStack = 'CreateStack',
  CommunityStack = 'CommunityStack',
  AccountStack = 'AccountStack',
}

type BottomTabScreenStacks = {
  [Stacks.HomeStack]: undefined
  [Stacks.MessageStack]: undefined
  [Stacks.CreateStack]: undefined
  [Stacks.CommunityStack]: undefined
  [Stacks.AccountStack]: undefined
}

interface BottomTab {
  name: keyof BottomTabScreenStacks
  defaultScreen: string
  component: any
  title: string
  icon: any
}

const bottomTabs: BottomTab[] = [
  {
    name: Stacks.HomeStack,
    defaultScreen: Screens.HomeScreen,
    component: HomeScreen,
    title: 'Home',
    icon: HomeIcon,
  },
  {
    name: Stacks.MessageStack,
    defaultScreen: Screens.MessagesScreen,
    component: MessagesScreen,
    title: 'Message',
    icon: MessageIcon,
  },
  {
    name: Stacks.CreateStack,
    defaultScreen: Screens.CreatePostScreen,
    component: CreatePostScreen,
    title: 'Create',
    icon: CircularPlusIcon,
  },
  {
    name: Stacks.CommunityStack,
    defaultScreen: Screens.CommunityScreen,
    component: CommunityScreen,
    title: 'Community',
    icon: GroupIcon,
  },
  {
    name: Stacks.AccountStack,
    defaultScreen: Screens.AccountScreen,
    component: AccountScreen,
    title: 'Account',
    icon: UserIcon,
  },
]

const Tab = createBottomTabNavigator<BottomTabScreenStacks>()

const BottomTabs = () => {
  const theme = useAppTheme()

  return (
    <>
      <Tab.Navigator initialRouteName={bottomTabs[0].name} screenOptions={{ headerShown: false }}>
        {bottomTabs.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={({ navigation }) => {
              const isFocused = navigation.isFocused()
              return {
                title: tab.title,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                  height: getSize(120),
                  backgroundColor: theme.colors.white,
                  shadowColor: '#000',
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 4,
                },
                tabBarItemStyle: {
                  borderTopWidth: 3,
                  justifyContent: 'flex-end',
                  paddingVertical: theme.spacing.xxl,
                  borderTopColor: isFocused ? theme.colors.primary : 'transparent',
                },
                tabBarLabelStyle: {
                  fontSize: getSize(12),
                  color: isFocused ? theme.colors.primary : theme.colors.black,
                  marginTop: theme.spacing.lg,
                },
                tabBarIcon: () => (
                  <tab.icon fill={isFocused ? theme.colors.primary : theme.colors.gray600} />
                ),
              }
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  )
}

export default BottomTabs
