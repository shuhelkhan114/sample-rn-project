import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import Image from '~/components/Image/Image'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { UserRole } from '~/context/AuthContext'
import { getSize } from '~/core/utils/responsive'
import { useActivity } from '~/hooks/useActivity'
import { MainStackScreens, Screens } from '~/navigation/screens'

type AllFollowingUserScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.AllFollowingUserScreen
>

export type AllFollowingUserScreenParams = {
  category: string
  feedName: string
}

const AllFollowingUserScreen: React.FC<AllFollowingUserScreenProps> = (props) => {
  const { route, navigation } = props
  const { category, feedName } = route.params
  const { bottom } = useSafeAreaInsets()

  const { client } = useActivity()

  const {
    isPending: fetchingFollowers,
    error: fetchingFollowersError,
    data: followers,
    isRefetching: refetchingFollowers,
    refetch: refetchFollowers,
  } = useQuery({
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

  const handleProfilePress = (userId: string, role: UserRole) => {
    navigation.navigate(Screens.PublicProfileScreen, { userId, role })
  }

  let content: React.ReactNode = null

  if (fetchingFollowers) {
    content = <ActivityIndicator />
  } else if (fetchingFollowersError) {
    content = <ErrorText error={fetchingFollowersError} />
  } else if (!followers?.[0]) {
    content = <Typography>No followers found!</Typography>
  } else if (followers?.[0]) {
    content = (
      <Block flex1 bTW={1} bC="gray200" pT="xl" pL="xl" style={{ paddingBottom: bottom + 100 }}>
        {followers?.map((follower: any) => {
          const userDetails = follower?.data

          return (
            <Block
              key={userDetails?.yumeUserName}
              pV="xl"
              bBW={1}
              bC="gray200"
              align="center"
              flexDirection="row"
              onPress={() => handleProfilePress(follower.id, userDetails.yumeRole)}>
              <Image
                circular
                size={getSize(40)}
                uri={
                  userDetails?.yumeRole === 'recoverycoach' || userDetails?.yumeRevealedCommunity
                    ? userDetails?.yumeImage
                    : userDetails?.yumeAvatar
                }
              />
              <Block mL="xl">
                <Typography variation="paragraphSemiBold">
                  {userDetails?.yumeRole === 'recoverycoach' || userDetails?.yumeRevealedCommunity
                    ? userDetails?.yumeName
                    : userDetails?.yumeUserName}
                </Typography>
              </Block>
            </Block>
          )
        })}
      </Block>
    )
  }

  return (
    <Block>
      <NavigationBar title={category} />
      <ScrollView refreshing={refetchingFollowers} onRefresh={refetchFollowers}>
        {content}
      </ScrollView>
    </Block>
  )
}

export default AllFollowingUserScreen
