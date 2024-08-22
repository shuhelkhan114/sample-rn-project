import Block from '~/components/Block/Block'
import CloseIcon from '~/components/Icons/CloseIcon'
import Image from '~/components/Image/Image'
import ScrollView from '~/components/ScrollView/ScrollView'
import { getSize } from '~/core/utils/responsive'

export interface MessageImage {
  id: string
  source: string
}

interface MessageImagesProps {
  images: MessageImage[]
  onRemove: (imageId: string) => void
}

const MessageImages: React.FC<MessageImagesProps> = (props) => {
  const { images = [], onRemove } = props

  if (images.length < 1) {
    return null
  }

  return (
    <Block>
      <ScrollView pT="lg" horizontal>
        {images.map((image) => {
          return (
            <Block key={image.id} mR="lg">
              <Image size={60} imageStyle={{ borderRadius: getSize(4) }} uri={image.source} />
              <Block
                bW={1}
                pH="sm"
                pV="sm"
                absolute
                top={-8}
                right={-8}
                shadow="sm"
                bC="gray100"
                rounded="6xl"
                bgColor="white"
                onPress={() => onRemove(image.id)}>
                <CloseIcon height={12} width={12} />
              </Block>
            </Block>
          )
        })}
      </ScrollView>
    </Block>
  )
}

export default MessageImages
