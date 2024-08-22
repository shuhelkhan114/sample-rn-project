import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import LogoIcon from '~/components/Icons/LogoIcons'
import Image from '~/components/Image/Image'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import FormikDropdown from '~/components/formik/FormikDropdown/FormikDropdown'
import useAppTheme from '~/hooks/useTheme'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type SobernessScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.SobernessScreen>

export type SobernessScreenParams = undefined

enum Fields {
  state = 'state',
}

const locationValidationSchema = Yup.object().shape({
  [Fields.state]: Yup.string().required('State is required'),
})

const SobernessScreen: React.FC<SobernessScreenProps> = (props) => {
  const theme = useAppTheme()

  const formik = useFormik({
    initialValues: {
      [Fields.state]: '',
    },
    validateOnMount: true,
    validationSchema: locationValidationSchema,
    onSubmit: (values) => {},
  })

  return (
    <Block flex1>
      <NavigationBar />
      <FormikProvider value={formik}>
        <Block flex1 mH="4xl">
          <Block align="center">
            <LogoIcon />
          </Block>
          <Typography center mT="xxxl" pV="sm" variation="title1Regular">
            Let us know your soberness
          </Typography>
          <Block align="center" mT="xxxl" mB="4xl" pV="sm">
            <Block rounded="6xl">
              <Image source={require('~/assets/userProfile1.png')} />
            </Block>
          </Block>
          <Block wrap flexDirection="row" mB="auto">
            <FormikDropdown
              name={Fields.state}
              placeholder="Select soberness"
              modalTitle="Select soberness"
              label="soberness"
              options={[
                {
                  label: '1 month',
                  value: '1',
                },
                {
                  label: '2 month',
                  value: '2',
                },
                {
                  label: '3 month',
                  value: '3',
                },
                {
                  label: '4 month',
                  value: '4',
                },
                {
                  label: '5 month',
                  value: '5',
                },
              ]}
              containerStyles={{ marginBottom: theme.spacing.xxxl, width: '100%' }}
            />
          </Block>

          <Block mB="7xl">
            <Typography mB="lg" pV="sm" center>
              Your identity or information will not be revealed to the community
            </Typography>
            <Button
              disabled={!formik.isValid}
              variation={!formik.isValid ? 'secondary' : 'primary'}
              onPress={formik.submitForm}
              title={'Get Started'}
            />
          </Block>
        </Block>
      </FormikProvider>
    </Block>
  )
}

export default SobernessScreen
