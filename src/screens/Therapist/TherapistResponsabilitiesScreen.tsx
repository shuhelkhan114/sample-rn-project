import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import LogoIcon from '~/components/Icons/LogoIcons'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { Screens } from '~/navigation/screens'

type TherapistResponsibilitiesScreenProps = NativeStackScreenProps<
  any,
  Screens.TherapistResponsibilitiesScreen
>

export type TherapistResponsibilitiesScreenParams = undefined

const TherapistResponsibilitiesScreenScreen: React.FC<TherapistResponsibilitiesScreenProps> = (
  props
) => {
  const { navigation } = props

  return (
    <Block flex1>
      <NavigationBar />

      <Block flex1 mT="xl" pT="xxxl" pB="4xl" pH="4xl">
        <Block align="center">
          <LogoIcon />
        </Block>
        <Typography center mT="sm" pV="sm" variation="title1Regular">
          Therapist Responsibilities
        </Typography>
        <Typography mV="xxxl">
          At Yume, your role is crucial in guiding individuals toward recovery. To join, agree with
          each key responsibility in providing support and maintaining a safe, confidential
          environment.
        </Typography>
        <Block mB="auto"></Block>

        <Button
          title="I acknowledge my responsibilities"
          onPress={() => {
            navigation.navigate(Screens.SupportCommunityScreen)
          }}
        />
      </Block>
    </Block>
  )
}

export default TherapistResponsibilitiesScreenScreen
