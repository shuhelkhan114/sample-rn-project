import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Block from '~/components/Block/Block'
import ReplyIcon from '~/components/Icons/ReplyIcon'
import UpgradeIcon from '~/components/Icons/UpgradeIcon'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { UserRole } from '~/context/AuthContext'
import { getImageUrl, getName } from '~/core/utils/common'
import { getTimeAgo } from '~/core/utils/time'
import { useActivity } from '~/hooks/useActivity'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'
import { Comment } from '~/typings/stream'

interface CommentItemProps {
  comment: Comment
  isChildren?: boolean
  refetch?: () => void
  onVote?: () => void
  onReply?: () => void
  notificationCommentId?: string
  setReplyingToText: (text: string) => void
}

const CommentItem: React.FC<CommentItemProps> = (props) => {
  const { comment, isChildren, notificationCommentId, onReply, refetch, setReplyingToText } = props

  const [upvotesCount, setUpvotesCount] = useState(0)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  // Used when down-vote and vote again
  const [lastReactionId, setLastReaction] = useState<string | null>(null)
  const [highlighted, setHighlighted] = useState(false)
  const [collapse, setCollapse] = useState(false)

  const theme = useAppTheme()
  const { currentUser, blockedUsers } = useAuth()
  const { client } = useActivity()

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.PostDetailScreen>>()

  useEffect(() => {
    if (notificationCommentId === comment.id) {
      setHighlighted(true)

      const timeout = setTimeout(() => {
        setHighlighted(false)
      }, 2000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [notificationCommentId])

  useEffect(() => {
    const _hasUpvoted = comment.own_children?.like?.length > 0

    setHasUpvoted(_hasUpvoted)
    const _upvoteCount = comment.children_counts?.like
    setUpvotesCount(_upvoteCount)
  }, [comment])

  const { isPending: upvotingComment, mutate: upvoteComment } = useMutation({
    mutationFn: async (commentId: string) => {
      return client?.reactions.addChild('like', commentId)
    },
    onSuccess(response) {
      refetch?.()
      setLastReaction(response?.id as string)
    },
    onError() {
      setUpvotesCount((prevValue) => prevValue - 1)
      setHasUpvoted((prevValue) => !prevValue)
    },
  })

  const { isPending: downvotingComment, mutate: downvoteComment } = useMutation({
    mutationFn: async (reactionId: string) => {
      return client?.reactions.delete(lastReactionId || reactionId)
    },
    onSuccess() {
      refetch?.()
    },
    onError() {
      setUpvotesCount((prevValue) => prevValue + 1)
      setHasUpvoted((prevValue) => !prevValue)
    },
  })

  const handleToggleVote = () => {
    if (upvotingComment || downvotingComment) return

    if (!hasUpvoted) {
      setUpvotesCount((prevValue) => prevValue + 1)
      upvoteComment(comment.id)
    } else {
      const likeId = comment.own_children?.like?.find((like) => like.user_id === client?.userId)?.id
      if (likeId) {
        setUpvotesCount((prevValue) => prevValue - 1)
        downvoteComment(likeId)
      }
    }
    setHasUpvoted((prevValue) => !prevValue)
  }

  const handleReply = () => {
    setReplyingToText(comment.data.text)
    onReply?.()
  }

  const handleProfilePress = () => {
    navigation.navigate(Screens.PublicProfileScreen, {
      userId: comment.user.id,
      role: comment.user.data?.yumeRole,
    })
  }

  const imageUrl = getImageUrl(comment.user?.data, currentUser.id)

  const collapseComment = () => {
    setCollapse(!collapse)
  }

  if (blockedUsers?.includes(comment.user_id)) {
    return null
  }

  return (
    <Block
      pH="xl"
      pV="xl"
      bLW={1}
      bgColor="green100"
      key={comment.id}
      mB={!isChildren ? 'lg' : undefined}
      bC={highlighted ? 'primary' : 'gray200'}
      style={{ backgroundColor: highlighted ? theme.colors.primary + '1A' : theme.colors.white }}>
      <Block flexDirection="row">
        <Block flex1>
          <Block flexDirection="row" align="center" onPress={collapseComment}>
            <Image mR="md" circular size={32} onPress={handleProfilePress} uri={imageUrl} />
            <Block
              mR="auto"
              flexDirection="row"
              justify="space-between"
              align="center"
              onPress={handleProfilePress}>
              <Block flexDirection="row" align="center" mR="lg">
                <Typography color="gray700" variation="descriptionRegular">
                  {comment.user_id === currentUser.id
                    ? 'You'
                    : getName(comment?.user?.data as any, currentUser.id)}
                </Typography>
                {comment.user?.data.yumeRole === UserRole.RecoveryCoach && (
                  <Block mL="xs">
                    <VerifiedAccountIcon width={16} height={16} />
                  </Block>
                )}
              </Block>
              <Typography mR="lg">•</Typography>
              <Typography color="gray500" variation="smallRegular">
                {getTimeAgo(new Date(comment.created_at)).replace(' ago', '')}
              </Typography>
            </Block>
          </Block>
          {!collapse && (
            <Block>
              <Typography
                mT="lg"
                color="gray600"
                variation={isChildren ? 'descriptionLight' : 'paragraphLight'}
                mB={!isChildren ? 'xl' : undefined}>
                {comment.data?.text}
              </Typography>

              <Block flexDirection="row" justify="flex-end" align="center">
                {!isChildren && (
                  <Block mR="md" flexDirection="row" onPress={handleToggleVote}>
                    <UpgradeIcon />
                    <Typography
                      mL="sm"
                      variation="descriptionRegular"
                      color={hasUpvoted ? 'primary' : 'gray700'}>
                      {upvotesCount || 0}
                    </Typography>
                  </Block>
                )}
                <Block flexDirection="row" align="center" onPress={handleReply}>
                  <ReplyIcon />
                  <Typography mL="sm" color="gray600" variation="descriptionRegular">
                    Reply
                  </Typography>
                </Block>
              </Block>

              {comment.latest_children?.comment
                ?.sort(
                  (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                )
                .map((comment: any) => {
                  return (
                    <CommentItem
                      isChildren
                      onReply={onReply}
                      key={comment.id}
                      comment={comment}
                      setReplyingToText={setReplyingToText}
                      notificationCommentId={notificationCommentId}
                    />
                  )
                })}
            </Block>
          )}
        </Block>
      </Block>
    </Block>
  )
}

export default CommentItem
