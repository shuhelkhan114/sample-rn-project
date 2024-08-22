import Block from '~/components/Block/Block'
import ExclamationIcon from '~/components/Icons/ExclamationIcon'
import PhotographIcon from '~/components/Icons/PhotographIcon'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { UserRole } from '~/context/AuthContext'
import { getSize } from '~/core/utils/responsive'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'

interface ChannelRowProps {
  userImage?: string
  userName?: string
  lastMessage?: string
  isRequest?: boolean
  isTyping?: boolean
  isOnline?: boolean
  onPress?: () => void
  hasSubscribed?: boolean
  isLastMessageSeen?: boolean
  isLastMessageMine?: boolean
  lastMessageHasImage: boolean
}

const ChannelRow: React.FC<ChannelRowProps> = (props) => {
  const {
    userImage = '',
    userName = 'Unknown User',
    lastMessage = '',
    isRequest = false,
    isTyping = false,
    isOnline = false,
    isLastMessageSeen = false,
    hasSubscribed = false,
    lastMessageHasImage = false,
    isLastMessageMine = false,
    onPress,
  } = props

  const theme = useAppTheme()
  const { currentUser } = useAuth()

  let messageContent: React.ReactNode = null

  if (isTyping) {
    messageContent = (
      <Typography color="primary" variation="smallRegular">
        Typing...
      </Typography>
    )
  } else {
    let message = ''
    if (lastMessage) {
      // is last message is mine then prepend You:
      if (isLastMessageMine) {
        // if there is no message and only image
        if (lastMessage?.trim().length < 1) {
          message = 'You: sent an image'
        } else {
          message = `You: ${lastMessage}`
        }
      } else {
        if (lastMessage?.trim().length < 1) {
          message = 'Sent an image'
        } else {
          message = lastMessage
        }
      }
    } else {
      if (lastMessageHasImage) {
        message = 'Sent a media'
      } else {
        message = 'No message yet!'
      }
    }

    messageContent = (
      <Block flexDirection="row" align="center">
        {lastMessageHasImage && (
          <Block mR="sm">
            <PhotographIcon
              width={16}
              height={16}
              stroke={!isLastMessageSeen ? theme.colors.gray900 : theme.colors.gray400}
            />
          </Block>
        )}
        <Typography
          numberOfLines={1}
          color={!isLastMessageSeen ? 'gray900' : 'gray400'}
          variation={!isLastMessageSeen ? 'smallSemiBold' : 'smallRegular'}>
          {message}
        </Typography>
      </Block>
    )
  }

  return (
    <Block
      pV="lg"
      pH="lg"
      mB="lg"
      bgColor="white"
      rounded="lg"
      shadow="sm"
      flexDirection="row"
      align="center"
      justify="space-between"
      onPress={onPress}>
      <Block flexDirection="row">
        <Block>
          <Image circular size={getSize(50)} uri={userImage} />
          {isOnline && (
            <Block
              absolute
              bottom={0}
              width={12}
              height={12}
              right={0}
              shadow="sm"
              rounded="xxxl"
              bW={1}
              bC="white"
              bgColor="positive"
            />
          )}
        </Block>
        <Block mL="lg" flex1 justify="center">
          <Block flexDirection="row" align="center" justify="space-between">
            <Typography flex1 variation="descriptionSemiBold">
              {userName}
            </Typography>

            {currentUser.role === UserRole.RecoveryCoach && (
              <Block flexDirection="row" rounded="lg" pH="lg" align="center" justify="center">
                {hasSubscribed ? (
                  <VerifiedAccountIcon width={16} height={16} />
                ) : (
                  <ExclamationIcon />
                )}
                <Typography
                  mL="sm"
                  color={hasSubscribed ? 'primary' : 'gray400'}
                  variation="smallRegular">
                  {hasSubscribed ? 'Subscribed' : 'Not Subscribed'}
                </Typography>
              </Block>
            )}

            {isRequest && (
              <Block bgColor="blue100" rounded="lg" pH="lg" align="center" justify="center">
                <Typography color="blue800" variation="smallSemiBold">
                  View Request
                </Typography>
              </Block>
            )}
          </Block>
          {messageContent}
        </Block>
      </Block>
    </Block>
  )
}

export default ChannelRow
