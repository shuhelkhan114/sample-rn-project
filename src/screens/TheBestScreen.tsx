import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import LogoIcon from '~/components/Icons/LogoIcons'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type TheBestScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.TheBestScreen>

export type TheBestScreenParams = undefined

const TheBestScreen: React.FC<TheBestScreenProps> = (props) => {
  const { navigation } = props

  return (
    <Block flex1>
      <NavigationBar />

      <Block flex1 justify="space-between" mH="4xl">
        <Block>
          <Block align="center">
            <LogoIcon />
          </Block>
          <Typography center mT="xxxl" pV="sm" variation="title1Regular">
            You are the best!
          </Typography>
        </Block>

        <Block mT="7xl" mH="md" align="center" mB="auto">
          <Block rounded="6xl">
            <Image source={require('~/assets/userProfile1.png')} />
          </Block>
          <Block mT="md" flexDirection="row" align="center">
            <Typography mR="md" pV="md" variation="title2SemiBold">
              defiantwarrior
            </Typography>
            <VerifiedAccountIcon />
          </Block>
          <Typography variation="descriptionRegular">Verified Recovery Coach</Typography>
        </Block>

        <Block mB="7xl">
          <Button
            title="Next"
            onPress={() => {
              navigation.navigate(Screens.SobernessScreen)
            }}
          />
        </Block>
      </Block>
    </Block>
  )
}

export default TheBestScreen
