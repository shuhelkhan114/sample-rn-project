import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import Block from '~/components/Block/Block'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'

interface CarouselItemProps {
  imageSource: any
  index: number
  title: string
  totalItems: number
  description: string
}

const CarouselItem: React.FC<CarouselItemProps> = (props) => {
  const { imageSource, title, description } = props

  const theme = useAppTheme()

  const styles = useMemo(
    () =>
      StyleSheet.create({
        carouselImage: {
          width: '100%',
          height: getSize(205),
          borderRadius: 15,
        },
      }),
    [theme]
  )

  return (
    <Block pH="4xl">
      <Image source={imageSource} imageStyle={styles.carouselImage} />
      <Typography center mT="xl" variation="title3SemiBold" color="gray900">
        {title}
      </Typography>
      <Typography center mT="xl" variation="paragraphRegular" color="gray700">
        {description}
      </Typography>
    </Block>
  )
}

export default CarouselItem
