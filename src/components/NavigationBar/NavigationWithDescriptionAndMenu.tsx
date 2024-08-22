import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import NotificationIcon from '~/components/Icons/NotificationIcon'
import Image from '~/components/Image/Image'
import { UserRole } from '~/context/AuthContext'
import { getSize } from '~/core/utils/responsive'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'
import CheckInIcon from '../Icons/CheckInIcon'
import Typography from '../Typography/Typography'

interface NavigationWithDescriptionAndMenuProps {
  title?: string
  notification?: boolean
  center?: boolean
  description?: string
  sideTitleClick?: () => void
}

const NavigationWithDescriptionAndMenu: React.FC<NavigationWithDescriptionAndMenuProps> = (
  props
) => {
  const { top } = useSafeAreaInsets()
  const theme = useAppTheme()

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.HomeScreen>>()

  const { currentUser, state } = useAuth()

  const handleCheckin = () => {
    navigation.navigate(Screens.AllCheckInScreen)
  }

  return (
    <Block pH="xxl" pV="xl" bBW={1} bC="gray200" style={{ paddingTop: top }}>
      <Block flexDirection="row" align="center">
        <Block flex1 flexDirection="row" align="center">
          <Image circular size={getSize(44)} uri={currentUser.displayImage} />
          <Typography variation="paragraphSemiBold" mL="md">
            {currentUser.displayName}
          </Typography>
        </Block>

        <Block flexDirection="row">
          {state.role === UserRole.User && (
            <Block mR="xl" onPress={handleCheckin}>
              <CheckInIcon fill={theme.colors.gray700} />
            </Block>
          )}
          {/* <Block mR="xl" onPress={() => {}}>
            <Filter />
          </Block> */}
          <Block onPress={() => navigation.navigate(Screens.NotificationsScreen)}>
            <NotificationIcon width={22} height={22} />
          </Block>
        </Block>
      </Block>
    </Block>
  )
}

export default NavigationWithDescriptionAndMenu
