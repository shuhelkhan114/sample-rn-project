import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { getPostCardProps } from '~/core/utils/components'
import { useActivity } from '~/hooks/useActivity'
import useAuth from '~/hooks/useAuth'
import PostCard from '~/models/home/PostCard'
import { Post } from '~/typings/stream'

interface PostsTabProps {
  userId: string
}

const PostsTab: React.FC<PostsTabProps> = (props) => {
  const { userId } = props

  const { client } = useActivity()
  const { currentUser } = useAuth()

  const {
    isPending: fetchingPosts,
    error: postsError,
    data: posts,
  } = useQuery({
    queryKey: ['user/posts', userId],
    queryFn: async () => {
      return await client
        ?.feed('user', userId)
        .get({ enrich: true, user_id: userId })
        .then((res) =>
          (res.results as unknown as Post[]).filter((post) => post.actor.id === userId)
        )
    },
  })

  let content: React.ReactNode = null

  if (fetchingPosts) {
    content = <ActivityIndicator />
  } else if (postsError) {
    content = <ErrorText error={postsError} />
  } else if (!posts?.length) {
    content = <Typography>No posts found!</Typography>
  } else if (posts) {
    content = posts.map((post) => (
      <PostCard key={post.id} {...getPostCardProps(post, currentUser.id)} />
    ))
  }

  return (
    <Block flex1>
      <ScrollView>{content}</ScrollView>
    </Block>
  )
}

export default PostsTab
