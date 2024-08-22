import { useMutation } from '@tanstack/react-query'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useMemo, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import CameraIcon from '~/components/Icons/CameraIcon'
import ScanIcon from '~/components/Icons/ScanIcon'
import Image from '~/components/Image/Image'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getSize } from '~/core/utils/responsive'
import useAuth from '~/hooks/useAuth'
import { useChat } from '~/hooks/useChat'
import useAppTheme from '~/hooks/useTheme'
import { CustomEvents } from '~/typings/chat'

interface RevealUserProps {
  userId: string
  userName: string
  onSuccess: () => void
  onCancel: () => void
}

const RevealUser: React.FC<RevealUserProps> = (props) => {
  const { onSuccess, userName, userId, onCancel } = props

  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [uploadPermission, setUploadPermission] = useState(false)

  const theme = useAppTheme()
  const { refetchProfile, currentUser } = useAuth()
  const { channel } = useChat()

  useEffect(() => {
    if (currentUser.displayImage) {
      setImage(currentUser.userImage)
    }
    if (currentUser.displayName) {
      setName(currentUser.name)
    }
  }, [currentUser])

  const {
    isPending: revealingYourself,
    error: revealingError,
    mutateAsync: revealYourSelf,
  } = useMutation({
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
      })
      await API.user.revealYourSelf({ reveal_to_user_id: userId })
      await channel?.sendEvent({
        userName: name,
        userId: currentUser.id,
        userImage: imageUrl,
        type: CustomEvents.RevealUser as any,
      })
      refetchProfile()
    },
    onSuccess(res) {
      onSuccess()
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong!'}`)
    },
  })

  const styles = useMemo(
    () =>
      StyleSheet.create({
        input: {
          borderWidth: 1,
          borderRadius: 4,
          width: '100%',
          paddingVertical: theme.spacing.lg,
          borderColor: theme.colors.gray300,
          paddingHorizontal: theme.spacing.xl,
          fontSize: 14,
        },
      }),
    []
  )

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
        setImage(destinationUri)
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

  const handleReveal = () => {
    revealYourSelf({ name, image })
  }

  return (
    <Block align="center" pB="xl">
      <ScrollView pH="xs">
        <Typography mV="xl" variation="paragraphSemiBold">
          Show your true colors
        </Typography>
        <Typography variation="descriptionLight">
          Feel the freedom to reveal yourself to everyone when you&apos;re comfortable. It&apos;s
          your choice, and your privacy is always respected.
        </Typography>
        <Typography pT="xl" mB="xl" variation="descriptionLight">
          If you choose to reveal yourself you&apos;ll be seen as Jane Doe only by{' '}
          {currentUser.displayName}
        </Typography>

        <Block align="center" mV="xxxl">
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

          <Typography mT="md" color="gray700" onPress={handlePick} variation="descriptionRegular">
            Change Picture
          </Typography>
        </Block>

        <TextInput
          value={name}
          autoCapitalize="words"
          style={styles.input}
          onChangeText={setName}
          placeholder="Enter your full name"
        />

        <ErrorText error={revealingError} />

        <Button mT="xl" title="Cancel" variation="secondary" onPress={() => onCancel()} />

        <Button
          mT="xl"
          onPress={handleReveal}
          disabled={!name || !image}
          loading={revealingYourself}
          icon={<ScanIcon fill="#fff" />}
          title={`Reveal Yourself to ${userName}`}
        />
      </ScrollView>
    </Block>
  )
}

export default RevealUser
