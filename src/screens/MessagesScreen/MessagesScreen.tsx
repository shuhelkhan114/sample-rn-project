import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ChannelList } from 'stream-chat-react-native'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import { useChat } from '~/hooks/useChat'
import UserList from '~/modules/Messages/UserList/UserList'
import { MainStackScreens, Screens } from '~/navigation/screens'

type MessagesScreenProps = NativeStackScreenProps<MainStackScreens, Screens.MessagesScreen>

export type MessageScreenParams = undefined

const MessagesScreen: React.FC<MessagesScreenProps> = (props) => {
  const { top } = useSafeAreaInsets()
  const { chatClient } = useChat()

  let content: React.ReactNode = null

  if (!chatClient) {
    content = <ActivityIndicator />
  } else {
    content = (
      <ChannelList
        List={UserList}
        sort={{ last_message_at: -1 }}
        filters={{
          joined: true,
          members: { $in: [chatClient?.userID as string] },
        }}
      />
    )
  }

  return (
    <Block flex1 style={{ paddingTop: top }}>
      <Block pH="xxxl">
        <Typography mT="xl" mB="xxxl" variation="title3SemiBold">
          Messages
        </Typography>
      </Block>
      {content}
    </Block>
  )
}

export default MessagesScreen
