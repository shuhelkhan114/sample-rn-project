import { useMutation } from '@tanstack/react-query'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { Fragment, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import Block from '~/components/Block/Block'
import EditIcon from '~/components/Icons/EditIcon'
import Image from '~/components/Image/Image'
import Modal from '~/components/Modal/Modal'
import { UserRole } from '~/context/AuthContext'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import SelectAvatar from '~/modules/Auth/SelectAvatar/SelectAvatar'

interface UserImageProps {}

const UserImage: React.FC<UserImageProps> = (props) => {
  const { currentUser, refetchProfile } = useAuth()

  const [uploadPermission, setUploadPermission] = useState(false)
  const [allAvatarModalVisible, setAllAvatarModalVisible] = useState(false)

  const { isPending: updatingImage, mutateAsync: updateImage } = useMutation({
    mutationFn: async (image: string) => {
      if (currentUser.role === UserRole.User) {
        const { image_url } = await API.user.uploadImage(image)
        if (currentUser.revealed_to_community) {
          await API.user.updateProfile({
            user_image: image_url,
          })
        } else {
          await API.user.updateProfile({
            avatar_image: image_url,
          })
        }
      } else if (currentUser.role === UserRole.RecoveryCoach) {
        const { image_url } = await API.recoveryCoach.uploadImage(image)
        await API.recoveryCoach.updateProfile({
          user_image: image_url,
        })
      }

      refetchProfile()
    },
    onSuccess() {
      toast.success('Success', 'Profile picture updated successfully!')
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong!'}`)
    },
  })

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

        updateImage(destinationUri)
      } else {
        toast.error('No image picked!', 'Please try again!')
      }
    } catch (error) {
      toast.error('Error picking image', 'Please try again!')
    }
  }

  const askUploadPermission = async () => {
    const { status = null } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status === 'granted') {
      setUploadPermission(true)
      pickImage()
    }
  }

  const handleUpdateAvatar = () => {
    if (currentUser.role === 'user' && !currentUser.revealed_to_community) {
      setAllAvatarModalVisible(true)
    } else {
      if (uploadPermission) pickImage()
      else askUploadPermission()
    }
  }

  const handleAvatarSelect = (e: string) => {
    updateImage(e)
    setAllAvatarModalVisible(false)
  }

  return (
    <Block relative onPress={handleUpdateAvatar}>
      <Modal visible={allAvatarModalVisible} onClose={setAllAvatarModalVisible}>
        <SelectAvatar onSelect={handleAvatarSelect} />
      </Modal>
      {updatingImage ? (
        <ActivityIndicator />
      ) : (
        <Fragment>
          <Image circular size={77} uri={currentUser.displayImage} />
          <Block
            pV="sm"
            pH="sm"
            absolute
            right={0}
            shadow="sm"
            bottom={-1}
            rounded="xxxl"
            bgColor="white">
            <EditIcon />
          </Block>
        </Fragment>
      )}
    </Block>
  )
}

export default UserImage
