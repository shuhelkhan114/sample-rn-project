import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import CountdownTimer from '~/components/Countdown/CountdownTimer'
import ErrorText from '~/components/ErrorText/ErrorText'
import ReloadIcon from '~/components/Icons/ReloadIcon'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { analytics } from '~/core/lib/analytics'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getErrorMessage } from '~/core/utils/apiError'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type VerificationScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.VerificationScreen>

export type VerificationScreenParams = {
  forgetPassword?: boolean
  email?: string
}

const VerificationScreen: React.FC<VerificationScreenProps> = (props) => {
  const { route, navigation } = props
  const { bottom } = useSafeAreaInsets()
  const theme = useAppTheme()
  const [code, setCode] = useState<string>()
  const [sendCode, setSendCode] = useState(true)
  const { state } = useAuth()

  const { error: resendError, mutate: resendCode } = useMutation({
    mutationFn: async () => {
      if (route.params?.forgetPassword && route?.params.email) {
        await API.user.forgetPassword({
          email: route?.params.email,
        })
      }
      if (state?.user?.email) {
        await API.user.resendVerifyEmail({
          email: state?.user?.email,
        })
      }
      setSendCode(true)
    },
    onSuccess() {
      toast.success('Verification Otp', `Otp is send successfully in ${state?.user?.email} email`)
    },
    onError(error) {
      toast.error('Verification Otp', getErrorMessage(error))
    },
  })

  const {
    isPending,
    error,
    mutate: verification,
  } = useMutation({
    mutationFn: async () => {
      if (code) {
        if (route?.params?.forgetPassword && route.params.email) {
          await API.user.forgotVerifyEmail({
            otp: code,
            email: route.params.email,
          })

          navigation.navigate(Screens.ResetPasswordScreen, { email: route.params.email, code })
        }
        if (state?.user?.email) {
          await API.user.verifyEmail({
            otp: code,
          })
          analytics.logOTPEntered()
          analytics.logEmailSubmitted(state?.user?.email)
          navigation.navigate(Screens.UsernameScreen)
        }
      }
    },
    onError(error) {
      toast.error('Verification Code', getErrorMessage(error))
    },
  })

  const handleNext = async () => {
    verification()
  }

  return (
    <Block flex1 style={{ paddingBottom: bottom }}>
      <KeyboardView>
        <NavigationBar />

        <Block flex1 mB="xl">
          <Block mH="xl">
            <Typography variation="title3SemiBold">Verification</Typography>
            <Typography mT="lg" variation="paragraphLight" color="gray700">
              We emailed you a code to verify your account
            </Typography>
          </Block>
          <Block flex1 mT="xxxl" mH="xl">
            <Block mB="auto">
              <Block mB="xl">
                <OTPInputView
                  pinCount={6}
                  placeholderCharacter=""
                  codeInputFieldStyle={styles.codeInputFieldStyle}
                  style={styles.otpInput}
                  onCodeChanged={(code) => setCode(code)}
                />
                {sendCode ? (
                  <Block mT="xxxl" justify="center" flexDirection="row" align="center">
                    <ReloadIcon width={20} height={20} fill={theme.colors.gray500} />
                    <Typography variation="descriptionRegular" mL="md" mR="sm">
                      Resend Code
                    </Typography>
                    <CountdownTimer
                      color="primary"
                      variation="descriptionRegular"
                      initialTimeInMin={2}
                      onCountDownEnd={() => {
                        setSendCode(false)
                      }}
                    />
                  </Block>
                ) : (
                  <Block
                    onPress={() => resendCode()}
                    mT="xxxl"
                    justify="center"
                    flexDirection="row"
                    align="center">
                    <ReloadIcon width={20} height={20} fill={theme.colors.primary} />
                    <Typography color="primary" variation="descriptionRegular" mL="md" mR="sm">
                      Resend Code
                    </Typography>
                  </Block>
                )}
              </Block>

              <ErrorText error={(error as Error) || (resendError as Error)} />
            </Block>

            <Block>
              <Button
                loading={isPending}
                disabled={code?.length !== 6}
                variation={code?.length !== 6 ? 'secondary' : 'primary'}
                title="Next"
                onPress={handleNext}
              />
            </Block>
          </Block>
        </Block>
      </KeyboardView>
    </Block>
  )
}

const styles = StyleSheet.create({
  otpInput: {
    height: 60,
  },
  codeInputFieldStyle: {
    color: 'black',
    backgroundColor: '#F3F4F6',
    borderWidth: 0,
    margin: 0,
    padding: 0,
    borderRadius: 8,
  },
})

export default VerificationScreen
