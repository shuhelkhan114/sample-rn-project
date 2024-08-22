import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { FormikProvider, useFormik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import CameraIcon from '~/components/Icons/CameraIcon'
import Image from '~/components/Image/Image'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import FormikInput from '~/components/formik/FormikInput/FormikInput'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getSize } from '~/core/utils/responsive'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import SuccessModal from '~/modules/PreparePublicProfile/SuccessModal/SuccessModal'
import { MainStackScreens, Screens } from '~/navigation/screens'

type PreparePublicProfileScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.PreparePublicProfileScreen
>

export type PreparePublicProfileScreenParams = undefined

enum Fields {
  name = 'name',
  image = 'image',
}

const signUpValidationSchema = Yup.object().shape({
  [Fields.name]: Yup.string().required('Name is required'),
  [Fields.image]: Yup.string().required('Image is required'),
})

const PreparePublicProfileScreen: React.FC<PreparePublicProfileScreenProps> = (props) => {
  const { navigation } = props
  const { refetchProfile, currentUser } = useAuth()
  const [uploadPermission, setUploadPermission] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)

  const theme = useAppTheme()

  const { isPending: revealingYourself, mutateAsync: revealYourSelf } = useMutation({
    mutationFn: async (params: { name: string; image: string }) => {
      const { name, image } = params
      let imageUrl = image
      if (!image.startsWith('http')) {
        const { image_url } = await API.user.uploadImage(image)
        imageUrl = image_url
      }
      await API.user.updateProfile({
        name,
        user_image: imageUrl,
        revealed_to_community: true,
      })
      await API.user.revealYourSelf({ revealed_to_community: true })
      refetchProfile()
    },
    onSuccess(res) {
      setSuccessModalVisible(true)
      refetchProfile()
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong!'}`)
    },
  })

  const formik = useFormik({
    initialValues: {
      [Fields?.name]: '',
      [Fields?.image]: '',
    },
    validateOnMount: true,
    validationSchema: signUpValidationSchema,
    onSubmit(values) {
      revealYourSelf({ name: values.name, image: values.image })
    },
  })

  useEffect(() => {
    if (currentUser) {
      formik.setFieldValue(Fields.name, currentUser.name)
      formik.setFieldValue(Fields.image, currentUser.userImage)
    }
  }, [currentUser])

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      })

      if (!result.canceled) {
        const url = result.assets[0].uri
        const fileExtension = url.split('.').pop()
        const destinationUri = `${FileSystem.documentDirectory}${Date.now()}.${fileExtension}`
        await FileSystem.moveAsync({
          from: url,
          to: destinationUri,
        })
        formik.setFieldValue(Fields.image, destinationUri)
      } else {
        toast.error('No image picked!', 'Please try again!')
      }
    } catch (error) {
      toast.error('Error uploading image', 'please try again!')
    }
  }

  const askUploadPermission = async () => {
    const { status = null } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status === 'granted') {
      setUploadPermission(true)
      pickImage()
    }
  }

  const handlePick = () => {
    if (uploadPermission) pickImage()
    else askUploadPermission()
  }

  const handleConfirm = () => {
    setSuccessModalVisible(false)
    navigation.goBack()
  }

  const { values } = formik

  return (
    <Block flex1>
      <NavigationBar
        button
        disableButton={!formik.values[Fields.name] || !formik.values[Fields.image]}
        title="Prepare Public Profile"
        onPressButton={formik.submitForm}
        buttonTitle={revealingYourself ? 'SAVING...' : 'SAVE'}
      />
      <SuccessModal visible={successModalVisible} onConfirm={handleConfirm} />
      <FormikProvider value={formik}>
        <ScrollView>
          <Block pH="xxxl" mT="xl">
            <Typography variation="descriptionRegular">
              Feel the freedom to reveal yourself in the chat when you&apos;re comfortable.
              It&apos;s your choice, and your privacy is always respected.
            </Typography>

            <Block mT="xl">
              <Typography variation="descriptionSemiBold">
                Preparing your public profile still keeps you anonymous.
              </Typography>
              <Block>
                <Block align="center" mV="xxxl">
                  {values.image ? (
                    <Image uri={formik.values.image} size={getSize(78)} circular />
                  ) : (
                    <Block
                      width={74}
                      height={74}
                      align="center"
                      rounded="6xl"
                      justify="center"
                      bgColor="gray200"
                      onPress={handlePick}>
                      <CameraIcon fill={theme.colors.gray200} />
                    </Block>
                  )}

                  <Typography
                    mT="md"
                    color="gray700"
                    onPress={handlePick}
                    variation="descriptionRegular">
                    Change Picture
                  </Typography>
                </Block>

                <Block mB="auto">
                  <FormikInput
                    name={Fields.name}
                    bgColor="white"
                    label="Name"
                    placeholder="Enter your name"
                  />
                  <Typography mT="md" color="black" variation="descriptionRegular">
                    You&apos;ll be shown as a therapist to the Yume Community
                  </Typography>
                </Block>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </FormikProvider>
    </Block>
  )
}

export default PreparePublicProfileScreen
