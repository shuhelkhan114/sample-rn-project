import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import LogoIcon from '~/components/Icons/LogoIcons'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import FormikInput from '~/components/formik/FormikInput/FormikInput'
import { Screens } from '~/navigation/screens'

type TherapistSignUpScreenProps = NativeStackScreenProps<any, Screens.TherapistSignUpScreen>

export type TherapistSignUpScreenParams = undefined

enum Fields {
  name = 'name',
}

const signUpValidationSchema = Yup.object().shape({
  [Fields.name]: Yup.string().required('Name is required'),
})

const TherapistSignUpScreen: React.FC<TherapistSignUpScreenProps> = (props) => {
  const { navigation } = props
  const formik = useFormik({
    initialValues: {
      [Fields.name]: '',
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      navigation.navigate<any>(Screens.NiceToSeeYouScreen)
    },
  })

  return (
    <Block flex1>
      <NavigationBar />
      <FormikProvider value={formik}>
        <KeyboardView>
          <Block flex1 mT="xl" pV="xxxl" pH="4xl">
            <Block align="center">
              <LogoIcon />
            </Block>
            <Typography center mT="sm" pV="sm" variation="title1Regular">
              Hello there
            </Typography>
            <Block mB="auto">
              <FormikInput
                autoCapitalize="none"
                name={Fields.name}
                bgColor="gray400"
                label="Please type your name"
              />
              <Typography mT="md" color="black" variation="descriptionRegular">
                Start typing to search your name
              </Typography>
            </Block>
            <Button disabled={!formik.isValid} title="Next" onPress={formik.submitForm} />
          </Block>
        </KeyboardView>
      </FormikProvider>
    </Block>
  )
}

export default TherapistSignUpScreen
