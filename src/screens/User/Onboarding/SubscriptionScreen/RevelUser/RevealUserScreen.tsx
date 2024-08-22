import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { FormikProvider, useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import CameraIcon from '~/components/Icons/CameraIcon'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import Modal from '~/components/Modal/Modal'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import FormikInput from '~/components/formik/FormikInput/FormikInput'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getSize } from '~/core/utils/responsive'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { MainStackScreens, Screens } from '~/navigation/screens'

enum Fields {
  name = 'name',
  background = 'background',
  // TODO: remove this field, we no longer need this
  additional_info = 'additional_info',
  // TODO: remove this field, we no longer need this
  resources = 'resources',
}

const revealValidationSchema = Yup.object().shape({
  [Fields.name]: Yup.string().required('Name is required'),
  [Fields.background]: Yup.string(),
  [Fields.additional_info]: Yup.string(),
  [Fields.resources]: Yup.string(),
})

type RevealUserScreenProps = NativeStackScreenProps<
  AuthStackScreens | MainStackScreens,
  Screens.RevealUserScreen
>

export type RevealUserScreenParams = {
  recoveryCoachId?: string
  setRevealModalVisible?: React.Dispatch<React.SetStateAction<boolean>>
  from: any
}

const RevealUserScreen: React.FC<RevealUserScreenProps> = (props) => {
  const { route, navigation } = props
  const { from, recoveryCoachId } = route.params

  const [image, setImage] = useState('')
  const [scheduleCallModalVisible, setScheduleCallModalVisible] = useState(false)

  const [uploadPermission, setUploadPermission] = useState(false)
  const { currentUser, state } = useAuth()
  const { bottom } = useSafeAreaInsets()

  const theme = useAppTheme()
  const { refetchProfile } = useAuth()

  const { isPending: updatingProfile, mutateAsync: updateProfile } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
    },
  })

  const {
    isPending: revealingYourself,
    error: revealingError,
    mutateAsync: revealYourSelf,
  } = useMutation({
    mutationFn: async (params: {
      name: string
      background: string
      additional_info: string
      resources: string
    }) => {
      const { name, background, additional_info, resources } = params
      let imageUrl = null
      if (!image.startsWith('http')) {
        const { image_url } = await API.user.uploadImage(image)
        imageUrl = image_url
      }
      await updateProfile({
        name,
        user_image: imageUrl,
        background,
        additional_info,
        resources,
      })
      await API.user.revealYourSelf({ reveal_to_user_id: recoveryCoachId })
    },
    onSuccess(res) {
      refetchProfile()
      setScheduleCallModalVisible(true)
    },
    onError(error: any) {
      toast.error('Profile', error?.message || 'Something went wrong!')
    },
  })

  useEffect(() => {
    setImage(currentUser.userImage)
  }, [currentUser])

  // TODO: create a reusable component
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      })

      if (!result.canceled) {
        const file = result.assets[0]
        if (file) {
          // make sure the file size is not more than 20 mb
          if (file.fileSize && file.fileSize > 20 * 1024 * 1024) {
            toast.error('Image size too large', 'Please select an image less than 20mb')
          } else {
            const url = result.assets[0].uri
            const fileExtension = url.split('.').pop()
            const destinationUri = `${FileSystem.documentDirectory}${Date.now()}.${fileExtension}`
            await FileSystem.moveAsync({
              from: url,
              to: destinationUri,
            })
            setImage(destinationUri)
          }
        } else {
          toast.error('No image picked!', 'Please try again!')
        }
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
    } else {
      toast.error('Permission denied', 'Please allow permission from settings')
    }
  }

  const handlePick = () => {
    if (uploadPermission) pickImage()
    else askUploadPermission()
  }

  const handleBookCall = async () => {
    setScheduleCallModalVisible(false)

    navigation.navigate(Screens.ScheduleCallScreen, {
      link: state.user?.recovery_coach?.calendly_link as string,
    })
  }

  const formik = useFormik({
    initialValues: {
      [Fields.name]: currentUser.name || '',
      [Fields.background]: currentUser.background || '',
      [Fields.additional_info]: currentUser.resources || '',
      [Fields.resources]: currentUser.additional_info || '',
    },
    validateOnMount: true,
    validationSchema: revealValidationSchema,
    onSubmit: async (values) => {
      revealYourSelf({
        background: values.background || ' ',
        name: values.name || ' ',
        resources: values.resources || ' ',
        additional_info: values.additional_info || ' ',
      })
    },
  })

  const handleSkip = () => {
    navigation.navigate(Screens.CongratulationsScreen, {
      from,
    })
    setScheduleCallModalVisible(false)
  }

  return (
    <Block flex1 style={{ paddingBottom: bottom }}>
      <NavigationBar />
      <KeyboardView>
        <ScrollView>
          <Modal visible={scheduleCallModalVisible} onClose={setScheduleCallModalVisible}>
            <Block mT="xl">
              <Block mV="xl" bW={1} shadow="sm" rounded="xl" bC="gray100" bgColor="white">
                <Block relative>
                  <Block justify="center" align="center">
                    <Image uri={state.user?.recovery_coach?.user_image} width={200} height={200} />
                  </Block>
                </Block>
                <Block pH="xxl" pB="xxl" pT="md">
                  <Block flexDirection="row" justify="space-between" align="center">
                    <Typography
                      variation="paragraphSemiBold"
                      style={{ textTransform: 'capitalize' }}>
                      {state.user?.recovery_coach?.name}
                    </Typography>
                    <Block flexDirection="row" align="center">
                      <VerifiedAccountIcon width={16} height={16} />
                      <Typography mL="sm" color="primary" variation="smallRegular">
                        Verified Recovery Counsellor
                      </Typography>
                    </Block>
                  </Block>

                  <Block>
                    <Typography mR="sm" variation="descriptionRegular" flex1>
                      {(state.user?.recovery_coach?.parent_addictions || [])
                        .map((addiction) => addiction.name)
                        .join(', ')}{' '}
                    </Typography>
                  </Block>
                </Block>
              </Block>
              <Typography pH="xl" center mT="xxxl" variation="descriptionLight">
                Book your first session with {state.user?.recovery_coach?.name} carter and start
                your recovery journey
              </Typography>
              <Button
                loading={updatingProfile}
                mT="xxxl"
                title="Schedule Call"
                onPress={handleBookCall}
              />
              <Block mT="lg" pV="xl" pH="xl" onPress={handleSkip}>
                <Typography center color="primary" variation="paragraphSemiBold">
                  Skip for now
                </Typography>
              </Block>
            </Block>
          </Modal>
          <Block pH="xxxl">
            <Typography variation="paragraphSemiBold">
              Share your identity with Recovery Coach
            </Typography>

            <Block
              mT="xxxl"
              flexDirection="row"
              pL="xl"
              pV="lg"
              pR="lg"
              bgColor="yellow100"
              rounded="lg">
              <Image size={getSize(16)} source={require('~/assets/iIcon.png')} />
              <Typography mL="lg" variation="descriptionRegular">
                You are still anonymous. Your identity is only revealed to your Recovery Coach who
                has a confidentiality agreement
              </Typography>
            </Block>

            <FormikProvider value={formik}>
              <Block align="center" mV="xxxl" onPress={handlePick}>
                {image ? (
                  <Image uri={image} size={getSize(78)} circular />
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

              <FormikInput
                name={Fields.name}
                bgColor="white"
                label="Full Name"
                placeholder="Enter"
                mB="xxxl"
              />
              <FormikInput
                name={Fields.background}
                bgColor="white"
                label="Background of addiction"
                placeholder="Enter"
                mB="xxxl"
              />
              <ErrorText error={revealingError} />
              <Block pB={'xl'}>
                <Button
                  disabled={!image || !formik.isValid}
                  variation={image && formik.isValid ? 'primary' : 'secondary'}
                  loading={revealingYourself}
                  title="Save"
                  onPress={formik.submitForm}
                />
              </Block>
            </FormikProvider>
          </Block>
        </ScrollView>
      </KeyboardView>
    </Block>
  )
}

export default RevealUserScreen
