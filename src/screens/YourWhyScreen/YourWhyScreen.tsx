import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import CircularXIcon from '~/components/Icons/CircularXIcon'
import EditIcon from '~/components/Icons/EditIcon'
import UploadImageIcon from '~/components/Icons/UploadImageIcon'
import Image from '~/components/Image/Image'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { MainStackScreens, Screens } from '~/navigation/screens'

type YourWhyScreenProps = NativeStackScreenProps<MainStackScreens, Screens.YourWhyScreen>

export type YourWhyScreenPropsParams = undefined

const YourWhyScreen: React.FC<YourWhyScreenProps> = (props) => {
  const { refetchProfile, currentUser } = useAuth()
  const { bottom } = useSafeAreaInsets()
  const [image, setImage] = useState(currentUser?.reminder_image || '')
  const [edit, setEdit] = useState(!currentUser?.reminder_image && !currentUser?.reminder_text)
  const [reminderText, setReminderText] = useState<string>(currentUser?.reminder_text || '')
  const [uploadPermission, setUploadPermission] = useState(false)
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.HomeScreen>>()

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: async (params: { reminderText: string; image: string }) => {
      const { reminderText, image } = params
      let imageUrl = null
      if (image.startsWith('http')) {
        imageUrl = image
      } else {
        const { image_url } = await API.user.uploadImage(image)
        imageUrl = image_url
      }
      await API.user.updateProfile({
        reminder_text: reminderText,
        reminder_image: imageUrl,
      })
    },
    onSuccess(user) {
      refetchProfile()
      setEdit(false)
      navigation.navigate(Screens.HomeScreen)
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  const askUploadPermission = async () => {
    const { status = null } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status === 'granted') {
      setUploadPermission(true)
      pickImage()
    }
  }

  const handleSubmit = () => {
    updateProfile({ reminderText, image })
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
    if (edit) {
      if (uploadPermission) pickImage()
      else askUploadPermission()
    }
  }

  const handleEdit = () => {
    if (edit) {
      setImage(currentUser?.reminder_image as string)
      setReminderText(currentUser?.reminder_text as string)
    }
    setEdit(!edit)
  }

  return (
    <KeyboardView>
      <Block flex1 relative>
        <NavigationBar
          center
          title="Your Why"
          buttonTitle={
            currentUser?.reminder_image || currentUser?.reminder_text ? (
              <Block onPress={handleEdit}>
                {edit ? (
                  <CircularXIcon width={24} height={24} />
                ) : (
                  <EditIcon width={24} height={24} />
                )}
              </Block>
            ) : null
          }
        />

        <ScrollView>
          <Block mB="auto" mH="xxxl" pB={'xxxl'}>
            <Block rounded="xl" mV="xl">
              {image ? (
                <Image
                  flex1
                  height={350}
                  uri={image}
                  rounded="lg"
                  overflow="hidden"
                  onPress={handlePick}
                />
              ) : (
                <Block
                  bW={2}
                  mH="xxl"
                  bC="backgroundPrimary"
                  justify="center"
                  align="center"
                  pV="xxxl"
                  rounded="xl"
                  style={{
                    borderStyle: 'dashed',
                  }}
                  onPress={handlePick}>
                  <UploadImageIcon width={49} height={48} />
                  <Typography variation="paragraphRegular" color="black" mV="sm">
                    Upload Image
                  </Typography>
                  <Typography variation="descriptionRegular" color="gray500">
                    PNG, JPG, up to 10MB
                  </Typography>
                </Block>
              )}
            </Block>

            <Block pV="lg">
              <TextInput
                multiline
                editable={edit}
                selectTextOnFocus={edit}
                scrollEnabled={false}
                value={reminderText}
                placeholder="|  Add a personal message reminding yourself
                why you're on this journey to overcome
                gambling."
                style={{
                  fontSize: 16,
                  lineHeight: 28,
                  fontWeight: '400',
                }}
                onChangeText={(text) => setReminderText(text)}
              />
            </Block>
          </Block>
        </ScrollView>
        {edit && (
          <Block mH="xl" style={{ paddingBottom: bottom }}>
            <ErrorText error={error} />
            <Button
              mB="xl"
              title="Save"
              loading={isPending}
              onPress={handleSubmit}
              disabled={!reminderText || !image}
              variation={
                !reminderText ||
                !image ||
                (image === currentUser?.reminder_image &&
                  reminderText === currentUser?.reminder_text)
                  ? 'secondary'
                  : 'primary'
              }
            />
          </Block>
        )}
      </Block>
    </KeyboardView>
  )
}

export default YourWhyScreen
