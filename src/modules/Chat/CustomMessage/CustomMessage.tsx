import { ImageGallery } from '@georstat/react-native-image-gallery'
import { useState } from 'react'
import Hyperlink from 'react-native-hyperlink'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Giphy } from 'stream-chat-react-native'
import Block from '~/components/Block/Block'
import CloseIcon from '~/components/Icons/CloseIcon'
import DotIcon from '~/components/Icons/DotIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { getSize } from '~/core/utils/responsive'
import { getTimeAgo } from '~/core/utils/time'
import { useChat } from '~/hooks/useChat'
import useAppTheme from '~/hooks/useTheme'

interface CustomMessageImage {
  thumbnailUrl?: string
  imageUrl?: string
}

interface CustomMessageGif {
  gifUrl?: string
}

interface CustomMessageProps {
  userId?: string
  username?: string
  userImage?: string
  message?: string
  createdAt?: string | Date
  images: CustomMessageImage[] | undefined
  gifs?: CustomMessageGif[]
}

const CustomMessage: React.FC<CustomMessageProps> = (props) => {
  const {
    userId,
    userImage,
    images = [],
    gifs = [],
    message = '',
    createdAt = 0,
    username = 'unknown_user',
  } = props

  const [imageGalleryVisible, setImageGalleryVisible] = useState(false)
  const [initialImageIndex, setInitialImageIndex] = useState(0)

  const theme = useAppTheme()
  const insets = useSafeAreaInsets()
  const { chatClient } = useChat()

  const isMyMessage = userId === chatClient?.userID

  const galleryImages = images?.map((image) => ({
    id: image.imageUrl,
    url: image.thumbnailUrl || (image.imageUrl as string),
    thumbUrl: image.thumbnailUrl || image.imageUrl,
  }))

  const GalleryHeader = () => {
    return (
      <Block
        pH="xxl"
        justify="flex-end"
        flexDirection="row"
        style={{ paddingTop: insets.top }}
        onPress={() => setImageGalleryVisible(false)}>
        <CloseIcon width={40} height={40} stroke="white" />
      </Block>
    )
  }

  const handleImagePress = (index: number) => {
    setInitialImageIndex(index)
    setTimeout(() => {
      setImageGalleryVisible(true)
    }, 0)
  }

  let imagePreview: React.ReactNode = null

  // TODO: find a better way to do this.
  if (images.length === 1) {
    imagePreview = (
      <Block
        mB="xs"
        pH="sm"
        pV="sm"
        rounded="md"
        bgColor="gray200"
        style={{ width: '100%', flex: 1 }}
        key={images[0].imageUrl}
        onPress={() => handleImagePress(0)}>
        <Image
          uri={images[0].thumbnailUrl || images[0].imageUrl}
          imageStyle={{
            borderRadius: 4,
            width: 200,
            height: 160,
          }}
        />
      </Block>
    )
  } else if (images.length === 2) {
    const [image1, image2] = images

    imagePreview = (
      <Block mB="xs" pH="sm" pV="sm" rounded="md" bgColor="gray200" flexDirection="row">
        <Image
          mR="sm"
          onPress={() => handleImagePress(0)}
          uri={image1.thumbnailUrl || image2.imageUrl}
          imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
        />
        <Image
          onPress={() => handleImagePress(1)}
          uri={image2.thumbnailUrl || image2.imageUrl}
          imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
        />
      </Block>
    )
  } else if (images.length === 3) {
    const [image1, image2, image3] = images

    imagePreview = (
      <Block mB="xs" pH="sm" pV="sm" rounded="md" bgColor="gray200">
        <Block flexDirection="row">
          <Image
            mR="sm"
            onPress={() => handleImagePress(0)}
            uri={image1.thumbnailUrl || image2.imageUrl}
            imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
          />
          <Image
            onPress={() => handleImagePress(1)}
            uri={image2.thumbnailUrl || image2.imageUrl}
            imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
          />
        </Block>
        <Image
          mT="sm"
          onPress={() => handleImagePress(3)}
          uri={image3.thumbnailUrl || image3.imageUrl}
          imageStyle={{ width: getSize(200), height: getSize(120), borderRadius: 4 }}
        />
      </Block>
    )
  } else if (images.length === 4) {
    const [image1, image2, image3, image4] = images

    imagePreview = (
      <Block mB="xs" pH="sm" pV="sm" rounded="md" bgColor="gray200">
        <Block flexDirection="row">
          <Image
            mR="sm"
            onPress={() => handleImagePress(0)}
            uri={image1.thumbnailUrl || image2.imageUrl}
            imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
          />
          <Image
            onPress={() => handleImagePress(1)}
            uri={image2.thumbnailUrl || image2.imageUrl}
            imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
          />
        </Block>
        <Block flexDirection="row">
          <Image
            mT="sm"
            onPress={() => handleImagePress(3)}
            uri={image3.thumbnailUrl || image3.imageUrl}
            imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
          />
          <Image
            mT="sm"
            onPress={() => handleImagePress(4)}
            uri={image4.thumbnailUrl || image4.imageUrl}
            imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
          />
        </Block>
      </Block>
    )
  } else if (images.length > 4) {
    const [image1, image2, image3, image4] = images

    imagePreview = (
      <Block mB="xs" pH="sm" pV="sm" rounded="md" bgColor="gray200">
        <Block flexDirection="row">
          <Image
            mR="sm"
            onPress={() => handleImagePress(0)}
            uri={image1.thumbnailUrl || image2.imageUrl}
            imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
          />
          <Image
            onPress={() => handleImagePress(1)}
            uri={image2.thumbnailUrl || image2.imageUrl}
            imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
          />
        </Block>
        <Block flexDirection="row">
          <Image
            mT="sm"
            onPress={() => handleImagePress(3)}
            uri={image3.thumbnailUrl || image3.imageUrl}
            imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
          />
          <Block onPress={() => handleImagePress(3)}>
            <Image
              mT="sm"
              uri={image4.thumbnailUrl || image4.imageUrl}
              imageStyle={{ width: getSize(100), height: getSize(120), borderRadius: 4 }}
            />
            <Block
              mT="sm"
              absolute
              top={0}
              left={0}
              zIndex={99}
              width={100}
              rounded="md"
              height={120}
              justify="center"
              align="center"
              style={{ backgroundColor: '#000000A0' }}>
              <Typography color="white" variation="title3Regular">
                +{images.length - 4}
              </Typography>
            </Block>
          </Block>
        </Block>
      </Block>
    )
  }

  let gifContent: React.ReactNode = null

  if (gifs.length > 0) {
    const url = gifs[0].gifUrl
    gifContent = <Giphy attachment={{ asset_url: gifs[0].gifUrl, thumb_url: url }} />
  }

  return (
    <Block justify="flex-end" flexDirection={isMyMessage ? 'row' : 'row-reverse'} pH="xl" mB="xl">
      {!!images?.[0] && (
        <ImageGallery
          images={galleryImages}
          isOpen={imageGalleryVisible}
          initialIndex={initialImageIndex}
          renderHeaderComponent={GalleryHeader}
          close={() => setImageGalleryVisible(false)}
        />
      )}
      <Block width={'85%'} justify="flex-end" flexDirection={isMyMessage ? 'row' : 'row-reverse'}>
        <Block justify="flex-end">
          {imagePreview}
          {gifContent}
          {message.length > 0 && (
            <Block bgColor={isMyMessage ? 'blue100' : 'gray100'} rounded="xl" pH="lg" pV="md">
              {!isMyMessage && (
                <Block flexDirection="row" align="center">
                  <Typography mR="md" variation="smallSemiBold">
                    {username}
                  </Typography>
                  <DotIcon />
                  <Typography mL="md" variation="smallRegular" color="gray600">
                    {getTimeAgo(new Date(createdAt))}
                  </Typography>
                </Block>
              )}

              {message.length > 0 && (
                <Hyperlink
                  linkDefault
                  linkStyle={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>
                  <Typography color="gray800" variation="paragraphRegular">
                    {message}
                  </Typography>
                </Hyperlink>
              )}
            </Block>
          )}
        </Block>
        <Block mH="md">
          <Image circular size={32} uri={userImage} />
        </Block>
      </Block>
    </Block>
  )
}

export default CustomMessage
