import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { MainStackScreens, Screens } from '~/navigation/screens'

interface DebtBannerProps {}

function DebtBanner(props: DebtBannerProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.HomeScreen>>()

  return (
    <Block
      pH="xl"
      pV="xl"
      shadow="sm"
      rounded="lg"
      bgColor="white"
      flexDirection="row"
      justify="space-between"
      onPress={() => navigation.navigate(Screens.ReduceDebt0Screen)}>
      <Block flex1>
        <Typography variation="title6SemiBold">Reduce Your Debt</Typography>
        <Typography color="gray600" variation="paragraphLight">
          On average Yume can help you save upto 40% of your debt
        </Typography>
      </Block>
      <Image source={require('~/assets/cash-bundle.png')} width={124} height={80} />
    </Block>
  )
}

export default DebtBanner
