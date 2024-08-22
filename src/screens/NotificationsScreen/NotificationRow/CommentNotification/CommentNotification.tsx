import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { getImageUrl, getName } from '~/core/utils/common'
import { getTimeAgo } from '~/core/utils/time'
import useAuth from '~/hooks/useAuth'
import { MainStackScreens, Screens } from '~/navigation/screens'
import { Actor, Comment } from '~/typings/stream'

interface CommentNotificationProps {
  comment: {
    id: string
    actor: Actor
    reaction: Comment
  }
}

const CommentNotification: React.FC<CommentNotificationProps> = (props) => {
  const { comment } = props

  const { currentUser } = useAuth()

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.NotificationsScreen>>()

  const handlePress = () => {
    navigation.navigate(Screens.PostDetailScreen, {
      commentId: comment?.reaction?.id,
      postId: comment?.reaction?.activity_id,
    })
  }

  return (
    <Block>
      <Block flexDirection="row" key={comment?.id} mB="xl" onPress={handlePress}>
        <Image
          mR="lg"
          circular
          size={32}
          uri={getImageUrl(comment?.actor?.data, currentUser?.id)}
        />
        <Block flex1>
          <Typography color="gray600">
            New comment by{' '}
            <Typography variation="descriptionSemiBold">
              {getName(comment?.actor?.data, currentUser.id)}
            </Typography>
          </Typography>
          <Typography flex1 variation="descriptionLight" numberOfLines={1}>
            {'"'}
            {comment?.reaction?.data?.text}
            {'"'}
            <Typography color="gray500" variation="smallRegular">
              {' '}
              • {getTimeAgo(new Date(comment.reaction.created_at))}
            </Typography>
          </Typography>
        </Block>
      </Block>
    </Block>
  )
}

export default CommentNotification
