import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useMemo } from 'react'
import { ActivityIndicator, ListRenderItem, RefreshControl, SectionList } from 'react-native'
import Block from '~/components/Block/Block'
import Divider from '~/components/Divider/Divider'
import ErrorText from '~/components/ErrorText/ErrorText'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { constructFeedName } from '~/core/utils/common'
import { useActivity } from '~/hooks/useActivity'
import useAuth from '~/hooks/useAuth'
import { useConfig } from '~/hooks/useConfig'
import useAppTheme from '~/hooks/useTheme'
import AddictionItem from '~/modules/Groups/AddictionItem/AddictionItem'
import { MainStackScreens, Screens } from '~/navigation/screens'

interface Addiction {
  id: string
  name: string
  followers: number
  isFollowing: boolean
  imageUrl: string
}

type GroupsScreenProps = NativeStackScreenProps<MainStackScreens, Screens.CommunityScreen>

export type GroupsScreenParams = undefined

const GroupsScreen: React.FC<GroupsScreenProps> = (props) => {
  const theme = useAppTheme()
  const { currentUser } = useAuth()
  const { config } = useConfig()

  const { user } = useActivity()

  const {
    isPending: fetchingFollowing,
    error: fetchFollowingError,
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

  const addictions = useMemo(() => {
    const uniqueCategories: Record<string, Addiction & { canFollow: boolean; feedName: string }> =
      {}
    config?.addictions.forEach((addiction) => {
      const isFollowing = !!following?.find(
        (feed) => feed.addiction === constructFeedName(addiction.description)
      )
      console.log(constructFeedName(addiction.description), isFollowing)

      uniqueCategories[addiction.description] = {
        followers: 0,
        id: addiction.id,
        isFollowing,
        canFollow: !isFollowing,
        name: addiction.description,
        imageUrl: addiction.cover_image,
        feedName: constructFeedName(addiction.description),
      }
    })
    return Object.values(uniqueCategories)
  }, [currentUser.parent_addictions, following])

  const yourAddictions = addictions.filter((addiction) => addiction.isFollowing)

  const renderItem: ListRenderItem<Addiction & { canFollow: boolean; feedName: string }> = (
    params
  ) => {
    const { item: addiction } = params

    return (
      <AddictionItem
        key={addiction.id}
        name={addiction.name}
        feedName={addiction.feedName}
        imageUrl={addiction.imageUrl}
        canFollow={addiction.canFollow}
        isFollowing={addiction.isFollowing}
      />
    )
  }

  let content: React.ReactNode = null

  if (fetchingFollowing) {
    content = <ActivityIndicator />
  } else if (fetchFollowingError) {
    content = <ErrorText error={fetchingFollowing} />
  } else if (following) {
    const sections = [
      {
        key: '1',
        renderItem,
        data: yourAddictions.filter((addiction) => addiction.feedName === 'gambling'),
        title: 'Your communities',
        ItemSeparatorComponent: () => <Divider />,
        ListEmptyComponent: () => <Typography>No communities!</Typography>,
      },
    ]

    content = (
      <SectionList
        stickySectionHeadersEnabled={false}
        style={{ paddingHorizontal: theme.spacing.xxl }}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        renderSectionHeader={({ section }) => (
          <Fragment>
            <Typography mT="xxxl" mB="md" variation="paragraphSemiBold">
              {section.title}
            </Typography>
            {section.data.length < 1 && <Typography>No communities!</Typography>}
          </Fragment>
        )}
        sections={sections}
      />
    )
  }

  return (
    <Block flex1>
      <NavigationBar title="Categories" arrow={false} />
      <Block pH="xl">
        <Typography variation="smallRegular" color="gray500">
          In order to post in these groups, please update your addictions & mental health in your
          profile.
        </Typography>
      </Block>
      {content}
    </Block>
  )
}

export default GroupsScreen
