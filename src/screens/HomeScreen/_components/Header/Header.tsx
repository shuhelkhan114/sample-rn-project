import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import CheckInIcon from '~/components/Icons/CheckInIcon'
import NotificationIcon from '~/components/Icons/NotificationIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { UserRole } from '~/context/AuthContext'
import { capitalizeFirstLetter } from '~/core/utils/common'
import { usdFormatter } from '~/core/utils/currency'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

interface HeaderProps {
  name: string
  image: string
  role: UserRole
  dailySavings: number
  hours: number
}

function Header({ hours, dailySavings, name, image, role }: HeaderProps) {
  const { top } = useSafeAreaInsets()

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.HomeScreen>>()

  const theme = useAppTheme()

  return (
    <Block pH="xl" pB="xl" style={{ paddingTop: top }}>
      <Block flexDirection="row">
        <Image mR="lg" size={43} uri={image} circular />

        <Block mR="auto" flex1>
          {dailySavings ? (
            <Typography mT="sm">
              {capitalizeFirstLetter(name)} you save{' '}
              <Typography color="primary" variation="descriptionSemiBold">
                {usdFormatter.format(dailySavings)}/day
              </Typography>{' '}
              and {hours} hour a day every day you don&apos;t gamble.
            </Typography>
          ) : (
            <Typography>
              Hi <Typography variation="descriptionSemiBold">{name}</Typography>
            </Typography>
          )}
        </Block>

        <Block mL="sm">
          <Block flexDirection="row">
            {role === UserRole.User && (
              <Block mR="xl" onPress={() => navigation.navigate(Screens.AllCheckInScreen)}>
                <CheckInIcon fill={theme.colors.gray700} />
              </Block>
            )}
            <Block onPress={() => navigation.navigate(Screens.NotificationsScreen)}>
              <NotificationIcon width={22} height={22} />
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  )
}

export default Header
