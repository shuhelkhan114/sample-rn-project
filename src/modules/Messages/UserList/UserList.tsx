import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, ListRenderItem, RefreshControl } from 'react-native'
import { Channel as IChannel } from 'stream-chat'
import { useChannelsContext } from 'stream-chat-react-native'
import { DefaultStreamChatGenerics } from 'stream-chat-react-native-core'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import DoubleMessageIcon from '~/components/Icons/DoubleMessageIcon'
import IIcon from '~/components/Icons/IIcon'
import Typography from '~/components/Typography/Typography'
import { UserRole } from '~/context/AuthContext'
import useAuth from '~/hooks/useAuth'
import { useChat } from '~/hooks/useChat'
import useAppTheme from '~/hooks/useTheme'
import RecoveryCoachCard from '~/models/message/SingleRecoveryCoachCard'
import ChannelItem from '../ChannelItem/ChannelItem'

interface UserListProps {}

const UserList: React.FC<UserListProps> = (props) => {
  const { loadingChannels, refreshing, error, channels, refreshList } = useChannelsContext()

  const theme = useAppTheme()

  const { chatClient } = useChat()
  const { currentUser, state, blockedUsers } = useAuth()

  useEffect(() => {
    refreshList()
  }, [])

  const recoveryCoach = state.user?.recovery_coach

  const recoveryCoachChannel = channels?.find(
    // @ts-ignore
    (channel) => !!channel.state.members[recoveryCoach?.id]
  )

  const isRecoveryCoachOnline = useMemo(() => {
    const [receiver] = Object.values(recoveryCoachChannel?.state?.members || {}).filter(
      (member) => member.user_id !== chatClient?.userID
    )
    return receiver?.user?.online
  }, [recoveryCoachChannel])

  let content: React.ReactNode = null

  if (loadingChannels) {
    content = <ActivityIndicator />
  } else if (error) {
    content = <ErrorText error={error} />
  } else if (channels) {
    let userChannels: Array<IChannel<DefaultStreamChatGenerics>> = []

    if (currentUser.role === UserRole.User) {
      userChannels = channels?.filter((channel) => {
        const hasRecoveryCoach = Object.values(channel.state.members).find(
          (member) => member.user_id === recoveryCoach?.id
        )

        if (hasRecoveryCoach) return false
        return true
      })
    } else {
      userChannels = channels
    }

    const renderEmptyState = () => {
      return (
        <Block rounded="xl" justify="center" align="center">
          <Block pV="xxxl" align="center">
            <Block bgColor="gray100" justify="center" rounded="xxxl" pH="md" pV="md">
              <DoubleMessageIcon fill={theme.colors.gray400} />
            </Block>
            <Typography mT="md" color="gray700" variation="descriptionRegular">
              You have not messaged anyone yet!
            </Typography>
          </Block>
        </Block>
      )
    }

    const renderHeader = () => {
      // TODO: move to a separate component
      const [lastMessageUnseen, setLastMessageUnseen] = useState(
        (recoveryCoachChannel?.countUnread() as number) > 0 &&
          recoveryCoachChannel?.lastMessage()?.user_id !== chatClient?.userID
      )

      useEffect(() => {
        recoveryCoachChannel?.on('message.read', () => setLastMessageUnseen(false))
        recoveryCoachChannel?.on('message.new', () => {
          const lastMessage = recoveryCoachChannel?.lastMessage()
          setLastMessageUnseen(
            recoveryCoachChannel?.countUnread() > 0 && lastMessage?.user_id !== chatClient?.userID
          )
        })
      }, [])

      if (currentUser.role === UserRole.RecoveryCoach) {
        return <Typography variation="paragraphSemiBold">Your Patients</Typography>
      }

      return (
        <Block flex1>
          {recoveryCoach && (
            <Block mB="xl">
              <Typography variation="paragraphSemiBold">Your Recovery Coach</Typography>
              {lastMessageUnseen && (
                <Block flexDirection="row" align="center">
                  <IIcon fill={theme.colors.warning} />
                  <Typography color="gray600" mV="lg" variation="descriptionRegular">
                    You have one unread message from your recovery coach.
                  </Typography>
                </Block>
              )}
              <RecoveryCoachCard
                id={recoveryCoach?.id}
                name={recoveryCoach?.name}
                image={recoveryCoach.user_image}
                isOnline={!!isRecoveryCoachOnline}
                soberness={recoveryCoach?.soberness}
                addictions={[
                  ...new Set(
                    (recoveryCoach?.parent_addictions || [])?.map(
                      (addition) => addition.description
                    )
                  ),
                ]}
              />
            </Block>
          )}
          <Typography mB="lg" variation="paragraphSemiBold">
            {(currentUser.role as UserRole) === UserRole.RecoveryCoach ? 'Your Patients' : 'Users'}
          </Typography>
        </Block>
      )
    }

    const renderItem: ListRenderItem<IChannel<DefaultStreamChatGenerics>> = (params) => {
      const { item: channel } = params
      return <ChannelItem channel={channel} />
    }

    content = (
      <Block flex1>
        <FlatList
          renderItem={renderItem}
          extraData={userChannels}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshList} />}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={{ paddingHorizontal: theme.spacing.xxxl }}
          // TODO: Find a better way to do this
          data={userChannels.filter((channel) => {
            const [receiver] = Object.values(channel?.state.members).filter(
              (member) => member.user_id !== chatClient?.userID
            )

            if (blockedUsers?.includes(receiver?.user_id as string)) {
              return false
            }

            if (channel.data?.requestIgnored) {
              if (channel.data?.requestedBy !== chatClient?.user?.id) {
                return false
              }
            }
            return true
          })}
        />
      </Block>
    )
  }

  return content
}

export default UserList
