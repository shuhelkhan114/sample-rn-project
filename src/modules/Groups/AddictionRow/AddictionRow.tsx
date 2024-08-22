import React from 'react'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import { getFormattedNumber } from '~/core/utils/common'

export interface AddictionRowProps {
  name: string
  followers?: number
  isFollowing: boolean
  loading?: boolean
  imageUrl: string
  canFollow?: boolean
  feedName: string
  onPress?: () => void
  onFollowPress?: () => void
}

const AddictionRow: React.FC<AddictionRowProps> = (props) => {
  const {
    name = 'Unknown',
    followers = 0,
    isFollowing = false,
    loading = false,
    canFollow = false,
    onPress,
    onFollowPress,
  } = props

  return (
    <Block onPress={onPress} flexDirection="row" align="center" pV="xl">
      <Block mR="auto">
        <Typography variation="descriptionSemiBold">{name}</Typography>
        <Typography color="gray700" mT="sm" variation="descriptionRegular">
          {getFormattedNumber(followers)} followers
        </Typography>
      </Block>
      {canFollow ? (
        <Block
          pH="lg"
          pV="sm"
          rounded="md"
          onPress={onFollowPress}
          bgColor={isFollowing ? 'gray100' : 'primary'}>
          {/* TODO: put opacity as prop to `Typography` component */}
          <Typography
            variation="paragraphSemiBold"
            style={{ opacity: loading ? 0.5 : 1 }}
            color={isFollowing ? 'gray500' : 'white'}>
            {loading ? 'Following...' : isFollowing ? 'Following' : 'Follow'}
          </Typography>
        </Block>
      ) : (
        <Block pH="lg" pV="md" rounded="md" bgColor="gray100">
          <Typography variation="descriptionSemiBold" color="gray500">
            View
          </Typography>
        </Block>
      )}
    </Block>
  )
}

export default AddictionRow
