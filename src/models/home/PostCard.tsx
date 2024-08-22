import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import Block from '~/components/Block/Block'
import CommentWithDotsIcon from '~/components/Icons/CommentWithDotsIcon'
import UpgradeIcon from '~/components/Icons/UpgradeIcon'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { UserRole } from '~/context/AuthContext'
import { postTypeTextColor } from '~/core/config/mappings'
import { capitalizeFirstLetter } from '~/core/utils/common'
import { getTimeAgo } from '~/core/utils/time'
import { useActivity } from '~/hooks/useActivity'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

export interface PostCardProps {
  id: string
  title: string
  description: string
  /** Used for opening user profile screen */
  userId: string
  username: string
  userImage: string
  category: string
  postType: string
  createdAt: string
  /** user's role */
  userRole: UserRole
  commentsCount?: number
  /** Prevents tapping on the card */
  disabled?: boolean
  upvotesCount?: number
  /** Used for highlighting the post if it's newly created */
  recentlyCreated?: boolean
  /** Used for displaying primary colored indictor */
  hasUpvoted?: boolean
  /** Used for down voting the post */
  ownReactionId?: string
  /** display all the content, otherwise will only display first 10 lines */
  showFullContent?: boolean
  /** display all lastPost border */
  lastPost?: boolean
  /** used for displaying verified badge */
  isCreatedByAdmin: boolean
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const {
    id,
    userId,
    userImage,
    disabled,
    createdAt,
    userRole,
    ownReactionId,
    title = 'N/A',
    postType = 'N/A',
    category = 'N/A',
    upvotesCount = 0,
    commentsCount = 0,
    hasUpvoted = false,
    description = 'N/A',
    recentlyCreated = false,
    username = 'unknown_user',
    showFullContent,
    isCreatedByAdmin,
    lastPost = false,
  } = props

  const theme = useAppTheme()
  const { blockedUsers } = useAuth()

  const [_upvotesCount, setUpvotesCount] = useState(upvotesCount)
  const [_hasUpvoted, setHasUpvoted] = useState(hasUpvoted)

  // Used when down-vote and vote again
  const [lastReactionId, setLastReaction] = useState<string | null>(null)

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.HomeScreen>>()

  const { currentUser } = useAuth()
  const { client } = useActivity()

  useEffect(() => {
    setUpvotesCount(upvotesCount)
  }, [upvotesCount])

  useEffect(() => {
    setHasUpvoted(hasUpvoted)
  }, [hasUpvoted])

  const { isPending: upVoting, mutate: upVote } = useMutation({
    mutationFn: async (activityId: string) => await client?.reactions.add('like', activityId),
    onSuccess(response) {
      setLastReaction(response?.id as string)
    },
    onError() {
      setUpvotesCount((prevValue) => prevValue - 1)
      setHasUpvoted((prevValue) => !prevValue)
    },
  })

  const { isPending: downVoting, mutate: downVote } = useMutation({
    mutationFn: async () =>
      await client?.reactions.delete(lastReactionId || (ownReactionId as string)),
    onError() {
      setUpvotesCount((prevValue) => prevValue + 1)
      setHasUpvoted((prevValue) => !prevValue)
    },
  })

  const handleToggleVote = () => {
    if (upVoting || downVoting) return

    if (!_hasUpvoted) {
      setUpvotesCount((prevValue) => prevValue + 1)
      upVote(id)
    } else {
      setUpvotesCount((prevValue) => prevValue - 1)
      downVote()
    }
    setHasUpvoted((prevValue) => !prevValue)
  }

  const handleProfilePress = () => {
    navigation.navigate(Screens.PublicProfileScreen, { userId, role: userRole })
  }

  const handlePress = () => {
    if (!disabled) {
      navigation.navigate(Screens.PostDetailScreen, {
        postId: id,
      })
    }
  }

  if (blockedUsers?.includes(userId)) {
    return null
  }

  return (
    <Block
      pV="xl"
      bBW={lastPost ? 0 : 1}
      pH="xl"
      bC="gray200"
      bgColor={recentlyCreated ? 'background' : 'white'}
      {...(!disabled && { onPress: handlePress })}>
      <Block align="center" flexDirection="row">
        <Image
          mR="lg"
          circular
          size={32}
          uri={recentlyCreated ? currentUser.displayImage : userImage}
          onPress={handleProfilePress}
        />
        <Block flex1>
          <Block wrap flexDirection="row" align="center" onPress={handleProfilePress}>
            <Block flexDirection="row" align="center" mR="md">
              <Typography color="primary" variation="smallRegular">
                {recentlyCreated ? currentUser.displayName : username}
              </Typography>
              {userRole === UserRole.RecoveryCoach && (
                <Block mL="xs" flexDirection="row">
                  <VerifiedAccountIcon width={16} height={16} />
                  <Typography color="black" variation="smallRegular">
                    Verified Recovery Coach
                  </Typography>
                </Block>
              )}
            </Block>
            <Typography mR="md" color="gray600">
              •
            </Typography>
            <Typography mR="md" color="gray700" variation="smallRegular">
              {getTimeAgo(new Date(createdAt))}
            </Typography>
            <Block pH="md" rounded="md" bgColor="green100">
              <Typography color={postTypeTextColor[postType]} variation="descriptionSemiBold">
                {capitalizeFirstLetter(postType)}
              </Typography>
            </Block>
            {isCreatedByAdmin && (
              <Block mL="md" flexDirection="row" align="center">
                <VerifiedAccountIcon width={16} height={16} fill={theme.colors.neutral} />
                <Typography variation="smallRegular" mL="sm" color="neutral">
                  Verified
                </Typography>
              </Block>
            )}
          </Block>
          <Typography color="gray600" variation="smallRegular">
            {capitalizeFirstLetter(category)}
          </Typography>
        </Block>
      </Block>

      <Block>
        <Typography mT="lg" variation="paragraphSemiBold" color="black">
          {title}
        </Typography>

        <Block mT="lg">
          <Typography
            variation="paragraphLight"
            color="black"
            numberOfLines={showFullContent ? undefined : 10}>
            {description}
          </Typography>
        </Block>
      </Block>

      <Block mT="lg" flexDirection="row" align="center">
        <Block flexDirection="row" align="flex-end" onPress={handleToggleVote}>
          <UpgradeIcon />
          <Typography
            color={_hasUpvoted ? 'primary' : 'gray600'}
            pB="xs"
            variation="descriptionRegular">
            {_upvotesCount} upvotes
          </Typography>
        </Block>

        <Block mL="xl" flexDirection="row" align="flex-end">
          <CommentWithDotsIcon />
          <Typography color="gray600" mL="sm" variation="descriptionRegular">
            {commentsCount} comments
          </Typography>
        </Block>
      </Block>
    </Block>
  )
}

export default PostCard
