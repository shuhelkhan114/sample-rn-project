import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import Block from '~/components/Block/Block'
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

type SignInScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.SignInScreen>

export type SignInScreenParams = undefined

const SignInScreen: React.FC<SignInScreenProps> = (props) => {
  const { navigation } = props
  const [loading, setLoading] = useState(false)

  const handleSignUp = () => {
    !loading && navigation.navigate(Screens.SignUpScreen)
  }

  return (
    <Block flex1>
      <NavigationBar />
      <ScrollView>
        <Block flex1 mH="4xl">
          <Block flex1>
            <Block pV="4xl" align="center">
              <LogoIcon />
            </Block>
            <Typography center variation="title1Regular">
              Sign In
            </Typography>
            <Typography color="gray700" mV="xxxl" center variation="paragraphLight">
              Your identity or information will not be revealed to the community
            </Typography>
          </Block>
          <Block mV="xxxl">
            <ContinueWithGoogle
              loading={loading}
              setLoading={setLoading}
              mode={ContinueWithMode.Login}
              checkTermAndCondition
              mB="xl"
            />
            <ContinueWithApple
              loading={loading}
              setLoading={setLoading}
              mode={ContinueWithMode.Login}
              checkTermAndCondition
              mB="xl"
            />
            {/* <ContinueWithMeta
              loading={loading}
              setLoading={setLoading}
              mode={ContinueWithMode.Login}
              mB="xl"
            /> */}
            <ContinueWithEmail
              loading={loading}
              setLoading={setLoading}
              mode={ContinueWithMode.Login}
              checkTermAndCondition
              mB="xl"
            />
          </Block>

          <Block flexDirection="row" mT="md" align="center">
            <Block flex1 height={1} bgColor="gray200" />
            <Typography mH="md" variation="smallRegular" color="gray700">
              OR
            </Typography>
            <Block flex1 height={1} bgColor="gray200" />
          </Block>

          <Block mV="4xl" flexDirection="row" align="center" justify="center">
            <Typography color="gray600" variation="descriptionRegular">
              Don&apos;t have a account?
            </Typography>
            <Link mL="sm" color="primary" variation="descriptionSemiBold" onPress={handleSignUp}>
              Sign Up
            </Link>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  )
}

export default SignInScreen
