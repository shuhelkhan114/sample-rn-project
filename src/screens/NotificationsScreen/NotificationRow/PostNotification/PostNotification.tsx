import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Block from '~/components/Block/Block'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { constructFeedName, getImageUrl, getName } from '~/core/utils/common'
import { getTimeAgo } from '~/core/utils/time'
import useAuth from '~/hooks/useAuth'
import { MainStackScreens, Screens } from '~/navigation/screens'
import { Post } from '~/typings/stream'

interface NewPostRowProps {
  post: Post
}

const NewPostRow: React.FC<NewPostRowProps> = (props) => {
  const { post } = props

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.NotificationsScreen>>()

  const { currentUser } = useAuth()

  const handlePress = () => {
    navigation.navigate(Screens.PostDetailScreen, { postId: post.id })
  }

  const handleCategoryPress = () => {
    navigation.navigate(Screens.GroupDetailScreen, {
      imageUrl: '',
      category: post.category,
      feedName: constructFeedName(post.category),
    })
  }

  return (
    <Block flexDirection="row" key={post.id} mB="xl" onPress={handlePress}>
      <Image
        mR="lg"
        circular
        size={32}
        uri={getImageUrl(post.actor?.data as any, currentUser.id)}
      />
      <Block flex1>
        <Typography color="gray600">
          New post from{' '}
          <Typography variation="descriptionSemiBold">
            {getName(post.actor?.data as any, currentUser.id)}
            <Typography>
              {' '}
              in{' '}
              <Typography color="primary" onPress={handleCategoryPress}>
                #{post?.category}
              </Typography>
            </Typography>
          </Typography>
        </Typography>

        <Block flexDirection="row" align="center">
          <Typography flex1 variation="descriptionSemiBold" numberOfLines={1}>
            {'"'}
            {post.title}
            {'"'}
          </Typography>
          <Typography color="gray500" variation="smallRegular">
            {' '}
            • {getTimeAgo(new Date(post.createdAt))}
          </Typography>
        </Block>
      </Block>
    </Block>
  )
}

export default NewPostRow
