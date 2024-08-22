import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import MessageIcon2 from '~/components/Icons/MessageIcon2'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { getImageUrl, getName } from '~/core/utils/common'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

interface MemberListCardProps {
  member: any
}

const MemberListCard: React.FC<MemberListCardProps> = (props) => {
  const { member } = props
  const theme = useAppTheme()
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.MembersListScreen>>()

  const handleProfilePress = () => {
    navigation.navigate(Screens.PublicProfileScreen, {
      userId: member.id,
      role: member?.data?.yumeRole,
    })
  }

  return (
    <Block pT={48} onPress={handleProfilePress}>
      <Block relative shadow="sm" pT="xl" pH="xl" bgColor="white" rounded="xl" pB="xl">
        <Block absolute top={-25} left={16}>
          <Image
            circular
            size={getSize(60)}
            uri={
              getImageUrl(member?.data) ||
              'https://st3.depositphotos.com/14903220/37662/v/450/depositphotos_376629516-stock-illustration-avatar-men-graphic-sign-profile.jpg'
            }
          />
        </Block>
        <Block align="flex-end" height={40}>
          <MessageIcon2 fill={theme.colors.secondary} />
        </Block>

        <Block>
          <Block flexDirection="row" align="center">
            <Typography variation="paragraphBold" capitalize>
              {getName(member?.data)}
            </Typography>
            {Boolean(member?.data?.yumeGender) && Boolean(member?.data?.yumeAge) && (
              <Block pV="xs" pH="md" rounded="lg" mL="md" bgColor="primary">
                <Typography variation="descriptionSemiBold" color="white" capitalize>
                  {member?.data?.yumeGender?.slice(0, 1)} - {member?.data?.yumeAge}
                </Typography>
              </Block>
            )}
          </Block>
          {Boolean(member?.data?.yumeBio) && (
            <Typography style={{ fontStyle: 'italic' }} mT="md">
              {member?.data?.yumeBio}
            </Typography>
          )}
        </Block>
      </Block>
    </Block>
  )
}

export default MemberListCard
