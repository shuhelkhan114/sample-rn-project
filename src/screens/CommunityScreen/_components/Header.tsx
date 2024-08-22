import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import UserGroupIcon from '~/components/Icons/UserGroupIcon'
import Typography from '~/components/Typography/Typography'
import { MainStackScreens, Screens } from '~/navigation/screens'

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const { top } = useSafeAreaInsets()

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.CommunityScreen>>()

  return (
    <Block pH="xl" pB="lg" style={{ paddingTop: top }} shadow="sm" bW={1} bC="gray100">
      <Block flexDirection="row">
        <Block mR="auto" flex1>
          <Typography variation="paragraphSemiBold">Yume Community</Typography>
        </Block>
        <Block mL="sm">
          <Block flexDirection="row">
            <Block onPress={() => navigation.navigate(Screens.MembersListScreen)}>
              <UserGroupIcon width={24} height={24} />
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  )
}

export default Header
