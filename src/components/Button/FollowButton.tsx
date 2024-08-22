import React from 'react'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'

interface FollowButtonProps {
  isFollowing?: boolean
}

const FollowButton: React.FC<FollowButtonProps> = (props) => {
  const { isFollowing = false } = props

  return (
    <Block
      pH="lg"
      pV="sm"
      rounded="xl"
      onPress={() => {}}
      bgColor={isFollowing ? 'white' : 'primary'}>
      <Typography color={isFollowing ? 'black' : 'white'} variation="descriptionSemiBold">
        {isFollowing ? 'Following' : 'Follow'}
      </Typography>
    </Block>
  )
}

export default FollowButton
