import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { FormikProvider, useFormik } from 'formik'
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
import { colors } from '~/core/styles/theme'
import { getErrorMessage } from '~/core/utils/apiError'
import { passwordSchema } from '~/core/validation/auth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import { ContinueWithMode } from '~/typings/common'

interface PasswordStrengthMeterParams {
  password: string
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterParams) => {
  let strengthText = 'Weak! Should be 8 character along with uppercase and a number.'
  let strengthColor: keyof typeof colors = 'negative'
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/

  if (password.length >= 6 && passwordRegex.test(password)) {
    strengthText = 'You are doing great!'
    strengthColor = 'positive'
  } else if (password.length >= 6) {
    strengthText = 'Not bad but you know you can do it better by adding  numbers.'
    strengthColor = 'warning'
  }

  return (
    <Block mT="md">
      <Block bgColor={strengthColor} height={4} rounded="xl" />
      <Typography variation="smallRegular" color={strengthColor}>
        {strengthText}
      </Typography>
    </Block>
  )
}

type ResetPasswordScreenProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.ResetPasswordScreen
>

export type ResetPasswordScreenParams = {
  email?: string
  code: string
}

enum Fields {
  password = 'password',
  confirmPassword = 'confirmPassword',
}

const signUpValidationSchema = Yup.object().shape({
  [Fields.password]: passwordSchema,
  [Fields.confirmPassword]: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
})

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = (props) => {
  const { navigation, route } = props
  const { code } = route.params
  const { bottom } = useSafeAreaInsets()

  const {
    isPending,
    error,
    mutate: resetPassword,
  } = useMutation({
    mutationFn: async (password: string) => {
      await API.user.verifyUpdatePassword({
        otp: code,
        password,
        email: route.params.email as string,
      })
      toast.success('Success', 'Password updated successfully!')
      navigation.navigate(Screens.ContinueWithEmailScreen, { mode: ContinueWithMode.Login })
    },
    onError(error) {
      toast.error('Error', getErrorMessage(error))
    },
  })

  const formik = useFormik({
    initialValues: {
      [Fields.password]: '',
      [Fields.confirmPassword]: '',
    },
    validateOnMount: true,
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      resetPassword(values.password)
    },
  })

  return (
    <Block flex1 style={{ paddingBottom: bottom }}>
      <KeyboardView>
        <NavigationBar />
        <FormikProvider value={formik}>
          <Block flex1>
            <Block mH="xl">
              <Typography variation="title3SemiBold">Reset password</Typography>
              <Typography mT="md" color="gray500" variation="descriptionRegular">
                Your identity will never be shown to the community
              </Typography>
            </Block>
            <Block flex1 mT="xxxl" mH="xl">
              <Block mB="auto">
                <FormikInput
                  type="password"
                  name={Fields.password}
                  secureTextEntry={true}
                  bgColor="white"
                  label={'New Password'}
                />
                {formik.touched.password && (
                  <PasswordStrengthMeter password={formik.values.password} />
                )}
                <FormikInput
                  mT="xxxl"
                  type="password"
                  name={Fields.confirmPassword}
                  secureTextEntry={true}
                  bgColor="white"
                  label={'Confirm Password'}
                />

                <ErrorText error={error as Error} />
              </Block>

              <Block>
                <Button
                  mB="xl"
                  loading={isPending}
                  disabled={!formik.isValid}
                  variation={!formik.isValid ? 'secondary' : 'primary'}
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

export default ResetPasswordScreen
