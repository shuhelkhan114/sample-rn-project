import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as ImagePicker from 'expo-image-picker'
import { FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import CameraIcon from '~/components/Icons/CameraIcon'
import IIcon from '~/components/Icons/IIcon'
import Image from '~/components/Image/Image'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import FormikDropdown from '~/components/formik/FormikDropdown/FormikDropdown'
import FormikInput from '~/components/formik/FormikInput/FormikInput'
import { getSize } from '~/core/utils/responsive'
import { emailSchema } from '~/core/validation/auth'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

type ConfirmYourIdentityScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.ConfirmYourIdentityScreen
>

enum Fields {
  email = 'email',
  type = 'type',
}

const signUpValidationSchema = Yup.object().shape({
  [Fields.email]: emailSchema,
  [Fields.type]: Yup.string().required('Contact Type is required'),
})

export type ConfirmYourIdentityScreenParams = undefined

const ConfirmYourIdentityScreen: React.FC<ConfirmYourIdentityScreenProps> = (props) => {
  const { navigation } = props
  const theme = useAppTheme()
  const [license, setLicense] = useState(null)
  const [selfieLicense, setSelfieLicense] = useState(null)
  const [uploadPermission, setUploadPermission] = useState(false)

  const formik = useFormik({
    initialValues: {
      [Fields.email]: '',
      [Fields.type]: '',
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      navigation.navigate<any>(Screens.ReviewInformationScreen)
    },
  })

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setLicense((result as any)?.uri)
    }
  }

  const selfiePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setSelfieLicense((result as any)?.uri)
    }
  }

  const askUploadPermissionSelfieLicense = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status === 'granted') {
      setUploadPermission(true)
      selfiePickImage()
    }
  }
  const askUploadPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status === 'granted') {
      setUploadPermission(true)
      pickImage()
    }
  }

  return (
    <Block flex1>
      <NavigationBar title="Confirm your identity" />
      <FormikProvider value={formik}>
        <KeyboardView>
          <Block flex1 pH="4xl" pB="4xl">
            <Block pV="xl" mV="xl">
              <Typography variation="descriptionSemiBold">Jake Lawland</Typography>
              <Typography color="black">Licensed Professional Counselor, LPC</Typography>
              <Typography color="black">(256) 396-8732</Typography>
              <Typography color="black">Alabama</Typography>
            </Block>
            <Block
              flexDirection="row"
              align="center"
              justify="space-between"
              pV="xl"
              pH="xl"
              bgColor="gray200"
              rounded="sm"
              onPress={() => {
                if (uploadPermission) pickImage()
                else askUploadPermission()
              }}>
              <Block flexDirection="row" align="center">
                {license ? (
                  <Image uri={license} size={getSize(40)} />
                ) : (
                  <CameraIcon fill={theme.colors.black} />
                )}

                <Typography mL="md" variation="paragraphSemiBold">
                  Picture of your license
                </Typography>
              </Block>
              <IIcon fill={theme.colors.black} />
            </Block>
            <Block
              flexDirection="row"
              align="center"
              justify="space-between"
              pV="xl"
              pH="xl"
              mV="xl"
              bgColor="gray200"
              rounded="sm"
              onPress={() => {
                if (uploadPermission) selfiePickImage()
                else askUploadPermissionSelfieLicense()
              }}>
              <Block flexDirection="row" align="center">
                {selfieLicense ? (
                  <Image uri={selfieLicense} size={getSize(40)} />
                ) : (
                  <CameraIcon fill={theme.colors.black} />
                )}
                <Typography mL="md" variation="paragraphSemiBold">
                  Selfie holding your license
                </Typography>
              </Block>
              <IIcon fill={theme.colors.black} />
            </Block>
            <Block mV="xl" mB="auto">
              <FormikDropdown
                name={Fields.type}
                placeholder="Mode"
                modalTitle="Select mode"
                modalTitleDescription="Tell us how you want to handle your calories"
                label="Contact Type"
                options={[
                  {
                    label: 'Email',
                    value: 'email',
                    // description: 'Reduce calories for weight loss',
                  },
                  {
                    label: 'Phone',
                    value: 'phone',
                    // description: 'Reduce calories for weight loss',
                  },
                ]}
                containerStyles={{ marginBottom: theme.spacing.xxxl }}
              />
              <FormikInput
                autoCapitalize="none"
                name={Fields.email}
                bgColor="gray400"
                label="Type your email"
              />
            </Block>
            <Button disabled={!formik.isValid} title="Submit" onPress={formik.submitForm} />
          </Block>
        </KeyboardView>
      </FormikProvider>
    </Block>
  )
}

export default ConfirmYourIdentityScreen
