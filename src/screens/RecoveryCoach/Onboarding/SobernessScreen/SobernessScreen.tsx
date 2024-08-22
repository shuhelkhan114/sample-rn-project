import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { FormikProvider, useFormik } from 'formik'
import { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import FormikDropdown from '~/components/formik/FormikDropdown/FormikDropdown'
import { statesOption } from '~/core/data/soberness'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type RecoveryCoachSobernessScreenProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.RecoveryCoachSobernessScreen
>

export type RecoveryCoachSobernessScreenParams = undefined

enum Fields {
  Soberness = 'Soberness',
}

const validationSchema = Yup.object().shape({
  [Fields.Soberness]: Yup.string().required('Soberness is required'),
})

const RecoveryCoachSobernessScreen: React.FC<RecoveryCoachSobernessScreenProps> = (props) => {
  const { navigation } = props
  const { bottom } = useSafeAreaInsets()

  const { state } = useAuth()

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.recoveryCoach.updateProfile,
    onSuccess() {
      navigation.navigate(Screens.RecoveryCoachPublicViewScreen)
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  const formik = useFormik({
    initialValues: {
      [Fields.Soberness]: '',
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      updateProfile({ soberness: values[Fields.Soberness], done_onboarding: true })
    },
  })

  useEffect(() => {
    if (state.recoveryCoach) {
      formik.setFieldValue(Fields.Soberness, state.recoveryCoach.soberness || '')
    }
  }, [state.recoveryCoach])

  return (
    <Block flex1 style={{ paddingBottom: bottom }} mB="xl">
      <NavigationBar />
      <FormikProvider value={formik}>
        <Block flex1 mH="xl">
          <Block>
            <Typography variation="paragraphRegular">Question 6 of 6</Typography>
            <Typography mT="xl" variation="paragraphLight" color="gray700">
              What state are you currently in? This way, we can offer location-specific recovery
              coach’s and recommendations.
            </Typography>
          </Block>
          <Block wrap flexDirection="row" mB="auto" mV="4xl">
            <FormikDropdown
              options={statesOption}
              name={Fields.Soberness}
              placeholder="Select"
              modalTitle="Select"
              label="Soberness"
              containerStyles={{ width: '100%' }}
            />
          </Block>

          <Block>
            <ErrorText error={error} />
            <Button
              title="Next"
              loading={isPending}
              disabled={!formik.isValid}
              variation={!formik.isValid ? 'secondary' : 'primary'}
              onPress={formik.submitForm}
            />
          </Block>
        </Block>
      </FormikProvider>
    </Block>
  )
}

export default RecoveryCoachSobernessScreen
