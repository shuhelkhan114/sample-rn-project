import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Channel } from 'stream-chat'
import { DefaultStreamChatGenerics } from 'stream-chat-react-native-core'
import Typography from '~/components/Typography/Typography'
import { SubscriptionPlan } from '~/context/AuthContext'
import { getGenderText, getImageUrl, getName, getParsedMessage } from '~/core/utils/common'
import useAuth from '~/hooks/useAuth'
import { useChat } from '~/hooks/useChat'
import { MainStackScreens, Screens } from '~/navigation/screens'
import ChannelRow from '../ChannelRow/ChannelRow'

interface ChannelItemProps {
  channel: Channel<DefaultStreamChatGenerics>
}

const ChannelItem: React.FC<ChannelItemProps> = (props) => {
  const { channel } = props

  const { chatClient, setChannel } = useChat()
  const { currentUser } = useAuth()

  const [typing, setTyping] = useState(false)
  const [lastMessage, setLastMessage] = useState(channel.lastMessage())
  const [lastMessageUnseen, setLastMessageUnseen] = useState(
    channel?.countUnread() > 0 && lastMessage?.user_id !== chatClient?.userID
  )

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.MessagesScreen>>()

  useEffect(() => {
    channel.on('typing.start', () => setTyping(true))
    channel.on('typing.stop', () => setTyping(false))
    channel.on('message.read', () => setLastMessageUnseen(false))
    channel.on('message.new', () => {
      const lastMessage = channel.lastMessage()
      setLastMessage(lastMessage)
      setLastMessageUnseen(
        channel?.countUnread() > 0 && lastMessage?.user_id !== chatClient?.userID
      )
    })
  }, [channel])

  const [receiver] = Object.values(channel?.state.members).filter(
    (member) => member.user_id !== chatClient?.userID
  )

  const handlePress = async () => {
    setChannel(channel)
    navigation.navigate(Screens.ChatScreen)
  }

  if (receiver?.user) {
    const isRequest =
      !!channel.data?.requestPending && channel.data.requestedBy !== chatClient?.userID

    let lastMessageText = ''

    if (lastMessage?.yumetype === 'reveal') {
      if (lastMessage?.user?.id === currentUser.id) {
        lastMessageText = `You revealed yourself to ${getName(
          receiver.user as any,
          currentUser.id
        )}`
      } else {
        lastMessageText = `${receiver.user?.yumeUserName as string} has revealed ${getGenderText(
          (lastMessage?.data as any)?.gender as string
        )} self`
      }
    } else if (lastMessage?.yumetype === 'checkin') {
      lastMessageText = `${getName(receiver.user as any, currentUser.id)} has added a new checkin.`
    } else {
      lastMessageText = getParsedMessage(lastMessage?.html)
    }

    const isLastMessageMine = lastMessage?.user?.id === chatClient?.userID
    const lastMessageHasImage = !!lastMessage?.attachments?.[0]

    console.log('lastMessage: ', lastMessage)

    return (
      <ChannelRow
        key={channel.cid}
        isTyping={typing}
        onPress={handlePress}
        isRequest={isRequest}
        lastMessage={lastMessageText}
        isOnline={!!receiver.user?.online}
        isLastMessageMine={isLastMessageMine}
        isLastMessageSeen={!lastMessageUnseen}
        lastMessageHasImage={lastMessageHasImage}
        userName={getName(receiver.user as any, currentUser.id)}
        userImage={getImageUrl(receiver.user as any, currentUser.id)}
        hasSubscribed={receiver.user?.yumeSubscriptionPlan === SubscriptionPlan.MonthlyCoach}
      />
    )
  } else {
    return <Typography>User not found</Typography>
  }
}

export default ChannelItem
