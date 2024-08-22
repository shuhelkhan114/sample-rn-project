import auth from '@react-native-firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FormikProvider, useFormik } from 'formik'
import { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
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

type RecoveryCoachContinueWithEmailScreenProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.RecoveryCoachContinueWithEmailScreen
>

export type RecoveryCoachContinueWithEmailScreenParams = {
  invitationId: string
  email: string
}

enum Fields {
  email = 'email',
  password = 'password',
}

const signUpValidationSchema = Yup.object().shape({
  [Fields.email]: emailSchema,
  [Fields.password]: passwordSchema,
})

const RecoveryCoachContinueWithEmailScreen: React.FC<RecoveryCoachContinueWithEmailScreenProps> = (
  props
) => {
  const { route, navigation } = props

  const { bottom } = useSafeAreaInsets()

  const {
    isPending,
    error,
    mutate: signup,
  } = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { email, password } = credentials
      if (route.params?.invitationId) {
        await API.recoveryCoach.signup({
          email,
          password,
          invitationId: route.params?.invitationId,
        })
      }

      await auth().signInWithEmailAndPassword(email, password)

      if (route.params.invitationId) {
        navigation.navigate(Screens.RecoveryCoachSelectNameScreen)
      }
    },
    onError(error) {
      let message = ''
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          message = 'User not found, please sign up!'
        }
      } else {
        message = getErrorMessage(error) || 'Something went wrong'
      }
      toast.error('Profile', message)
    },
  })

  const formik = useFormik({
    initialValues: {
      [Fields.email]: '',
      [Fields.password]: '',
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      signup(values)
    },
  })

  useEffect(() => {
    if (route.params) {
      formik.setFieldValue(Fields.email, route.params.email)
    }
  }, [route.params])

  return (
    <Block flex1 style={{ paddingBottom: bottom }}>
      <KeyboardView>
        <NavigationBar />
        <FormikProvider value={formik}>
          <Block flex1>
            <Block mH="xl">
              <Typography variation="title3SemiBold">Email Address</Typography>
            </Block>
            <Block flex1 mT="xxxl" mH="xl">
              <Block mB="auto">
                <Block relative mB="xxxl">
                  <Block absolute top={0} right={0} flexDirection="row" align="center">
                    <Typography mB="sm" mR="sm" variation="smallRegular">
                      Wow! Thanks for being a recovery coach
                    </Typography>
                    <VerifiedAccountIcon width={16} height={16} />
                  </Block>
                  <FormikInput
                    disabled={typeof route?.params?.email === 'string'}
                    autoCapitalize="none"
                    name={Fields.email}
                    bgColor="white"
                    label="Email"
                    value={route.params?.email}
                  />
                  <Typography mT="md" color="gray500" variation="descriptionRegular">
                    Your identity will never be shown to the community
                  </Typography>
                </Block>
                <FormikInput
                  type="password"
                  name={Fields.password}
                  secureTextEntry={true}
                  bgColor="white"
                  label="Create a Password"
                />
                <ErrorText error={error as Error} />
              </Block>

              <Block>
                <Button
                  loading={isPending}
                  // disabled={!formik.isValid}
                  // variation={!formik.isValid ? 'secondary' : 'primary'}
                  title="Next"
                  // onPress={() => {
                  //   auth().signOut()
                  // }}
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

export default RecoveryCoachContinueWithEmailScreen
