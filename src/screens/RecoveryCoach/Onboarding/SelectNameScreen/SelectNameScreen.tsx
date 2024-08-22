import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useContext, useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import EditIcon from '~/components/Icons/EditIcon'
import Image from '~/components/Image/Image'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { AuthContext } from '~/context/AuthContext'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type RecoveryCoachSelectNameScreenProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.RecoveryCoachSelectNameScreen
>

export type RecoveryCoachSelectNameScreenParams = undefined

// TODO: use formik

const RecoveryCoachSelectNameScreen: React.FC<RecoveryCoachSelectNameScreenProps> = (props) => {
  const { navigation } = props
  const { state } = useContext(AuthContext)
  const [name, setName] = useState<string>('')
  const [image, setImage] = useState('')
  const [uploadPermission, setUploadPermission] = useState(false)

  const { bottom } = useSafeAreaInsets()
  const { refetchProfile } = useAuth()

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: async (params: { name: string; image: string }) => {
      const { name, image } = params
      let imageUrl = null
      if (image.startsWith('http')) {
        imageUrl = image
      } else {
        const { image_url } = await API.recoveryCoach.uploadImage(image)
        imageUrl = image_url
      }
      await API.recoveryCoach.updateProfile({
        name,
        user_image: imageUrl,
      })
    },
    onSuccess(user) {
      refetchProfile()
      navigation.navigate(Screens.RecoveryCoachDOBSelectionScreen)
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  useEffect(() => {
    setName(state?.recoveryCoach?.name || '')
    setImage(state?.recoveryCoach?.user_image || '')
  }, [state?.recoveryCoach])

  const askUploadPermission = async () => {
    const { status = null } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status === 'granted') {
      setUploadPermission(true)
      pickImage()
    }
  }

  const handleSubmit = () => {
    updateProfile({ name, image })
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [6, 1],
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
        setImage(destinationUri)
      } else {
        toast.error('No image picked!', 'Please try again!')
      }
    } catch (error) {
      toast.error('Error uploading image', 'please try again!')
    }
  }

  const handlePick = () => {
    if (uploadPermission) pickImage()
    else askUploadPermission()
  }

  return (
    <KeyboardView>
      <Block flex1>
        <NavigationBar />
        <Block flex1 mH="xl">
          <Typography variation="title3SemiBold">Name</Typography>

          <Block mT="xxxl" mH="md" mB="auto">
            <Block align="center">
              <Block onPress={handlePick} rounded="6xl">
                <Image
                  circular
                  size={80}
                  uri={
                    image ||
                    'https://st3.depositphotos.com/14903220/37662/v/450/depositphotos_376629516-stock-illustration-avatar-men-graphic-sign-profile.jpg'
                  }
                />
                <Block
                  absolute
                  bottom={-1}
                  right={0}
                  shadow="sm"
                  rounded="xxxl"
                  bgColor="white"
                  pV="sm"
                  pH="sm">
                  <EditIcon />
                </Block>
              </Block>
            </Block>

            <Block mT="4xl">
              <Typography variation="descriptionRegular">Name</Typography>
              <Block
                bC="gray400"
                bW={1}
                rounded="lg"
                flexDirection="row"
                align="center"
                pV="md"
                pL="lg"
                pR="lg"
                mT="sm">
                <TextInput
                  style={{ flex: 1 }}
                  value={name}
                  autoCapitalize="words"
                  onChangeText={(text) => setName(text)}
                />
              </Block>
            </Block>
          </Block>

          <Block style={{ paddingBottom: bottom }}>
            <ErrorText error={error} />
            <Button
              mB="xl"
              title="Next"
              loading={isPending}
              onPress={handleSubmit}
              disabled={!name || !image}
              variation={!name ? 'secondary' : 'primary'}
            />
          </Block>
        </Block>
      </Block>
    </KeyboardView>
  )
}

export default RecoveryCoachSelectNameScreen
