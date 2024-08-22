import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import LogoIcon from '~/components/Icons/LogoIcons'
import Image from '~/components/Image/Image'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { getSize } from '~/core/utils/responsive'
import { Screens } from '~/navigation/screens'

type SupportCommunityScreenProps = NativeStackScreenProps<any, Screens.SupportCommunityScreen>

export type SupportCommunityScreenParams = undefined

const SupportCommunityScreen: React.FC<SupportCommunityScreenProps> = (props) => {
  //   const { navigation } = props

  return (
    <Block flex1>
      <NavigationBar />

      <Block flex1 mT="xl" pV="xxxl" mH="4xl">
        <Block align="center">
          <LogoIcon />
        </Block>
        <Typography center mT="sm" pV="sm" variation="title1Regular">
          Welcome to Yume
        </Typography>
        <Block>
          <Typography variation="title2Regular" mV="xxxl" center>
            The largest addiction support community in the world
          </Typography>
        </Block>

        <Block mB="auto">
          <Block
            shadow="sm"
            pV="lg"
            flexDirection="row"
            align="center"
            style={{ flexWrap: 'wrap' }}>
            <Block relative>
              <Image size={getSize(64)} source={require('~/assets/communityImage1.png')} />
            </Block>
            <Block mL="xl" flex1>
              <Typography variation="descriptionSemiBold">Your practice your price</Typography>
              <Typography variation="paragraphRegular">
                At Yume you decide how much to charge patients for an appointment
              </Typography>
            </Block>
          </Block>
          <Block
            shadow="sm"
            pV="lg"
            flexDirection="row"
            align="center"
            style={{ flexWrap: 'wrap' }}>
            <Block relative>
              <Image size={getSize(64)} source={require('~/assets/communityImage1.png')} />
            </Block>
            <Block mL="xl" flex1>
              <Typography variation="descriptionSemiBold">Tens of thousands of people</Typography>
              <Typography variation="paragraphRegular">
                Offer support to a community in need and gain loyal patients.
              </Typography>
            </Block>
          </Block>
          <Block
            shadow="sm"
            pV="lg"
            flexDirection="row"
            align="center"
            style={{ flexWrap: 'wrap' }}>
            <Block relative>
              <Image size={getSize(64)} source={require('~/assets/communityImage1.png')} />
            </Block>
            <Block mL="xl" flex1>
              <Typography variation="descriptionSemiBold">Have meaning at work</Typography>
              <Typography variation="paragraphRegular">
                Offer support to a community in need and gain loyal patients.
              </Typography>
            </Block>
          </Block>
        </Block>

        <Button title="Join Now: $29.99 a month" onPress={() => {}} />
      </Block>
    </Block>
  )
}

export default SupportCommunityScreen
