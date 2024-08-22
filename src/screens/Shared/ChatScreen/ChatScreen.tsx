import { useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import React, { Fragment, useCallback, useRef, useState } from 'react'
import { ActivityIndicator, AppState } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ChannelMemberResponse } from 'stream-chat'
import {
  Channel,
  DefaultStreamChatGenerics,
  MessageList,
  MessageType,
} from 'stream-chat-react-native'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import InfoIcon from '~/components/Icons/InfoIcon'
import ScanIcon from '~/components/Icons/ScanIcon'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import Link from '~/components/Link/Link'
import Modal from '~/components/Modal/Modal'
import Typography from '~/components/Typography/Typography'
import { SubscriptionPlan, UserRole } from '~/context/AuthContext'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getImageUrl, getName, getParsedMessage, revealedToUser } from '~/core/utils/common'
import useAuth from '~/hooks/useAuth'
import { useChat } from '~/hooks/useChat'
import ChatHeader from '~/modules/Chat/ChatHeader/ChatHeader'
import CustomInput from '~/modules/Chat/CustomInput/CustomInput'
import CustomMessage from '~/modules/Chat/CustomMessage/CustomMessage'
import { MainStackScreens, Screens } from '~/navigation/screens'
import { CustomEvents } from '~/typings/chat'
import CheckInMessage from './CheckInMessage/CheckInMessage'
import RevealUser from './RevealUser/RevealUser'

type ChatScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ChatScreen>

export type ChatScreenParams = undefined

