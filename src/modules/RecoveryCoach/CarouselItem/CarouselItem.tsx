import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import Block from '~/components/Block/Block'
import DoubleQuotationIcon from '~/components/Icons/DoubleQuotationIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import useAppTheme from '~/hooks/useTheme'

interface CarouselItemProps {
  imageUrl: string
  index: number
  title: string
  totalItems: number
  description: string
}

const CarouselItem: React.FC<CarouselItemProps> = (props) => {
  const { imageUrl, title, description } = props

  const theme = useAppTheme()

  const styles = useMemo(
    () =>
      StyleSheet.create({
        carouselImage: {
          borderRadius: 100,
        },
      }),
    [theme]
  )

  return (
    <Block relative align="center" mT="xxxl">
      <Block absolute left={0} top={28} zIndex={10}>
        <DoubleQuotationIcon />
      </Block>
      <Block absolute zIndex={10}>
        <Image size={60} uri={imageUrl} imageStyle={styles.carouselImage} />
      </Block>
      <Block rounded="xxxl" mT="5xl" pT="xxxl" pB="xl" pH="lg" bgColor="gray100">
        <Block flexDirection="row" justify="center">
          <Typography center variation="paragraphSemiBold">
            {title}
          </Typography>
          <Typography mL="sm" color="primary" center variation="paragraphRegular">
            (30)
          </Typography>
        </Block>
        <Typography center mT="sm" variation="descriptionLight" color="gray700">
          {description}
        </Typography>
      </Block>
    </Block>
  )
}

export default CarouselItem
