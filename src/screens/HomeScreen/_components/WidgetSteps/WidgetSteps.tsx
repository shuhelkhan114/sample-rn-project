import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'
import ArrowSVG from '../ArrowSVG/ArrowSVG'

interface WidgetStepsProps {}

function WidgetSteps(props: WidgetStepsProps) {
  const theme = useAppTheme()

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.HomeScreen>>()

  return (
    <Block
      mT="md"
      pV="xl"
      pH="xl"
      shadow="sm"
      rounded="lg"
      bgColor="white"
      flexDirection="row"
      onPress={() => navigation.navigate(Screens.LastGambleDayScreen, { from: 'home' })}>
      <Block flex1>
        <Typography variation="paragraphSemiBold">Win back your time, money & life</Typography>
        <Typography color="gray600" variation="descriptionLight">
          See how much time and money you&apos;ll save by not gambling each day
        </Typography>
      </Block>
      <Block
        height={38}
        width={38}
        rounded="6xl"
        align="center"
        justify="center"
        // TODO: Create a bgOpacity prop in the Block component
        style={{ backgroundColor: theme.colors.primary + '1A' }}>
        <ArrowSVG />
      </Block>
    </Block>
  )
}

export default WidgetSteps
