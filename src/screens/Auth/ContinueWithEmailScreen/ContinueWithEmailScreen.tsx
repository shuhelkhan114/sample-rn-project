import auth from '@react-native-firebase/auth'
import messaging from '@react-native-firebase/messaging'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import FormikInput from '~/components/formik/FormikInput/FormikInput'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getErrorMessage } from '~/core/utils/apiError'
import { emailSchema, passwordSchema } from '~/core/validation/auth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import { ContinueWithMode, SocialLoginTypes } from '~/typings/common'

type ContinueWithEmailScreenProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.ContinueWithEmailScreen
>

export type ContinueWithEmailScreenParams = {
  mode: ContinueWithMode
}

enum Fields {
  email = 'email',
  password = 'password',
}

const signUpValidationSchema = Yup.object().shape({
  [Fields.email]: emailSchema,
  [Fields.password]: passwordSchema,
})

const ContinueWithEmailScreen: React.FC<ContinueWithEmailScreenProps> = (props) => {
  const { route, navigation } = props
  const { mode } = route.params
  const { bottom } = useSafeAreaInsets()
  const [errorMessage, setErrorMessage] = useState<string>()

  const {
    isPending,
    error,
    mutate: signup,
  } = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { email, password } = credentials

      if (mode === ContinueWithMode.SignUp) {
        const token = await messaging().getToken()
        await API.user.signup({
          email,
          password,
          device_tokens: [token],
          // device_tokens: ['00008101-001C21EE21E8001E'],
          user_source: SocialLoginTypes.Email,
        })
      }
      await auth().signInWithEmailAndPassword(email, password)
    },
    onError(error) {
      let message = ''
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          message = 'User not found, please sign up!'
        } else {
          message = getErrorMessage(error)
        }
      } else {
        message = getErrorMessage(error)
      }
      setErrorMessage(message)
      toast.error(`${mode === ContinueWithMode.Login ? 'Sign In' : 'Sign Up'}`, message)
    },
  })

  const formik = useFormik({
    initialValues: {
      [Fields.email]: '',
      [Fields.password]: '',
    },
    validateOnMount: true,
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      signup(values)
    },
  })

  return (
    <Block flex1 style={{ paddingBottom: bottom }}>
      <KeyboardView>
        <NavigationBar />
        <FormikProvider value={formik}>
          <Block flex1 pB="xl">
            <Block mH="xl">
              <Typography variation="title3SemiBold">
                {mode === ContinueWithMode.Login ? 'Sign In' : 'Email address'}
              </Typography>
            </Block>
            <Block flex1 mT="xxxl" mH="xl">
              <Block mB="auto">
                <Block mB="xl">
                  <FormikInput
                    autoCapitalize="none"
                    name={Fields.email}
                    bgColor="white"
                    autoCorrect={false}
                    // TODO: temp fix
                    textContentType="oneTimeCode"
                    label="Email"
                  />
                  {mode === ContinueWithMode.SignUp && (
                    <Typography mT="md" color="gray500" variation="descriptionRegular">
                      Your identity will never be shown to the community
                    </Typography>
                  )}
                </Block>
                <FormikInput
                  type="password"
                  autoCorrect={false}
                  // TODO: temp fix
                  textContentType="oneTimeCode"
                  name={Fields.password}
                  secureTextEntry={true}
                  bgColor="white"
                  label={mode === ContinueWithMode.SignUp ? 'Create a Password' : 'Password'}
                />
                {errorMessage && (
                  <Typography variation="paragraphRegular" color="negative" mV="xl">
                    {errorMessage}
                  </Typography>
                )}

                {!errorMessage && <ErrorText error={error} />}

                {mode === ContinueWithMode.Login && (
                  <Typography
                    onPress={() => navigation.navigate(Screens.ForgotPassword)}
                    mT="md"
                    color="gray500"
                    variation="descriptionRegular">
                    Forgot password?
                  </Typography>
                )}
              </Block>

              <Block>
                <Button
                  loading={isPending}
                  disabled={!formik.isValid}
                  variation={!formik.isValid ? 'secondary' : 'primary'}
                  title={`${mode === ContinueWithMode.Login ? 'Sign In' : 'Next'}`}
                  onPress={formik.submitForm}
                />
              </Block>
            </Block>
          </Block>
        </FormikProvider>
      </KeyboardView>
    </Block>
  )
}

export default ContinueWithEmailScreen
