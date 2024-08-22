import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as ImagePicker from 'expo-image-picker'
import { FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import EditIcon from '~/components/Icons/EditIcon'
import LogoIcon from '~/components/Icons/LogoIcons'
import UserIcon from '~/components/Icons/UserIcon'
import Image from '~/components/Image/Image'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import FormikInput from '~/components/formik/FormikInput/FormikInput'
import { getSize } from '~/core/utils/responsive'
import { Screens } from '~/navigation/screens'

type WelcomeToYumeScreenProps = NativeStackScreenProps<any, Screens.WelcomeToYumeScreen>

export type WelcomeToYumeScreenParams = undefined

enum Fields {
  name = 'name',
}

const signUpValidationSchema = Yup.object().shape({
  [Fields.name]: Yup.string().required('Name is required'),
})

const WelcomeToYumeScreen: React.FC<WelcomeToYumeScreenProps> = (props) => {
  const { navigation } = props
  const [image, setImage] = useState(null)
  const [uploadPermission, setUploadPermission] = useState(false)

  const formik = useFormik({
    initialValues: {
      [Fields.name]: 'Dr. Jake Lawland',
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      navigation.navigate<any>(Screens.VerifiedWelcomeToYumeScreen)
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
      setImage((result as any)?.uri)
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
      <Block></Block>
      <NavigationBar />
      <FormikProvider value={formik}>
        <KeyboardView>
          <Block flex1 mT="xl" pV="xxxl" pH="4xl">
            <Block align="center">
              <LogoIcon />
            </Block>
            <Typography center mT="sm" pV="sm" variation="title1Regular">
              Welcome to Yume
            </Typography>
            <Block align="center" mV="xxxl">
              <Block rounded="6xl">
                {image ? (
                  <Image uri={image} size={getSize(78)} />
                ) : (
                  //   <Image size={getSize(78)} source={require('~/assets/userProfile1.png')} />
                  <Block rounded="6xl" bgColor="secondary" pV="xxxl" pH="xxxl">
                    <UserIcon />
                  </Block>
                )}

                <Block
                  absolute
                  bottom={-2}
                  right={-1}
                  shadow="sm"
                  rounded="xxxl"
                  bgColor="white"
                  pV="sm"
                  pH="sm"
                  onPress={() => {
                    if (uploadPermission) pickImage()
                    else askUploadPermission()
                  }}>
                  <EditIcon />
                </Block>
              </Block>
            </Block>
            <Block mB="auto">
              <FormikInput
                autoCapitalize="none"
                name={Fields.name}
                bgColor="gray400"
                label="Your name"
              />
              <Typography mT="md" color="black" variation="descriptionRegular">
                You&apos;ll be shown as a therapist to the Yume Community
              </Typography>
            </Block>
            <Button disabled={!formik.isValid} title="Next" onPress={formik.submitForm} />
          </Block>
        </KeyboardView>
      </FormikProvider>
    </Block>
  )
}

export default WelcomeToYumeScreen
