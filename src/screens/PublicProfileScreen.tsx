import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { ChevronLeft } from 'react-native-feather'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import CommentIcon from '~/components/Icons/CommentIcon'
import DotMenuIcon from '~/components/Icons/DotMenuIcon'
import Image from '~/components/Image/Image'
import Link from '~/components/Link/Link'
import Modal from '~/components/Modal/Modal'
import Typography from '~/components/Typography/Typography'
import { UserRole } from '~/context/AuthContext'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getSize } from '~/core/utils/responsive'
import useAuth from '~/hooks/useAuth'
import { useChat } from '~/hooks/useChat'
import useAppTheme from '~/hooks/useTheme'
import CommentTab from '~/modules/Groups/SingleCategory/CommentTab'
import PostsTab from '~/modules/Groups/SingleCategory/PostTab'
import RecoveryCoach from '~/modules/Groups/SingleCategory/RecoveryCoach'
import { MainStackScreens, Screens } from '~/navigation/screens'

type PublicProfileScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.PublicProfileScreen
>

export type PublicProfileScreenParams = {
  userId: string
  role: UserRole
}

const PublicProfileScreen: React.FC<PublicProfileScreenProps> = (props) => {
  const { route, navigation } = props
  const { userId, role } = route.params

  const { top } = useSafeAreaInsets()
  const theme = useAppTheme()

  const { currentUser, state, blockUser, unblockUser, blockedUsers } = useAuth()
  const [selectedTab, setSelectedTab] = useState(0)
  const [blockPopup, setBlockPopup] = useState(false)
  const { chatClient, setChannel } = useChat()

  const {
    isPending: fetchingUser,
    error: fetchingUserError,
    data: user,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (currentUser.role === UserRole.User) {
        if (role === UserRole.User) {
          return await API.user.getUser(userId)
        } else if (role === UserRole.RecoveryCoach) {
          return await API.user.getRecoveryCoach(userId)
        }
      } else if (currentUser.role === UserRole.RecoveryCoach) {
        if (role === UserRole.User) {
          return await API.recoveryCoach.getUser(userId)
        } else if (role === UserRole.RecoveryCoach) {
          return await API.recoveryCoach.getRecoveryCoach(userId)
        }
      }
    },
  })

  const { mutate: processChannel } = useMutation({
    mutationFn: API.chat.getChannel,
    onSuccess(channel) {
      setChannel(channel)
      navigation.navigate(Screens.ChatScreen)
    },
  })

  const handleMessage = async () => {
    if (chatClient?.user && user) {
      processChannel([chatClient?.user.id, userId])
    }
  }

  const handleReport = () => {
    toast.show('Account has been reported', 'Thank you. We are looking into it!')
  }

  const handleStartBlock = () => {
    setBlockPopup(true)
  }

  const handleBlock = () => {
    if (user) {
      blockUser(user?.id)
      setBlockPopup(false)
    } else {
      toast.error('Error', 'User not found!')
    }
  }

  const handleUnblock = () => {
    if (user) {
      unblockUser(user?.id)
    } else {
      toast.error('Error', 'User not found!')
    }
  }

  let content: React.ReactNode = null

  if (fetchingUser) {
    content = <ActivityIndicator />
  } else if (fetchingUserError) {
    content = <ErrorText error={fetchingUserError} />
  } else if (!user) {
    content = <Typography>Profile not found!</Typography>
  } else if (blockedUsers?.includes(user.id)) {
    content = (
      <Block align="center" justify="center" mT="xxl">
        <Typography>You have blocked this user! </Typography>
        <Link mT="xl" color="primary" variation="descriptionSemiBold" onPress={handleUnblock}>
          Unblock
        </Link>
      </Block>
    )
  } else if (user) {
    let canMessage = true

    // if currently logged in user is of role user and viewing recovery coach'es profile
    if (currentUser.role === UserRole.User && role === UserRole.RecoveryCoach) {
      // and the viewing recovery coach is not his/her recovery coach
      if (state.user?.recovery_coach?.id !== userId) {
        // then they should not be able to message
        canMessage = false
      }
    }

    // Should not be able to message themselves
    if (userId === currentUser.id) {
      canMessage = false
    }

    content = (
      <Fragment>
        <Block pH="xxxl" pV="xl" flexDirection="row" justify="space-between" align="center">
          <Block flexDirection="row" align="center">
            <Image circular size={getSize(72)} uri={user.image} />
            <Block mL="xl">
              <Block flexDirection="row" align="center">
                <Typography mR="sm" variation="title5SemiBold">
                  {chatClient?.userID === userId ? 'You' : user?.name}
                </Typography>
              </Block>

              {canMessage ? (
                <Block
                  mT="md"
                  pH="md"
                  pV="sm"
                  width={102}
                  rounded="md"
                  align="center"
                  bgColor="primary"
                  flexDirection="row"
                  justify="flex-start"
                  onPress={handleMessage}>
                  <CommentIcon fill="#fff" />
                  <Typography mL="md" color="white" variation="descriptionRegular">
                    Message
                  </Typography>
                </Block>
              ) : null}
            </Block>
          </Block>
        </Block>
        {user?.bio && (
          <Block pH="xxxl" pV="xl">
            <Typography variation="title6SemiBold" mB="lg">
              My Story 🍀
            </Typography>
            <Typography>{user?.bio}</Typography>
          </Block>
        )}
        <Block flexDirection="row" align="center" wrap pV="xl" pH="xxxl">
          {user?.addictions.map((addiction) => {
            return (
              <Block
                bW={1}
                pH="xl"
                pV="md"
                mR="lg"
                mB="md"
                bC="gray200"
                rounded="6xl"
                key={addiction.id}>
                <Typography variation="descriptionRegular">{addiction.name}</Typography>
              </Block>
            )
          })}
        </Block>

        <Block flexDirection="row" align="center">
          <Block
            onPress={() => setSelectedTab(0)}
            bBW={1}
            flex1={role !== UserRole.RecoveryCoach}
            align="center"
            bC={selectedTab === 0 ? 'primary' : 'gray200'}
            pV="xl"
            pH="xxxl">
            <Typography center variation="paragraphRegular">
              Posts
            </Typography>
          </Block>
          <Block
            bBW={1}
            pV="xl"
            flex1={role !== UserRole.RecoveryCoach}
            align="center"
            onPress={() => setSelectedTab(1)}
            bC={selectedTab === 1 ? 'primary' : 'gray200'}
            pH="xxxl">
            <Typography center variation="paragraphRegular">
              Comments
            </Typography>
          </Block>
          {role === UserRole.RecoveryCoach && (
            <Block
              pV="xl"
              bBW={1}
              flex1
              onPress={() => setSelectedTab(2)}
              bC={selectedTab === 2 ? 'primary' : 'gray200'}>
              <Typography center variation="paragraphRegular">
                Recovery Coach
              </Typography>
            </Block>
          )}
        </Block>

        <Block flex1>
          {selectedTab === 0 && <PostsTab userId={user.id} />}
          {selectedTab === 1 && <CommentTab />}
          {selectedTab === 2 && <RecoveryCoach />}
        </Block>
      </Fragment>
    )
  }

  return (
    <Block flex1>
      <Modal position="center" visible={blockPopup} onClose={() => setBlockPopup(false)}>
        <Block>
          <Typography variation="title4SemiBold">Confirm Block</Typography>
          <Typography mT="xl" color="gray500" variation="paragraphRegular">
            Are you sure you want to block this user? You will no longer be able to see future
            posts, or receive messages from this user.
          </Typography>

          <Block mT="xl">
            <Button
              title="Block User"
              onPress={handleBlock}
              style={{ backgroundColor: theme.colors.negative }}
            />
            <Button
              mT="xl"
              mR="xl"
              title="Cancel"
              variation="tertiary"
              onPress={() => setBlockPopup(false)}
            />
          </Block>
        </Block>
      </Modal>
      <Block
        pH="xxl"
        align="center"
        flexDirection="row"
        justify="space-between"
        style={{ paddingTop: top + 10 }}>
        <Block onPress={navigation.goBack}>
          <ChevronLeft color="#111" />
        </Block>
        <Block>
          <Menu>
            <MenuTrigger>
              <DotMenuIcon fill={theme.colors.gray500} />
            </MenuTrigger>

            <MenuOptions
              optionsContainerStyle={{
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.rounded.xl,
                marginTop: theme.spacing.xxxl,
              }}>
              <MenuOption onSelect={handleReport}>
                <Block flexDirection="row" align="center" pV="md" pH="xl">
                  <Typography mL="lg" variation="descriptionRegular">
                    Report
                  </Typography>
                </Block>
              </MenuOption>
              <MenuOption
                onSelect={
                  blockedUsers?.includes(user?.id as string) ? handleUnblock : handleStartBlock
                }>
                <Block flexDirection="row" align="center" pV="md" pH="xl">
                  <Typography mL="lg" variation="descriptionRegular">
                    {blockedUsers?.includes(user?.id as string) ? 'Unblock' : 'Block'}
                  </Typography>
                </Block>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </Block>
      </Block>
      {content}
    </Block>
  )
}

export default PublicProfileScreen
