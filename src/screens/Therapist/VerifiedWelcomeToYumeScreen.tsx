import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import EditIcon from '~/components/Icons/EditIcon'
import LogoIcon from '~/components/Icons/LogoIcons'
import UserIcon from '~/components/Icons/UserIcon'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { getSize } from '~/core/utils/responsive'
import { Screens } from '~/navigation/screens'

type VerifiedWelcomeToYumeScreenProps = NativeStackScreenProps<
  any,
  Screens.VerifiedWelcomeToYumeScreen
>

export type VerifiedWelcomeToYumeScreenParams = undefined

const VerifiedWelcomeToYumeScreen: React.FC<VerifiedWelcomeToYumeScreenProps> = (props) => {
  const { navigation } = props
  const [image, setImage] = useState(null)
  const [uploadPermission, setUploadPermission] = useState(false)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setImage((result as any)?.uri)
    }
  }

  const askUploadPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status === 'granted') {
      setUploadPermission(true)
      pickImage()
    }
  }
  return (
    <Block flex1>
      <NavigationBar />

      <Block flex1 mT="xl" pV="xxxl" pH="4xl">
        <Block align="center">
          <LogoIcon />
        </Block>
        <Typography center mT="sm" pV="sm" variation="title1Regular">
          Welcome to Yume
        </Typography>
        <Block align="center" mV="xxxl">
          <Block rounded="6xl">
            {image ? (
              <Image uri={image} size={getSize(78)} />
            ) : (
              //   <Image size={getSize(78)} source={require('~/assets/userProfile1.png')} />
              <Block rounded="6xl" bgColor="secondary" pV="xxxl" pH="xxxl">
                <UserIcon />
              </Block>
            )}

            <Block
              absolute
              bottom={-2}
              right={-1}
              shadow="sm"
              rounded="xxxl"
              bgColor="white"
              pV="sm"
              pH="sm"
              onPress={() => {
                if (uploadPermission) pickImage()
                else askUploadPermission()
              }}>
              <EditIcon />
            </Block>
          </Block>
        </Block>
        <Block mB="auto" align="center">
          <Block flexDirection="row" align="center">
            <Typography variation="title3SemiBold" mR="sm">
              Dr. Jake Lawland
            </Typography>
            <VerifiedAccountIcon />
          </Block>
          {/* <Typography>Verified Therapist</Typography> */}
          <Typography>Verified Recovery Coach</Typography>

        </Block>
        <Button
          title="Next"
          onPress={() => {
            navigation.navigate(Screens.TherapistResponsibilitiesScreen)
          }}
        />
      </Block>
    </Block>
  )
}

export default VerifiedWelcomeToYumeScreen
