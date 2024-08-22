import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import Block from '~/components/Block/Block'
import PlusIcon from '~/components/Icons/PlusIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { getSize } from '~/core/utils/responsive'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

interface UserCardProps {}

const UserCard: React.FC<UserCardProps> = (props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.GetHelpScreen>>()
  const { currentUser } = useAuth()

  const theme = useAppTheme()

  return (
    <Block flexDirection="row" align="center" justify="space-between" pV="xl">
      <Image circular size={getSize(56)} uri={currentUser.displayImage} />

      <Block mL="md" flex1>
        <Typography variation="paragraphSemiBold">{currentUser.displayName}</Typography>
        <Typography variation="descriptionRegular" color="black">
          {currentUser.parent_addictions.map((addiction) => addiction.name).join(', ')}
        </Typography>
      </Block>

      <Block
        mT="md"
        pH="lg"
        pV="sm"
        rounded="md"
        // @ts-ignore
        onPress={() => navigation.navigate('CreateStack')}
        bgColor="backgroundPrimary"
        flexDirection="row"
        align="center">
        <PlusIcon fill={theme.colors.primary} />
        <Typography mL="sm" color="primary" variation="paragraphRegular">
          Post
        </Typography>
      </Block>
    </Block>
  )
}

export default UserCard
