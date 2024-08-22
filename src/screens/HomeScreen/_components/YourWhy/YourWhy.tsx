import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import PlusIcon2 from '~/components/Icons/PlusIcon2'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import useAuth from '~/hooks/useAuth'
import { MainStackScreens, Screens } from '~/navigation/screens'

function YourWhy() {
  const { currentUser } = useAuth()
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.HomeScreen>>()

  const redirectToWhyScreen = () => {
    navigation.navigate(Screens.YourWhyScreen)
  }

  return (
    <Block mV="xl" pH="xl">
      <Typography variation="title5SemiBold">My Why</Typography>
      {currentUser?.reminder_text && currentUser?.reminder_image ? (
        <Block mT="xl" shadow="sm" rounded="xl" bgColor="white" onPress={redirectToWhyScreen}>
          <Image
            flex1
            height={350}
            rounded="xl"
            overflow="hidden"
            uri={currentUser?.reminder_image}
          />
          <Typography color="gray600" mV="lg" pH="lg" variation="descriptionLight">
            {currentUser?.reminder_text.length > 90
              ? `${currentUser?.reminder_text.substring(0, 90)}...`
              : currentUser?.reminder_text}
          </Typography>
        </Block>
      ) : (
        <Block mT="xl" pH="md" pV="xl" shadow="sm" rounded="xl" align="center" bgColor="white">
          <Typography color="gray600" mT="md" variation="descriptionLight" maxWidth={300} center>
            Add your <Typography color="primary">&apos;why&apos;</Typography> : a meaningful photo
            or image, and a personal message reminding yourself why you&apos;re on this journey to
            overcome gambling.
          </Typography>
          <Block mT="xl" width={150}>
            <Button
              title="Add new"
              variation="secondary"
              onPress={redirectToWhyScreen}
              icon={<PlusIcon2 />}
            />
          </Block>
        </Block>
      )}
    </Block>
  )
}

export default YourWhy
