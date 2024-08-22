import { Channel, Thread } from 'stream-chat-react-native'
import { useChat } from '~/hooks/useChat'

const ThreadScreen = (props: any) => {
  const { channel, thread } = useChat()

  if (!channel) {
    return null
  }

  return (
    <Channel channel={channel} thread={thread} threadList>
      <Thread />
    </Channel>
  )
}

export default ThreadScreen
