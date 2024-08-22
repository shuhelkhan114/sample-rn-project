import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { customAlphabet } from 'nanoid/non-secure'
import { ChevronLeft } from 'react-native-feather'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import AudioCallIcon from '~/components/Icons/AudioCallIcon'
import CreateCheckInIcon from '~/components/Icons/CreateCheckInIcon'
import DotMenuIcon from '~/components/Icons/DotMenuIcon'
import RecoveryCoachInfoIcon from '~/components/Icons/RecoveryCoachInfoIcon'
import ScheduleCallIcon from '~/components/Icons/ScheduleCallIcon'
import VideoCallIcon from '~/components/Icons/VideoCallIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { SubscriptionPlan, UserRole } from '~/context/AuthContext'
import toast from '~/core/lib/toast'
import { revealedToUser } from '~/core/utils/common'
import { getSize } from '~/core/utils/responsive'
import useAuth from '~/hooks/useAuth'

import { useChat } from '~/hooks/useChat'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

interface ChatHeaderProps {
  userId: string
  username: string
  role: UserRole
  imageUrl: string
  isWithRecoveryCoach: boolean
  isWithFinancialManager: boolean
  bothRevealedEachOther: boolean
  onReveal: () => void
}

const ChatHeader: React.FC<ChatHeaderProps> = (props) => {
  const {
    userId,
    username,
    imageUrl,
    role,
    isWithRecoveryCoach,
    bothRevealedEachOther,
    isWithFinancialManager,
    onReveal,
  } = props

  const theme = useAppTheme()
  const { top } = useSafeAreaInsets()
  const { videoClient } = useChat()
  const { state, currentUser } = useAuth()
  const { chatClient } = useChat()

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.ChatScreen>>()

  const handleVideoCall = async () => {
    try {
      if (videoClient) {
        const callId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)()
        navigation.navigate(Screens.CallScreen, {
          callId,
          userId,
          mode: 'create',
        })
      } else {
        toast.error('Unable to initiate call', 'Please restart the app!')
      }
    } catch (error) {
      toast.error('Unable to initiate call', 'Please restart the app!')
    }
  }

  const handleAudioCall = async () => {
    try {
      if (videoClient) {
        const callId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)()
        navigation.navigate(Screens.CallScreen, {
          callId,
          userId,
          mode: 'create',
          type: 'audio',
        })
      } else {
        toast.error('Unable to initiate call', 'Please restart the app!')
      }
    } catch (error) {
      toast.error('Unable to initiate call', 'Please restart the app!')
    }
  }

  const handleCreateCheckIn = () => {
    navigation.navigate(Screens.CreateCheckinScreen)
  }

  const handleScheduleCall = () => {
    toast.show('In Progress', 'Work in Progress')
  }

  const handleViewCheckIn = () => {
    navigation.navigate(Screens.AllCheckInScreen)
  }

  const handleViewProfile = () => {
    navigation.navigate(Screens.PublicProfileScreen, { userId, role })
  }

  const handleReveal = () => {
    onReveal?.()
  }

  let callButtonsVisible = false

  if (state.role === UserRole.RecoveryCoach || bothRevealedEachOther) {
    callButtonsVisible = true
  } else if (isWithRecoveryCoach) {
    if (currentUser.subscription_plan === SubscriptionPlan.MonthlyCoach) {
      callButtonsVisible = true
    }
  } else if (isWithFinancialManager) {
    callButtonsVisible = true
  }

  return (
    <Block
      pV="xl"
      pH="xxxl"
      align="center"
      bgColor="white"
      flexDirection="row"
      justify="space-between"
      style={{ paddingTop: top }}>
      <Block flexDirection="row" align="center">
        <Block onPress={navigation.goBack}>
          <ChevronLeft fontSize={24} color={theme.colors.gray900} />
        </Block>

        <Block mL="xl" flexDirection="row" align="center">
          <Image circular size={getSize(30)} uri={imageUrl} onPress={handleViewProfile} />
          {role === UserRole.User && (
            <Typography mR="sm" mL="md" variation="descriptionSemiBold">
              {username}
            </Typography>
          )}

          {role === UserRole.RecoveryCoach && (
            <Menu>
              <MenuTrigger>
                <Block flexDirection="row" align="center">
                  <Typography mR="sm" mL="md" variation="descriptionSemiBold">
                    {username}
                  </Typography>
                  <RecoveryCoachInfoIcon />
                </Block>
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  width: '80%',
                  paddingVertical: theme.spacing.sm,
                  borderRadius: theme.rounded.xl,
                  marginTop: theme.spacing['4xl'],
                  marginLeft: theme.spacing.xl,
                }}>
                <MenuOption onSelect={handleViewProfile}>
                  <Typography pV="md" pH="xl" color="gray700" variation="smallLight">
                    Our coaches do not offer medical advice or treatment and are not licensed
                    therapists.
                  </Typography>
                </MenuOption>
              </MenuOptions>
            </Menu>
          )}

          {role === UserRole.FinancialManager && (
            <Block flexDirection="row" align="center">
              <Typography mR="sm" mL="md" variation="descriptionSemiBold">
                {username}
              </Typography>
            </Block>
          )}
        </Block>
      </Block>

      <Block flexDirection="row" align="center">
        {callButtonsVisible && (
          <Block flexDirection="row" align="center">
            <Block mR="xxl" onPress={handleVideoCall}>
              <VideoCallIcon />
            </Block>
            <Block mR="xxl" onPress={handleAudioCall}>
              <AudioCallIcon />
            </Block>
          </Block>
        )}

        <Menu>
          {!revealedToUser((chatClient?.user as any)?.yumeRevealedUser || [], userId) && (
            <MenuTrigger>
              <DotMenuIcon fill={theme.colors.gray500} />
            </MenuTrigger>
          )}

          <MenuOptions
            optionsContainerStyle={{
              paddingVertical: theme.spacing.sm,
              borderRadius: theme.rounded.xl,
              marginTop: theme.spacing.xxxl,
            }}>
            {true ||
              (isWithRecoveryCoach && role === UserRole.RecoveryCoach && (
                <>
                  <MenuOption onSelect={handleCreateCheckIn}>
                    <Block flexDirection="row" align="center" pV="md" pH="xl">
                      <CreateCheckInIcon />
                      <Typography mL="lg" variation="descriptionRegular">
                        Check In
                      </Typography>
                    </Block>
                  </MenuOption>
                  <MenuOption onSelect={handleScheduleCall}>
                    <Block flexDirection="row" align="center" pV="md" pH="xl">
                      <ScheduleCallIcon />
                      <Typography mL="lg" variation="descriptionRegular">
                        Schedule Call
                      </Typography>
                    </Block>
                  </MenuOption>
                </>
              ))}

            {isWithRecoveryCoach ? (
              <MenuOption onSelect={handleViewCheckIn}>
                <Typography pV="md" pH="xl" variation="descriptionRegular">
                  View check in
                </Typography>
              </MenuOption>
            ) : (
              <MenuOption onSelect={handleReveal}>
                <Typography pV="md" pH="xl" variation="descriptionRegular">
                  Reveal Yourself
                </Typography>
              </MenuOption>
            )}

            {currentUser.role === UserRole.RecoveryCoach && (
              <MenuOption onSelect={handleViewProfile}>
                <Typography pV="md" pH="xl" variation="descriptionRegular">
                  View Profile
                </Typography>
              </MenuOption>
            )}
          </MenuOptions>
        </Menu>
        <Block></Block>
      </Block>
    </Block>
  )
}

export default ChatHeader
