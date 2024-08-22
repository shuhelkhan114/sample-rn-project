import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { constructFeedName } from '~/core/utils/common'
import { useActivity } from '~/hooks/useActivity'
import { MainStackScreens, Screens } from '~/navigation/screens'
import AddictionRow, { AddictionRowProps } from '../AddictionRow/AddictionRow'

interface AddictionItemProps extends AddictionRowProps {
  canFollow: boolean
}

const AddictionItem: React.FC<AddictionItemProps> = (props) => {
  const { name, feedName, canFollow, imageUrl } = props

  const queryClient = useQueryClient()
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.CommunityScreen>>()
  const { user, client } = useActivity()

  const { isPending: followingFeed, mutate: followFeed } = useMutation({
    mutationFn: async (feed: string) => {
      const followResponse = await user?.follow('addiction', constructFeedName(feed))
      // Since the response only returns execution duration updating cache here.
      queryClient.setQueryData<Array<{ addiction: string }>>(
        ['following', user?.userId],
        (prevFollowing = []) => {
          return [
            ...prevFollowing,
            {
              addiction: constructFeedName(feed),
            },
          ]
        }
      )
      return followResponse
    },
  })

  // const { isPending: unfollowingFeed, mutate: unfollowFeed } = useMutation({
  //   mutationFn: async (feed: string) => {
  //     const unfollowResponse = await user?.unfollow('addiction', feed)
  //     // Since the response only returns execution duration updating cache here.
  //     queryClient.setQueryData<Array<{ addiction: string }>>(
  //       ['following', user?.userId],
  //       (prevFollowing = []) => {
  //         return prevFollowing.filter((f) => f.addiction !== feed)
  //       }
  //     )
  //     return unfollowResponse
  //   },
  // })

  const { data: stats } = useQuery({
    queryKey: ['category', name.toLowerCase()],
    queryFn: async () => {
      return client
        ?.feed('addiction', feedName)
        .followStats()
        .then((res) => res.results)
    },
  })

  const handlePress = () => {
    navigation.navigate(Screens.GroupDetailScreen, {
      imageUrl,
      feedName,
      category: name,
    })
  }

  const handleToggleFollow = async () => {
    const feed = name.toLowerCase()
    // if (!isFollowing) {
    followFeed(feed)
    // } else {
    //   unfollowFeed(feed)
    // }
  }

  return (
    <AddictionRow
      {...props}
      canFollow={canFollow}
      onPress={handlePress}
      onFollowPress={handleToggleFollow}
      followers={stats?.followers.count}
      loading={followingFeed}
    />
  )
}

export default AddictionItem
