import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Linking } from 'react-native'
import Block from '~/components/Block/Block'
import CheckBox from '~/components/CheckBox/CheckBox'
import LogoIcon from '~/components/Icons/LogoIcons'
import Link from '~/components/Link/Link'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import ContinueWithApple from '~/modules/Auth/Buttons/ContinueWithApple/ContinueWithApple'
import ContinueWithEmail from '~/modules/Auth/Buttons/ContinueWithEmail/ContinueWithEmail'
import ContinueWithGoogle from '~/modules/Auth/Buttons/ContinueWithGoogle/ContinueWithGoogle'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import { ContinueWithMode } from '~/typings/common'

type SignUpScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.SignUpScreen>

export type SignUpScreenParams = undefined

const SignUpScreen: React.FC<SignUpScreenProps> = (props) => {
  const { navigation } = props
  const [loading, setLoading] = useState(false)
  const [checkTermAndCondition, setCheckTermAndCondition] = useState(true)

  const handleSignIn = () => {
    !loading && navigation.navigate(Screens.SignInScreen)
  }

  const handelCheckBox = () => {
    setCheckTermAndCondition(!checkTermAndCondition)
  }

  const handleTermsOfService = () => {
    Linking.openURL('https://www.yu-me.us/terms-of-service/')
  }

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://www.yu-me.us/privacy-policy/')
  }

  return (
    <Block flex1>
      <NavigationBar />
      <ScrollView>
        <Block flex1 pH="xxxl">
          <Block flex1>
            <Block pV="4xl" align="center">
              <LogoIcon />
            </Block>

            <Typography center variation="title1Regular">
              Create a free account
            </Typography>
            <Typography color="gray700" mV="xxxl" center variation="paragraphLight">
              Your identity or information will not be revealed to the community
            </Typography>
          </Block>

          <Block mT="xxxl">
            <ContinueWithGoogle
              loading={loading}
              setLoading={setLoading}
              mode={ContinueWithMode.SignUp}
              mB="xl"
              checkTermAndCondition={checkTermAndCondition}
            />
            <ContinueWithApple
              loading={loading}
              setLoading={setLoading}
              mode={ContinueWithMode.SignUp}
              mB="xl"
              checkTermAndCondition={checkTermAndCondition}
            />
            {/* <ContinueWithMeta
              loading={loading}
              setLoading={setLoading}
              mode={ContinueWithMode.SignUp}
              mB="xl"
            /> */}
            <ContinueWithEmail
              loading={loading}
              setLoading={setLoading}
              mode={ContinueWithMode.SignUp}
              checkTermAndCondition={checkTermAndCondition}
              mB="xl"
            />
          </Block>

          <Block pR="xl" onPress={handelCheckBox} flexDirection="row" mT="md" align="flex-start">
            <Block mT={'sm'}>
              <CheckBox checked={checkTermAndCondition} onChange={handelCheckBox} />
            </Block>
            <Typography mL="md" variation="descriptionRegular">
              By creating an account you agree with our
              <Typography onPress={handleTermsOfService} color="primary" pH="xl">
                {' '}
                Terms of Service{' '}
              </Typography>
              and
              <Typography onPress={handlePrivacyPolicy} color="primary">
                {' '}
                Privacy Policy{' '}
              </Typography>
            </Typography>
          </Block>

          <Block flexDirection="row" mT="xxxl" align="center">
            <Block flex1 height={1} bgColor="gray300" />
            <Typography mH="md" variation="smallRegular" color="gray700">
              OR
            </Typography>
            <Block flex1 height={1} bgColor="gray300" />
          </Block>
          <Block mV="4xl" flexDirection="row" align="center" justify="center">
            <Typography color="gray600" variation="descriptionRegular">
              Already have an account?{' '}
            </Typography>
            <Link color="primary" variation="descriptionSemiBold" onPress={handleSignIn}>
              Sign In
            </Link>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  )
}

export default SignUpScreen
