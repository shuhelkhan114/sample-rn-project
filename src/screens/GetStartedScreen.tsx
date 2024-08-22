import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import LogoIcon from '~/components/Icons/LogoIcons'
import Link from '~/components/Link/Link'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import CarouselItem from '~/modules/GetStarted/CarouselItem/CarouselItem'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

import { useMemo, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Modal from '~/components/Modal/Modal'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'

const carouselItems = [
  {
    id: '1',
    title: 'Reclaim lost time and money from gambling',
    imageSource: require('~/assets/carousel/photo1.jpeg'),
    description:
      "Save money and time every day you don't gamble. Track the difference it makes in your life and cherish more moments with those who love you.",
  },
  {
    id: '2',
    title: 'Yume Debt Relief',
    imageSource: require('~/assets/carousel/photo2.jpeg'),
    description:
      'Buried in gambling debt? We’ve got your back. With Yume, you could cut down your debt by up to 30-50%',
  },
  {
    id: '3',
    title: 'Expert Guidance',
    imageSource: require('~/assets/carousel/photo3.jpeg'),
    description:
      "Work with Addiction Recovery Coaches who've conquered gambling addiction and are trained to help you do the same",
  },
]

type GetStartedScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.GetStartedScreen>

export type GetStartedScreenParams = undefined

const GetStartedScreen: React.FC<GetStartedScreenProps> = (props) => {
  const { navigation } = props
  const { top } = useSafeAreaInsets()

  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const [safeEnvModalVisible, setSafeEnvModalVisible] = useState(false)

  const theme = useAppTheme()

  const styles = useMemo(
    () =>
      StyleSheet.create({
        dot: {
          width: getSize(8),
          height: getSize(8),
        },
      }),
    []
  )

  const handleChange = (index: number) => {
    setCurrentCarouselIndex(index)
  }

  const handleGetStarted = () => {
    setSafeEnvModalVisible(true)
  }

  const handleAgree = () => {
    setSafeEnvModalVisible(false)
    setTimeout(() => {
      navigation.navigate(Screens.SignUpScreen)
    }, 100)
  }

  const handleSignin = () => {
    navigation.navigate(Screens.SignInScreen)
  }

  // TODO: fix any type
  const renderItem: any = ({ item, index }: any) => (
    <CarouselItem
      index={index}
      title={item.title}
      imageSource={item.imageSource}
      description={item.description}
      totalItems={carouselItems.length}
    />
  )

  return (
    <Block flex1 justify="space-between" style={{ paddingTop: top }}>
      <ScrollView>
        <Modal visible={safeEnvModalVisible} onClose={setSafeEnvModalVisible}>
          <Typography mT="xxxl" variation="title4SemiBold">
            This is a safe environment
          </Typography>
          <Typography mT="xxxl" variation="paragraphLight" color="gray700">
            Welcome to Yume! Your privacy is our priority.{' '}
            <Typography variation="paragraphSemiBold">
              Your identity is visible only to your recovery coach.
            </Typography>{' '}
            Everyone else in our community sees you as anonymous. Feel secure as you start your
            journey with us.
          </Typography>
          <Button onPress={handleAgree} mT="xxxl" title="I understand that it's all confidential" />
        </Modal>

        <Block pV="4xl" align="center">
          <LogoIcon />
        </Block>

        <Carousel
          vertical={false}
          data={carouselItems}
          renderItem={renderItem}
          onSnapToItem={handleChange}
          itemWidth={Dimensions.get('screen').width}
          sliderWidth={Dimensions.get('screen').width}
        />

        <Pagination
          activeOpacity={1}
          dotStyle={styles.dot}
          inactiveDotOpacity={0.2}
          dotColor={theme.colors.primary}
          dotsLength={carouselItems.length}
          activeDotIndex={currentCarouselIndex}
          inactiveDotColor={theme.colors.primary}
        />
      </ScrollView>
      <Block pH="xl" mT="xxl" mB="xxl">
        <Button title="Get Started for Free" onPress={handleGetStarted} />
        <Block mV="xxl" flexDirection="row" align="center" justify="center">
          <Typography variation="paragraphRegular">Already have an account? </Typography>
          <Link color="primary" variation="paragraphSemiBold" onPress={handleSignin}>
            Sign in
          </Link>
        </Block>
      </Block>
    </Block>
  )
}

export default GetStartedScreen
