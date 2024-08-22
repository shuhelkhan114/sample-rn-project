import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import uuid from 'react-native-uuid'
import { Attachment } from 'stream-chat'
import {
  AutoCompleteInput,
  DefaultStreamChatGenerics,
  useMessageInputContext,
} from 'stream-chat-react-native'
import Block from '~/components/Block/Block'
import CameraIcon from '~/components/Icons/CameraIcon'

import {
  GiphyDialog,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  GiphyMedia,
} from '@giphy/react-native-sdk'
import GifIcon from '~/components/Icons/GifIcon'
import PaperPlanIcon from '~/components/Icons/PaperPlanIcon'
import PhotographIcon from '~/components/Icons/PhotographIcon'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getSize } from '~/core/utils/responsive'
import { useChat } from '~/hooks/useChat'
import useAppTheme from '~/hooks/useTheme'
import { CustomEvents } from '~/typings/chat'
import MessageImages, { MessageImage } from './MessageImages/MessageImages'

interface CustomInputProps {}

const CustomInput: React.FC<CustomInputProps> = () => {
  const { text, setText } = useMessageInputContext()
  const [sending, setSending] = useState(false)
  const [images, setImages] = useState<MessageImage[]>([])
  const { bottom } = useSafeAreaInsets()

  const { channel, chatClient, setChannel } = useChat()

  const theme = useAppTheme()

  const styles = useMemo(
    () =>
      StyleSheet.create({
        input: {
          width: '100%',
          maxHeight: 200,
          flex: 1,
          fontSize: getSize(14),
          paddingTop: theme.spacing.sm,
          paddingBottom: theme.spacing.sm,
        },
      }),
    [theme]
  )

  const handleSend = async (giphyMedia?: GiphyMedia | undefined) => {
    try {
      setSending(true)
      const messagesCount = channel?.state.messages.length || 0

      let attachments: Array<Attachment<DefaultStreamChatGenerics>> = []

      // upload images to stream chat if images exists
      if (images.length > 0) {
        const urls = await Promise.all(
          images.map(async (image) => channel?.sendImage(image.source))
        )
        attachments = urls.map((url) => ({
          type: 'image',
          asset_url: url?.file,
          thumb_url: url?.thumb_url || url?.file,
        }))
      }

      // attach giphy
      if (giphyMedia) {
        attachments = [...attachments, { type: 'gif', asset_url: giphyMedia.url }]
      }

      // If it's first message then send message request
      if (messagesCount < 1) {
        await channel?.updatePartial({
          set: { requestPending: true, requestedBy: chatClient?.userID },
        })

        // emitting event for realtime communication
        await channel?.sendEvent({
          type: CustomEvents.FirstMessage as any,
          requestedBy: chatClient?.userID,
        })

        // force resetting channel state as there are some issues with stream chat SDK as the time of writing this code
        if (channel) {
          if (Object.values(channel?.state.messages).length === 0) {
            const cId = channel.id
            const updatedChannel = await API.chat.getChannelById(cId as string)
            setChannel(null as any)
            setTimeout(() => {
              setChannel(updatedChannel)
            }, 0)
          }
        }
      }

      await channel?.sendMessage({
        text,
        ...(attachments.length > 0 && { attachments }),
      })

      if (images.length > 0) {
        setImages([])
      }

      if (text.length > 0) {
        setText('')
      }
      setSending(false)
    } catch (error) {
      toast.error('Error', 'Unable to send message, please try again!')
    }
  }

  const handleCaptureImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

      if (!permissionResult.granted) {
        throw new Error(
          'Camera permission denied, please update permission manually from settings app!'
        )
      }

      const result = await ImagePicker.launchCameraAsync()

      if (!result.canceled) {
        const url = result.assets[0].uri
        const fileExtension = url.split('.').pop()
        const destinationUri = `${FileSystem.documentDirectory}${Date.now()}.${fileExtension}`
        await FileSystem.moveAsync({
          from: url,
          to: destinationUri,
        })
        setImages([...images, { id: uuid.v4().toString(), source: destinationUri }])
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Error', error?.message)
      } else {
        toast.error('Error', 'Unexpected error has occurred!')
      }
    }
  }

  const handlePickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.7,
        aspect: [4, 3],
        selectionLimit: 10,
        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      })

      if (!result.canceled) {
        const localImages = await Promise.all(
          result.assets.map(async (asset) => {
            const url = asset.uri
            const fileExtension = url.split('.').pop()
            const destinationUri = `${FileSystem.documentDirectory}${uuid
              .v4()
              .toString()}.${fileExtension}`
            await FileSystem.moveAsync({
              from: url,
              to: destinationUri,
            })
            return destinationUri
          })
        )
        setImages([
          ...images,
          ...localImages.map((image) => ({
            source: image,
            id: uuid.v4().toString(),
          })),
        ])
      }
    } catch (error) {
      console.log(error)
      toast.error('Error uploading image', 'please try again!')
    }
  }

  const handleRemoveImage = (imageId: string) => {
    setImages((previousImages) => previousImages.filter((image) => image.id !== imageId))
  }

  useEffect(() => {
    const handler: GiphyDialogMediaSelectEventHandler = (event) => {
      handleSend(event.media)
      GiphyDialog.hide()
    }
    const listener = GiphyDialog.addListener(GiphyDialogEvent.MediaSelected, handler)
    return () => {
      listener.remove()
    }
  }, [])

  const sendButtonDisabled = useMemo(() => {
    if (text.trim() === '' && images.length < 1) {
      return true
    }
    return false
  }, [text, images])

  let sendContent: React.ReactNode

  if (sending) {
    sendContent = <ActivityIndicator />
  } else {
    sendContent = (
      <Block onPress={sendButtonDisabled ? undefined : async () => handleSend()}>
        <PaperPlanIcon fill={sendButtonDisabled ? theme.colors.gray400 : theme.colors.primary} />
      </Block>
    )
  }

  return (
    <Block bTW={1} pH="xl" pT="xxxl" bC="gray100" style={{ paddingBottom: bottom }}>
      <Block mB="md">
        <MessageImages images={images} onRemove={handleRemoveImage} />
      </Block>
      <Block align="flex-end" flexDirection="row">
        <Block flexDirection="row" flex1 align="center">
          <Block
            mR="md"
            width={24}
            height={24}
            rounded="4xl"
            align="center"
            justify="center"
            bgColor="gray100"
            onPress={handleCaptureImage}>
            <CameraIcon height={18} width={18} />
          </Block>
          <AutoCompleteInput additionalTextInputProps={{ multiline: true, style: styles.input }} />
        </Block>
        <Block pH="md" onPress={handlePickImages}>
          <PhotographIcon width={24} height={24} stroke={theme.colors.gray400} />
        </Block>
        <Block pR="md" onPress={() => GiphyDialog.show()}>
          <GifIcon />
        </Block>
        {sendContent}
      </Block>
    </Block>
  )
}

export default CustomInput
