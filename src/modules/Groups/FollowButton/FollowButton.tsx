import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import { useActivity } from '~/hooks/useActivity'

interface FollowButtonProps {
  name: string
  isLoading?: boolean
  isFollowing?: boolean
  onFollowPress?: () => void
}

const FollowButton: React.FC<FollowButtonProps> = (props) => {
  const { name, isLoading = false, isFollowing, onFollowPress } = props
  const queryClient = useQueryClient()
  const { user } = useActivity()

  const { isPending: followingFeed, mutate: followFeed } = useMutation({
    mutationFn: async (feed: string) => {
      const followResponse = await user?.follow('addiction', feed)
      // Since the response only returns execution duration updating cache here.
      queryClient.setQueryData<Array<{ addiction: string }>>(
        ['following', user?.userId],
        (prevFollowing = []) => {
          return [
            ...prevFollowing,
            {
              addiction: feed,
            },
          ]
        }
      )
      return followResponse
    },
    onSuccess: () => {
      onFollowPress?.()
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
  //   onSuccess: () => {
  //     onFollowPress?.()
  //   },
  // })

  const handleToggleFollow = () => {
    const feed = name.toLowerCase()
    if (!isFollowing) {
      followFeed(feed)
    }
    // else {
    //   unfollowFeed(feed)
    // }
  }

  return (
    <Block
      pH="lg"
      pV="sm"
      rounded="md"
      onPress={handleToggleFollow}
      bgColor={isFollowing ? 'gray100' : 'primary'}>
      {/* TODO: put opacity as prop to `Typography` component */}
      {/* <Typography
        variation="paragraphSemiBold"
        style={{
          opacity: followingFeed || unfollowingFeed || fetchingFollowing || isRefetching ? 0.5 : 1,
        }}
        color={isFollowing ? 'gray500' : 'white'}>
        {followingFeed || unfollowingFeed || fetchingFollowing || isRefetching
          ? 'loading...'
          : isFollowing
          ? 'Following'
          : 'Follow'}
      </Typography> */}
      <Typography
        variation="paragraphSemiBold"
        style={{ opacity: followingFeed || isLoading ? 0.5 : 1 }}
        color={isFollowing ? 'gray500' : 'white'}>
        {followingFeed || isLoading ? 'Following...' : isFollowing ? 'Following' : 'Follow'}
      </Typography>
    </Block>
  )
}

export default FollowButton
