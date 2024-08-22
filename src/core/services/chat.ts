import { Channel, DefaultGenerics } from 'stream-chat'
import { _chatClient } from '~/context/ChatContext'

export const createChannel = async (members: string[]) => {
  const channel = _chatClient.channel('messaging', {
    members,
  })
  await channel.create()
  return channel
}

export const getChannelByMembers = async (members: string[]) => {
  const channels = await _chatClient.queryChannels({
    type: 'messaging',
    members: {
      $eq: members,
    },
  })
  return channels?.[0]
}

export const getChannelById = async (channelId: string) => {
  const [channel] = await _chatClient.queryChannels({
    type: 'messaging',
    id: channelId,
  })
  return channel
}

/** creates or retrieve channel by members */
export const getChannel = async (members: string[]) => {
  let channel: Channel<DefaultGenerics>
  channel = await getChannelByMembers(members)
  if (!channel) {
    channel = await createChannel(members)
  }
  return channel
}
