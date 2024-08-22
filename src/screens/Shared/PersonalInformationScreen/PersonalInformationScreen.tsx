import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ChevronLeft } from 'react-native-feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { UserRole } from '~/context/AuthContext'
import { getStateName } from '~/core/utils/state'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

type PersonalInformationScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.PersonalInformationScreen
>

export type PersonalInformationScreenParams = undefined

const PersonalInformationScreen: React.FC<PersonalInformationScreenProps> = (props) => {
  const { navigation } = props
  const { top, bottom } = useSafeAreaInsets()
  const theme = useAppTheme()

  const { currentUser } = useAuth()

  const handleEdit = () => {
    navigation.navigate(Screens.UpdatePersonalInformationScreen)
  }

  return (
    <KeyboardView>
      <Block flex1>
        <Block
          pV="xl"
          pH="xl"
          align="center"
          bgColor="white"
          flexDirection="row"
          justify="space-between"
          style={{ paddingTop: top }}>
          <Block flexDirection="row" align="center" justify="space-between" flex1>
            <Block onPress={navigation.goBack}>
              <ChevronLeft fontSize={24} color={theme.colors.gray900} />
            </Block>

            <Typography mL="md" variation="title6SemiBold">
              Personal Information
            </Typography>
            <Block opacity={0}>
              <ChevronLeft fontSize={24} color={theme.colors.white} />
            </Block>
          </Block>
        </Block>

        <ScrollView pH="xxl">
          {currentUser.name && (
            <Block>
              <Typography mT="xl" variation="paragraphRegular">
                Name
              </Typography>
              <Typography mT="sm" variation="paragraphRegular" color="gray500">
                {currentUser.name || 'N/A'}
              </Typography>
            </Block>
          )}

          {currentUser.username && (
            <Block>
              <Typography mT="xl" variation="paragraphRegular">
                Username
              </Typography>
              <Typography mT="sm" variation="paragraphRegular" color="gray500">
                @{currentUser.username || 'N/A'}
              </Typography>
            </Block>
          )}

          <Typography mT="xl" variation="paragraphRegular">
            Email
          </Typography>
          <Typography mT="sm" variation="paragraphRegular" color="gray500">
            {currentUser.email || 'N/A'}
          </Typography>

          <Typography mT="xl" variation="paragraphRegular">
            Birthday
          </Typography>
          <Typography mT="sm" variation="paragraphRegular" color="gray500">
            {currentUser.dateOfBirth
              ? new Date(currentUser.dateOfBirth).toDateString().substring(4)
              : 'N/A'}
          </Typography>

          <Typography mT="xl" variation="paragraphRegular">
            Gender
          </Typography>
          <Typography mT="sm" capitalize variation="paragraphRegular" color="gray500">
            {currentUser.gender}
          </Typography>

          <Typography mT="xl" variation="paragraphRegular">
            State
          </Typography>
          <Typography mT="sm" variation="paragraphRegular" color="gray500">
            {getStateName(currentUser.state)}
          </Typography>
          {currentUser?.user_bio && (
            <Block>
              <Typography mT="xl" variation="paragraphRegular">
                Story
              </Typography>
              <Typography mT="sm" variation="paragraphRegular" color="gray500">
                {currentUser.user_bio}
              </Typography>
            </Block>
          )}
          {currentUser?.calendly_link && currentUser.role === UserRole.RecoveryCoach && (
            <Block>
              <Typography mT="xl" variation="paragraphRegular">
                Calendly link
              </Typography>
              <Typography mT="sm" variation="paragraphRegular" color="gray500">
                {currentUser.calendly_link}
              </Typography>
            </Block>
          )}
        </ScrollView>
        <Block
          pV="xl"
          pH="xl"
          align="center"
          bgColor="white"
          flexDirection="row"
          justify="space-between"
          style={{ paddingBottom: bottom }}>
          <Button variation="primary" title="Edit" onPress={handleEdit} />
        </Block>
      </Block>
    </KeyboardView>
  )
}

export default PersonalInformationScreen
