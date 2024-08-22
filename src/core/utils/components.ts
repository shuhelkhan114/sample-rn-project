import { PostCardProps } from '~/models/home/PostCard'
import { Post } from '~/typings/stream'
import { getImageUrl, getName } from './common'

export const getPostCardProps = (post: Post, currentUserId?: string): PostCardProps => {
  const props: PostCardProps = {
    id: post.id,
    title: post.title,
    userId: post.actor?.id,
    description: post.tweet,
    category: post.category,
    postType: post.postType,
    createdAt: post.createdAt,
    userRole: post.actor.data?.yumeRole,
    recentlyCreated: post.recentlyCreated,
    upvotesCount: post.reaction_counts?.like,
    commentsCount: post.reaction_counts?.comment,
    hasUpvoted: !!post.own_reactions?.like?.length,
    ownReactionId: post.own_reactions?.like?.[0]?.id,
    isCreatedByAdmin: post.actor?.data?.yumeUserName?.toLowerCase() === 'yume',
    username:
      post.actor.id === currentUserId ? 'You' : getName(post.actor?.data as any, currentUserId),
    userImage: getImageUrl(post.actor?.data as any, currentUserId),
  }

  return props
}
