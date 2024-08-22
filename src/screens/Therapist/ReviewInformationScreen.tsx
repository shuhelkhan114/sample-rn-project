import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import LogoIcon from '~/components/Icons/LogoIcons'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { Screens } from '~/navigation/screens'

type ReviewInformationScreenProps = NativeStackScreenProps<any, Screens.ReviewInformationScreen>

export type ReviewInformationScreenParams = undefined

const ReviewInformationScreen: React.FC<ReviewInformationScreenProps> = (props) => {
  const { navigation } = props

  return (
    <Block flex1>
      <NavigationBar />
      <Block flex1 mT="xl" pT="xxxl" pB="4xl" pH="4xl">
        <Block align="center">
          <LogoIcon />
        </Block>
        <Typography center mT="lg" variation="title1Regular">
          Thank you!
        </Typography>
        <Typography center mT="xxxl">
          We&apos;ll review your information and get back to you as soon as possible.
        </Typography>
        <Typography center mT="xxxl" mB="auto">
          It may take up to 2 business days for us to get done. 😊
        </Typography>

        <Button
          variation="tertiary"
          title="Close Yume"
          onPress={() => navigation.navigate(Screens.WelcomeToYumeScreen)}
        />
      </Block>
    </Block>
  )
}

export default ReviewInformationScreen
