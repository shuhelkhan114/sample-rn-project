import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import LogoIcon from '~/components/Icons/LogoIcons'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { Screens } from '~/navigation/screens'

type NiceToSeeYouScreenProps = NativeStackScreenProps<any, Screens.NiceToSeeYouScreen>

export type NiceToSeeYouScreenParams = undefined

const NiceToSeeYouScreen: React.FC<NiceToSeeYouScreenProps> = (props) => {
  const { navigation } = props

  return (
    <Block flex1>
      <NavigationBar />
      <Block flex1 mT="xl" pV="xxxl" pH="4xl">
        <Block align="center">
          <LogoIcon />
        </Block>
        <Typography center mT="sm" pV="sm" variation="title1Regular">
          Nice to see you!
        </Typography>
        <Block mV="xl" pV="xl" bBW={1} bC="gray200">
          <Typography variation="descriptionSemiBold">Jake Lawland</Typography>
          <Typography color="black">Licensed Professional Counselor, LPC</Typography>
          <Typography color="black">(256) 396-8732</Typography>
          <Typography color="black">Alabama</Typography>
        </Block>
        <Block mB="auto" pV="xl">
          <Typography variation="title3Regular">
            In order to secure this account, we need to confirm your identity.
          </Typography>
          <Typography mV="md">We&apos;ll need:</Typography>
          <Typography color="black">1. A photo of your license card</Typography>
          <Typography color="black">2. A selfie of you holding the license card</Typography>
          <Typography color="black">3. Your email or phone number</Typography>
        </Block>
        <Button
          title="Start"
          onPress={() => navigation.navigate(Screens.ConfirmYourIdentityScreen)}
        />
      </Block>
    </Block>
  )
}

export default NiceToSeeYouScreen
