import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import Modal from '~/components/Modal/Modal'
import ScrollView from '~/components/ScrollView/ScrollView'
import { UserRole } from '~/context/AuthContext'
import { ReactQueryKeys } from '~/core/config/reactQueryKeys'
import { getPostCardProps } from '~/core/utils/components'
import { useActivity } from '~/hooks/useActivity'
import { useApp } from '~/hooks/useApp'
import useAuth from '~/hooks/useAuth'
import CreateCard from '~/models/home/CreateCard'
import PostCard from '~/models/home/PostCard'
import { MainStackScreens, Screens } from '~/navigation/screens'
import { Post } from '~/typings/stream'
import GroupsScreen from './GroupsScreen'
import UserBio from './_components/Bio/UserBio'
import Header from './_components/Header'

type CommunityScreenProps = NativeStackScreenProps<MainStackScreens, Screens.CommunityScreen>

export type CommunityScreenParams = undefined

const CommunityScreen: React.FC<CommunityScreenProps> = (props) => {
  const { navigation, route } = props
  const { user, client } = useActivity()
  const { recentlyCreatedPost, setRecentlyCreatedPost } = useApp()
  const { state, currentUser } = useAuth()
  const [isBioModalVisible, setIsBioModalVisible] = useState<boolean>(!currentUser.user_bio)

  const handleCreatePost = () => {
    // @ts-ignore
    navigation.navigate('CreateStack')
  }

  const { data: hasOnePost, refetch: refetchHasOnePost } = useQuery({
    enabled: !!client,
    queryKey: ['hasOnePost'],
    queryFn: async () => {
      return (
        client
          ?.feed('user', user?.userId)
          .get({ enrich: true, user_id: user?.userId })
          .then((res) => {
            return (
              (res.results as unknown as Post[]).filter((post) => post.actor.id === user?.userId)
                .length > 0
            )
          }) || true
      )
    },
  })

  const {
    isPending,
    error,
    data: posts,
    isRefetching,
    refetch: refetchPosts,
  } = useQuery({
    enabled: !!user,
    queryKey: [ReactQueryKeys.Feed, user?.id],
    queryFn: async () => {
      return (
        user
          ?.get({
            limit: 500,
            ownReactions: true,
            withOwnReactions: true,
            withReactionCounts: true,
          })
          .then((res) => res.results as unknown as Post[]) || []
      )
    },
  })

  const handleCreateCheckin = () => {
    navigation.navigate(Screens.CreateCheckinScreen)
  }

  useEffect(() => {
    if (recentlyCreatedPost) {
      setTimeout(() => {
        setRecentlyCreatedPost(null)
      }, 5000)
    }
  }, [recentlyCreatedPost])

  const handleRefetch = () => {
    refetchHasOnePost()
    refetchPosts()
  }

  useEffect(() => {
    handleRefetch()
  }, [user])

  const renderPostList = (partialPosts: Post[]) => {
    return partialPosts.map((post, index) => (
      <PostCard
        lastPost={index + 1 === partialPosts?.length}
        key={post.id}
        {...getPostCardProps(post, currentUser?.id)}
        recentlyCreated={recentlyCreatedPost?.id === post.id}
      />
    ))
  }

  let content: React.ReactNode = null

  if (isPending) {
    content = <ActivityIndicator />
  } else if (error) {
    content = <ErrorText error={error} />
  } else if (posts) {
    content = (
      <Block flex1>
        {renderPostList(posts.slice(0, 2))}

        {!hasOnePost && (
          <Block pH="xl" pB={posts ? 'xl' : 'xs'}>
            <CreateCard
              buttonTitle="Create Post"
              title="Share Your Starting Point"
              description="Begin your journey by sharing your story. Let's support each other and pave the way to a
              life free from addiction. Together, we're stronger."
              onButtonClick={handleCreatePost}
            />
          </Block>
        )}

        {renderPostList(posts?.slice(2, 4))}

        {state.role === UserRole.User && !currentUser?.checkins?.[0] && (
          <Block pH="xl">
            <CreateCard
              buttonTitle="Create Checkin"
              title="Create your first checkin"
              description="Checkins are a way to keep you motivated to stay addiction free for alcohol and gambling"
              onButtonClick={handleCreateCheckin}
            />
          </Block>
        )}

        {renderPostList(posts?.slice(4, 100))}
      </Block>
    )
  }

  if (state.role === UserRole.RecoveryCoach || state.role === UserRole.FinancialManager) {
    return <GroupsScreen navigation={navigation} route={route} />
  }

  return (
    <Block>
      <Header />
      <Modal
        closeIcon={true}
        position="center"
        visible={isBioModalVisible}
        onClose={() => setIsBioModalVisible(false)}>
        <UserBio onSubmit={() => setIsBioModalVisible(false)} />
      </Modal>

      <ScrollView refreshing={isRefetching} onRefresh={handleRefetch}>
        {content}
      </ScrollView>
    </Block>
  )
}

export default CommunityScreen
