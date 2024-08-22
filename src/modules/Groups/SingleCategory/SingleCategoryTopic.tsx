import React from 'react'
import { ActivityIndicator } from 'react-native'
import Block from '~/components/Block/Block'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { getFormattedNumber } from '~/core/utils/common'
import { getSize } from '~/core/utils/responsive'
import FollowButton from '../FollowButton/FollowButton'

interface CategoryHeaderProps {
  category: string
  isFollow?: boolean
  followersCount: number
  isFollowLoading?: boolean
  onFollowPress?: () => void
  onViewAllPress?: () => void
  // TODO: put type script in  followers props
  followers?: any[]
  fetchingFollowers?: boolean
}

const CategoryHeader: React.FC<CategoryHeaderProps> = (props) => {
  const {
    category,
    isFollow,
    followersCount,
    isFollowLoading,
    onFollowPress,
    onViewAllPress,
    followers,
    fetchingFollowers,
  } = props

  return (
    <Block>
      <Block mH="xl">
        <Block mT="xxxl" flexDirection="row" justify="space-between">
          <Typography variation="title3SemiBold" capitalize flex1>
            {category}
          </Typography>
          <Block flexDirection="row" align="center">
            <Block>
              <FollowButton
                name={category}
                isLoading={isFollowLoading}
                isFollowing={isFollow}
                onFollowPress={onFollowPress}
              />
            </Block>
            {/* <Block mR="xl">
              <FilterIcon fill={theme.colors.gray700} />
            </Block>
            <Block mR="xl">
              <CommentIcon />
            </Block>
            <DotMenuIcon /> */}
          </Block>
        </Block>

        {followersCount > 0 && (
          <Block
            bBW={1}
            bC="gray200"
            pV="xl"
            flexDirection="row"
            justify="space-between"
            align="center">
            <Block flexDirection="row" align="center">
              {fetchingFollowers ? (
                <Block relative flexDirection="row" align="center" width={100} height={44}>
                  {[1, 2, 3].map((image, index) => (
                    <Block
                      key={image}
                      absolute
                      width={getSize(40)}
                      height={getSize(40)}
                      align="center"
                      justify="center"
                      left={24 * index}
                      bC="white"
                      bgColor="gray200"
                      bW={2}
                      rounded="6xl">
                      <ActivityIndicator />
                    </Block>
                  ))}
                </Block>
              ) : (
                <Block relative flexDirection="row" align="center" width={100} height={44}>
                  {followers?.[0] ? (
                    followers?.slice(0, 3).map((follower, index) => (
                      <Block
                        key={follower.id}
                        absolute
                        left={24 * index}
                        bC="white"
                        bW={2}
                        rounded="6xl">
                        <Image
                          circular
                          size={getSize(40)}
                          uri={
                            follower.data?.yumeRole === 'recoverycoach' ||
                            follower.data?.yumeRevealedCommunity
                              ? follower.data?.yumeImage
                              : follower.data?.yumeAvatar
                          }
                        />
                      </Block>
                    ))
                  ) : (
                    <Typography variation="smallRegular">No Followers</Typography>
                  )}
                </Block>
              )}

              <Typography variation="descriptionRegular">
                {getFormattedNumber(followersCount)} followers
              </Typography>
            </Block>
            <Typography color="primary" variation="smallSemiBold" onPress={onViewAllPress}>
              VIEW ALL
            </Typography>
          </Block>
        )}
      </Block>
    </Block>
  )
}

export default CategoryHeader