const ChatScreen: React.FC<ChatScreenProps> = (props) => {
  const { navigation } = props
  const appState = useRef(AppState.currentState)
  const { state } = useAuth()
  const [, setAppStateVisible] = useState(appState.current)

  const [revealYourselfModalVisible, setRevealYourselfModalVisible] = useState(false)
  const [requestPending, setRequestPending] = useState(false)
  const [requestedBy, setRequestedBy] = useState<string | null>(null)
  const [receiver, setReceiver] = useState<ChannelMemberResponse<DefaultStreamChatGenerics> | null>(
    null
  )
  const [isWithRecoveryCoach, setIsWithRecoveryCoach] = useState(false)
  const [isWithFinancialManager, setIsWithFinancialManager] = useState(false)

  const { chatClient, channel, setChannel } = useChat()
  const { bottom } = useSafeAreaInsets()
  const { currentUser } = useAuth()
  const { isPending: acceptingRequest, mutate: acceptRequest } = useMutation({
    mutationFn: async () => {
      await channel?.sendEvent({ type: CustomEvents.AcceptRequest as any })
      return channel?.updatePartial({
        set: {
          requestPending: false,
          requestIgnored: false,
        },
      })
    },
    onError() {
      toast.error('Message Request', 'Unable to accept request, please try agin later!')
    },
  })

  const { isPending: ignoringRequest, mutate: ignoreRequest } = useMutation({
    mutationFn: async () => {
      await channel?.sendEvent({ type: CustomEvents.IgnoreRequest as any })
      return channel?.updatePartial({
        set: {
          requestIgnored: true,
        },
      })
    },
    onSuccess() {
      navigation.goBack()
    },
    onError() {
      toast.error('Message Request', 'Unable to accept request, please try agin later!')
    },
  })

  const { isPending: reportingRequest, mutate: reportRequest } = useMutation({
    mutationFn: async () => {
      // TODO: Need to have a different logic
      await channel?.sendEvent({ type: CustomEvents.IgnoreRequest as any })
      return channel?.updatePartial({
        set: {
          requestIgnored: true,
        },
      })
    },
    onSuccess() {
      toast.success('Request reported!', 'YuMe community will review the user!')
      navigation.goBack()
    },
    onError() {
      toast.error('Message Request', 'Unable to accept request, please try agin later!')
    },
  })

  useFocusEffect(
    useCallback(() => {
      const subscription = AppState.addEventListener('change', (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App has come to the foreground!')
        }

        appState.current = nextAppState
        setAppStateVisible(appState.current)
        // console.log('AppState', appState.current)
      })

      if (channel?.data) {
        setRequestPending(channel.data.requestPending as boolean)
        setRequestedBy(channel.data.requestedBy as string)
        // console.log('s1')
      }
      const mount = async () => {
        if (channel) {
          const messages = Object.values(channel?.state.messages)
          // console.log('s2', channel.id)

          if (messages.length <= 1) {
            const cId = channel.id
            const updatedChannel = await API.chat.getChannelById(cId as string)

            setChannel(null as any)
            setTimeout(() => {
              // console.log('-------', updatedChannel)

              setChannel(updatedChannel)
            }, 0)
          }
        }
      }
      mount()
      if (channel) {
        const members = Object.values(channel?.state?.members || {}).filter(
          (member) => (member as any)?.user_id !== chatClient?.userID
        )

        const isWithRecoveryCoach = !!Object.values(channel?.state.members || {})?.find(
          (member) => member.user?.yumeRole === UserRole.RecoveryCoach
        )

        const isWithFinancialManager = !!Object.values(channel?.state.members || {})?.find(
          (member) => member.user?.yumeRole === UserRole.FinancialManager
        )

        setReceiver(members?.[0])
        // console.log('s3')

        setIsWithRecoveryCoach(isWithRecoveryCoach)
        setIsWithFinancialManager(isWithFinancialManager)

        channel?.on(CustomEvents.FirstMessage as any, (event) => {
          setRequestedBy(event.requestedBy as string)
          setRequestPending(true)
        })

        channel?.on(CustomEvents.AcceptRequest as any, () => {
          setRequestPending(false)
        })

        channel?.on(CustomEvents.RevealUser as any, (event) => {
          const channelId = channel.id
          setChannel(null)
          // console.log('-----', channel.id)

          setTimeout(async () => {
            const updatedChannel = await API.chat.getChannelById(channelId as string)
            setChannel(updatedChannel)
          }, 0)
        })
      }
      // console.log('aya')
      // console.log('staate', appState.current)

      return () => {
        // console.log('gya')
        // if (appState.current === 'inactive') navigation.goBack()

        subscription.remove()

        // Clean up if needed
      }
    }, [appState.current])
  )

  const handleRevealSuccess = async () => {
    if (receiver) {
      toast.success('Success', `${getName(receiver?.user as any, currentUser.id)} can now see you`)
      setRevealYourselfModalVisible(false)
    }
  }

  let content: React.ReactNode = null

  if (!channel) {
    content = <ActivityIndicator />
  } else {
    const handleIgnoreRequest = () => {
      ignoreRequest()
    }

    const handleAcceptRequest = () => {
      acceptRequest()
    }

    const handleReportRequest = () => {
      reportRequest()
    }

    const handleViewProfile = () => {
      if (receiver?.user_id) {
        navigation.navigate(Screens.PublicProfileScreen, {
          userId: receiver?.user_id,
          role: receiver.user?.yumeRole as UserRole,
        })
      }
    }

    const handleSubscribe = () => {
      if (receiver?.user_id) {
        navigation.navigate(Screens.RecommendedRecoveryCoachScreen)
      }
    }

    const renderFooterComponent = () => {
      return channel.data?.requestPending && channel?.data?.requestedBy !== chatClient?.userID ? (
        <Block mB="xxxl">
          {/* <Block flexDirection="row" justify="center">
            <Image circular size={getSize(78)} uri={receiver?.user?.yumeAvatar as string} />
          </Block> */}
          <Typography mV="md" variation="descriptionRegular" center color="gray700">
            {receiver?.user?.yumeName as string}
          </Typography>
          <Link center color="primary" onPress={handleViewProfile} variation="descriptionSemiBold">
            View Profile
          </Link>
        </Block>
      ) : null
    }

    // TODO: temp fix
    // const renderInlineDateSeparator = ({ date }: { date?: Date | undefined }) => {
    //   return (
    //     <Block pH="xxxl" pB="xl">
    //       <Block flexDirection="row" mT="md" align="center">
    //         <Block flex1 height={1} bgColor="gray200" />
    //         <Typography color="gray500" mH="xl" variation="smallLight">
    //           {getDayTimeAgo(date as Date)}
    //         </Typography>
    //         <Block flex1 height={1} bgColor="gray200" />
    //       </Block>
    //     </Block>
    //   )
    // }

    const renderTypingIndicator = () => {
      return (
        <Block pH="xxxl" mT="xxxl" flex1>
          <Typography mT="xl">
            <Typography variation="smallSemiBold">
              {getName(receiver?.user as any, currentUser.id)}
            </Typography>{' '}
            is typing...
          </Typography>
        </Block>
      )
    }

    const renderMessage = ({ message }: { message: MessageType<DefaultStreamChatGenerics> }) => {
      if (message.yumetype === 'checkin') {
        return (
          <CheckInMessage
            checkIns={(message.chekins as any).messages || []}
            checkedInAt={message.checkedInAt as number}
          />
        )
      }

      if (message.yumetype === 'reveal') {
        return (
          <Block pH="xxxl" pB="xl">
            <Block flexDirection="row" mT="md" align="center">
              <Block flex1 height={1} bgColor="gray200" />
              <Typography color="gray500" mH="xl" variation="smallLight">
                {(message.data as any)?.revealBy} revealed{' '}
                {(message.data as any)?.gender === 'male'
                  ? 'him self'
                  : (message.data as any)?.gender === 'female'
                  ? 'her self'
                  : 'them self'}
              </Typography>
              <Block flex1 height={1} bgColor="gray200" />
            </Block>
          </Block>
        )
      }

      let imageUrl = ''
      let name = ''

      const isMyMessage = message.user?.id === chatClient?.userID

      if (isMyMessage) {
        if (
          revealedToUser((chatClient?.user?.yumeRevealedUser as string[]) || [], receiver?.user_id)
        ) {
          imageUrl = currentUser.userImage || currentUser.avatarImage
          name = currentUser.name
        } else {
          imageUrl = getImageUrl(message.user as any)
          name = getName(message.user as any)
        }
      } else {
        imageUrl = getImageUrl(message.user as any, currentUser.id)
        name = getName(message.user as any, currentUser.id)
      }

      const images = message.attachments
        ?.filter((attachment) => attachment.type === 'image' && attachment.asset_url)
        .map((attachment) => ({
          imageUrl: attachment.image_url,
          thumbnailUrl: attachment.asset_url,
        }))

      const gifs = message.attachments
        ?.filter((attachment) => attachment.type === 'gif')
        .map((attachment) => ({
          gifUrl: attachment.asset_url,
        }))

      console.log('imageUrl: ', imageUrl)

      return (
        <CustomMessage
          username={name}
          images={images}
          gifs={gifs}
          userImage={imageUrl}
          userId={message.user?.id}
          createdAt={message.created_at}
          message={getParsedMessage(message.html)}
        />
      )
    }

    let footerContent: React.ReactNode

    if (requestPending && !isWithFinancialManager) {
      if (requestedBy !== chatClient?.userID) {
        footerContent = (
          <Block pB="xxxl">
            <Block pH="xl">
              <Block mB="xl" flexDirection="row">
                {/* TODO: fix inline styles */}
                <Button
                  mR="md"
                  title="Ignore"
                  variation="secondary"
                  loading={ignoringRequest}
                  onPress={handleIgnoreRequest}
                  style={{ flex: 1, width: '100%' }}
                />
                <Button
                  title="Accept"
                  loading={acceptingRequest}
                  onPress={handleAcceptRequest}
                  style={{ flex: 1, width: '100%' }}
                />
              </Block>

              <Button
                variation="secondary"
                title="Report Invite"
                loading={reportingRequest}
                onPress={handleReportRequest}
              />
            </Block>
          </Block>
        )
      } else {
        footerContent = (
          <Block mT="xl" style={{ paddingBottom: bottom }}>
            <Typography color="gray700" center>
              You haven&apos;t received a reply yet.{' '}
              <Typography onPress={() => {}} color="primary">
                Learn More
              </Typography>{' '}
            </Typography>
          </Block>
        )
      }
    } else if (isWithRecoveryCoach) {
      if (currentUser?.subscription_plan === SubscriptionPlan?.MonthlyCoach) {
        footerContent = <CustomInput />
      } else if (receiver?.user?.yumeRole === UserRole.RecoveryCoach) {
        footerContent = (
          <Block mT="xxl" pH="xxxl" style={{ paddingBottom: bottom }}>
            <Block flexDirection="row">
              <InfoIcon />
              <Typography mL="lg" color="gray600" variation="descriptionRegular">
                To respond to the therapist and initiate your connection, you need to subscribe our
                plan.
              </Typography>
            </Block>
            <Button onPress={handleSubscribe} mT="xl" title="Upgrade membership" />
          </Block>
        )
      } else {
        footerContent = <CustomInput />
      }
    } else {
      footerContent = <CustomInput />
    }

    content = (
      <Fragment>
        {!isWithRecoveryCoach &&
        !currentUser.revealed_to_community &&
        !revealedToUser((chatClient?.user as any)?.yumeRevealedUser || [], receiver?.user?.id) ? (
          // Reveal yourself Message Card
          <Block
            pV="md"
            rounded="xl"
            mV="md"
            mH="xl"
            pH="lg"
            align="center"
            bgColor="gray100"
            justify="center"
            flexDirection="row"
            onPress={() => setRevealYourselfModalVisible(true)}>
            <ScanIcon />
            <Block flex1>
              <Typography mL="lg" color="gray700" variation="smallRegular">
                Your identity&apos;s safe.
              </Typography>
              <Typography mL="lg" color="gray700" variation="smallRegular">
                If you feel comfortable click Reveal Yourself.
              </Typography>
            </Block>
          </Block>
        ) : null}

        {/* Chat Window */}
        <Block flex1>
          <Channel channel={channel} giphyEnabled>
            <MessageList
              Message={renderMessage}
              TypingIndicator={renderTypingIndicator}
              FooterComponent={renderFooterComponent}
              // InlineDateSeparator={renderInlineDateSeparator}
              additionalFlatListProps={{ style: { backgroundColor: 'white' } }}
            />
            {footerContent}
          </Channel>
        </Block>
      </Fragment>
    )
  }

  const receiverName = receiver ? getName(receiver?.user as any, currentUser.id) : 'Loading...'
  const receiverImage = receiver ? getImageUrl(receiver?.user as any, currentUser.id) : ''

  let bothRevealedEachOther = false

  if (
    (receiver?.user?.yumeRevealedUser as any)?.includes(chatClient?.user?.id as string) &&
    state.user?.revealed_to_user.map((user) => user.id).includes(receiver?.user?.id as string)
  ) {
    bothRevealedEachOther = true
  }

  return (
    <KeyboardView>
      <Block flex1>
        <Modal visible={revealYourselfModalVisible} onClose={setRevealYourselfModalVisible}>
          <RevealUser
            onSuccess={handleRevealSuccess}
            userId={receiver?.user_id as string}
            userName={getName(receiver?.user as any, currentUser.id)}
            onCancel={() => setRevealYourselfModalVisible(false)}
          />
        </Modal>

        <ChatHeader
          username={receiverName}
          imageUrl={receiverImage}
          bothRevealedEachOther={bothRevealedEachOther}
          userId={receiver?.user_id as any}
          isWithRecoveryCoach={isWithRecoveryCoach}
          isWithFinancialManager={isWithFinancialManager}
          role={receiver?.user?.yumeRole as UserRole}
          onReveal={() => setRevealYourselfModalVisible(true)}
        />

        {content}
      </Block>
    </KeyboardView>
  )
}

export default ChatScreen
