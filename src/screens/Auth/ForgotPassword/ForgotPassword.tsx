import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import FormikInput from '~/components/formik/FormikInput/FormikInput'
import { getErrorMessage } from '~/core/utils/apiError'
import { emailSchema } from '~/core/validation/auth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
// import { sendPasswordResetEmail } from 'firebase/auth'

import { FormikProvider, useFormik } from 'formik'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import * as Yup from 'yup'
import toast from '~/core/lib/toast'
import API from '~/core/services'

type ForgotPasswordProps = NativeStackScreenProps<AuthStackScreens, Screens.ForgotPassword>

export type ForgotPasswordParams = undefined

enum Fields {
  email = 'email',
}

const forgotPasswordValidationSchema = Yup.object().shape({
  [Fields.email]: emailSchema,
})

const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const { navigation } = props
  const { bottom } = useSafeAreaInsets()

  const {
    isPending,
    error,
    mutate: forgotPassword,
  } = useMutation({
    mutationFn: async (credentials: { email: string }) => {
      const { email } = credentials
      // users/forgotPasswordCode
      await API.user.forgetPassword({ email: email.trim() })
      toast.success('Verification code', 'Verification code is sent successfully!')
      navigation.navigate(Screens.VerificationScreen, { forgetPassword: true, email })
    },
    onError(error) {
      let message = ''
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          message = 'User not found, please sign up!'
        }
      } else {
        message = getErrorMessage(error)
      }
      toast.error('Verification code', message)
    },
  })

  const formik = useFormik({
    initialValues: {
      [Fields.email]: '',
    },
    validateOnMount: true,
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: async (values) => {
      forgotPassword({ email: values.email })
    },
  })

  return (
    <Block flex1 style={{ paddingBottom: bottom }}>
      <KeyboardView>
        <NavigationBar />
        <FormikProvider value={formik}>
          <Block flex1>
            <Block mH="xl">
              <Typography variation="title3SemiBold">Forgot Password</Typography>
              <Typography mT="md" color="gray500" variation="descriptionRegular">
                Please enter your email address and we will send a verification code
              </Typography>
            </Block>
            <Block flex1 mT="xxxl" mH="xl">
              <Block mB="auto">
                <Block mB="xl">
                  <FormikInput
                    autoCapitalize="none"
                    name={Fields.email}
                    bgColor="white"
                    label="Email"
                  />
                </Block>

                <ErrorText error={error as Error} />
              </Block>

              <Block>
                <Button
                  mB="xl"
                  variation={!formik.isValid ? 'secondary' : 'primary'}
                  loading={isPending}
                  disabled={!formik.isValid}
                  title="Next"
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

export default ForgotPassword
