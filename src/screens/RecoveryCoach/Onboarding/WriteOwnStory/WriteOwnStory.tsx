import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { FormikProvider, useFormik } from 'formik'
import { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import FormikTextArea from '~/components/formik/FormikTextArea/FormikTextArea'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type RecoveryCoachWriteOwnStoryProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.RecoveryCoachWriteOwnStory
>

export type RecoveryCoachWriteOwnStoryParams = undefined

enum Fields {
  Story = 'story',
}

const validationSchema = Yup.object().shape({
  [Fields.Story]: Yup.string()
    .required('Story is required')
    .max(10, 'Minimum 10 letters')
    .max(1000, 'Maximum then 1000 letters'),
})

const RecoveryCoachWriteOwnStory: React.FC<RecoveryCoachWriteOwnStoryProps> = (props) => {
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
      navigation.navigate(Screens.RecoveryCoachSobernessScreen)
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  const formik = useFormik({
    initialValues: {
      [Fields.Story]: '',
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      updateProfile({ bio: values[Fields.Story] })
    },
  })

  useEffect(() => {
    if (state.recoveryCoach) {
      formik.setFieldValue(Fields.Story, state.recoveryCoach.bio || '')
    }
  }, [state.recoveryCoach])

  return (
    <Block flex1 style={{ paddingBottom: bottom }} mB="xl">
      <KeyboardView>
        <NavigationBar />
        <ScrollView>
          <FormikProvider value={formik}>
            <Block flex1 mH="xl">
              <Block>
                <Typography variation="paragraphRegular">Question 5 of 6</Typography>
                <Typography mT="xl" variation="paragraphLight" color="gray700">
                  Tell us your story?
                </Typography>
              </Block>
              <Block mB="auto" pB="xxxl" mV="4xl">
                <FormikTextArea
                  numberOfLines={8}
                  inputHeight={250}
                  name={Fields.Story}
                  autoCapitalize="sentences"
                  placeholder="Something about myself...."
                  label="Story"
                  minimumText={1000}
                />
                <ErrorText error={error} />
              </Block>
            </Block>
          </FormikProvider>
        </ScrollView>
        <Block mH="xl" pB="lg">
          <Button
            title="Next"
            loading={isPending}
            disabled={!formik.isValid}
            variation={!formik.isValid ? 'secondary' : 'primary'}
            onPress={formik.submitForm}
          />
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default RecoveryCoachWriteOwnStory
