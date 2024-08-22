import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import ArrowLeft from '~/components/Icons/ArrowLeft'
import Image from '~/components/Image/Image'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { constructFeedName } from '~/core/utils/common'
import { getPostCardProps } from '~/core/utils/components'
import { getSize } from '~/core/utils/responsive'
import { useActivity } from '~/hooks/useActivity'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import PostCard from '~/models/home/PostCard'
import FollowButton from '~/modules/Groups/FollowButton/FollowButton'
import CategoryHeader from '~/modules/Groups/SingleCategory/SingleCategoryTopic'
import { MainStackScreens, Screens } from '~/navigation/screens'
import { Post } from '~/typings/stream'

type GroupDetailProps = NativeStackScreenProps<MainStackScreens, Screens.GroupDetailScreen>

export type GroupDetailScreenParams = {
  category: string
  feedName: string
  imageUrl: string
}

const GroupDetailScreen: React.FC<GroupDetailProps> = (props) => {
  const { navigation, route } = props
  const { category, imageUrl, feedName } = route.params
  const [headerFixed, setHeaderFixed] = useState(false)

  const { user, client } = useActivity()
  const theme = useAppTheme()
  const { top } = useSafeAreaInsets()
  const { currentUser } = useAuth()
  const [isFollowing, setIsFollowing] = useState(false)

  const {
    isPending: fetchingFollowing,
    data: following,
    refetch,
    isRefetching,
  } = useQuery({
    enabled: !!user?.userId,
    queryKey: ['following', user?.userId],
    queryFn: async () => {
      const res = await user?.following().then((res) =>
        res.results.map((feed) => ({
          addiction: feed.target_id.split(':')[1],
        }))
      )
      return res
    },
  })

  useEffect(() => {
    if (following?.find((feed) => feed.addiction === constructFeedName(category))) {
      setIsFollowing(true)
    } else {
      setIsFollowing(false)
    }
  }, [following, category])

  const onFollowPress = () => {
    refetch()
  }

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y
    const triggerPosition = 180

    // Check if the scroll position has passed the trigger position
    if (scrollPosition > triggerPosition) {
      setHeaderFixed(true) // Change the color dynamically
    } else {
      setHeaderFixed(false) // Reset to the initial color
    }
  }

  const { data: stats } = useQuery({
    queryKey: ['category', feedName],
    queryFn: async () => {
      return client
        ?.feed('addiction', feedName)
        .followStats()
        .then((res) => res.results)
    },
  })

  const {
    isPending: fetchingPosts,
    error: postsError,
    data: posts,
  } = useQuery({
    queryKey: ['posts', feedName],
    queryFn: async () => {
      return await client
        ?.feed('addiction', feedName)
        .get({
          limit: 500,
          ownReactions: true,
          withOwnReactions: true,
          withReactionCounts: true,
        })
        .then((res) => res.results as unknown as Post[])
    },
  })

  const { isPending: fetchingFollowers, data: followers } = useQuery({
    queryKey: ['categoryFollow', feedName],
    queryFn: async () => {
      if (!client) {
        return []
      }
      const followers = await client
        .feed('addiction', feedName)
        .followers()
        .then((res) => res.results)

      const users = await Promise.all(
        followers.map(async (follower) => client.user(follower.feed_id.split('user:')[1]).profile())
      )

      return users
    },
  })

  const onViewAllPress = () => {
    navigation.navigate(Screens.AllFollowingUserScreen, {
      category,
      feedName,
    })
  }

  let content: React.ReactNode = null

  if (fetchingPosts) {
    content = <ActivityIndicator />
  } else if (postsError) {
    content = <ErrorText error={postsError} />
  } else if (!posts?.length) {
    content = <Typography>No Posts Found!</Typography>
  } else if (posts) {
    content = posts.map((post) => (
      <PostCard key={post.id} {...getPostCardProps(post, currentUser.id)} />
    ))
  }

  return (
    <Block relative>
      {headerFixed ? (
        <Block
          pH="xl"
          pV="lg"
          absolute
          zIndex={10}
          left={0}
          right={0}
          bgColor="white"
          style={{ paddingTop: top }}
          shadow="sm">
          <Block flexDirection="row" justify="space-between" align="center">
            <Block flexDirection="row" align="center" onPress={() => navigation.goBack()}>
              <ArrowLeft fill={theme.colors.black} />
              <Typography mL="md" variation="title4Regular" capitalize>
                {category}
              </Typography>
            </Block>
            <FollowButton
              name={category}
              isFollowing={isFollowing}
              onFollowPress={onFollowPress}
              isLoading={isRefetching || fetchingFollowing}
            />
          </Block>
        </Block>
      ) : (
        <Block zIndex={10} absolute top={48} left={16} onPress={() => navigation.goBack()}>
          <ArrowLeft fill={theme.colors.white} width={24} height={24} />
        </Block>
      )}

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={40} // Adjust as needed
      >
        <Block relative>
          <Image imageStyle={{ width: '100%', height: getSize(250) }} uri={imageUrl} />
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            locations={[0.06, 0.9996]}
          />
        </Block>

        <CategoryHeader
          category={category}
          isFollow={isFollowing}
          onFollowPress={onFollowPress}
          onViewAllPress={onViewAllPress}
          followers={followers || []}
          fetchingFollowers={fetchingFollowers}
          isFollowLoading={isRefetching || fetchingFollowing}
          followersCount={stats?.followers.count as number}
        />

        <Block>{content}</Block>
      </ScrollView>
    </Block>
  )
}

export default GroupDetailScreen
