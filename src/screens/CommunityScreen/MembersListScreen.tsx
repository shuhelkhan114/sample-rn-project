import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as Sentry from '@sentry/react-native'
import { useInfiniteQuery } from '@tanstack/react-query'
import { StreamUser } from 'getstream'
import React from 'react'
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { useActivity } from '~/hooks/useActivity'
import { MainStackScreens, Screens } from '~/navigation/screens'
import MemberListCard from './_components/MemberListCard/MemberListCard'

type MembersListScreenProps = NativeStackScreenProps<MainStackScreens, Screens.MembersListScreen>

export type MembersListScreenParams = undefined

interface CommunityListPage {
  profiles: Array<StreamUser | undefined>
  nextPage: number | undefined
}

const MembersListScreen: React.FC<MembersListScreenProps> = (props) => {
  const { client } = useActivity()

  const fetchCommunityList = async ({
    pageParam = 0,
  }: {
    pageParam: number
  }): Promise<CommunityListPage> => {
    const limit = 20
    const followers = await client
      ?.feed('addiction', 'gambling')
      .followers({
        limit,
        offset: pageParam * limit,
      })
      .then((res) => res.results)
      .catch((err) => {
        Sentry.captureException(err)
      })

    if (followers && followers.length > 0) {
      const profiles = await Promise.all(
        followers.map(
          async (follower) =>
            client
              ?.user(follower.feed_id.split('user:')[1])
              ?.profile()
              .then((item) => item)
              .catch(() => {
                return undefined
              })
        )
      )
      return {
        profiles: profiles.filter((item) => typeof item === 'object' && item !== null),
        nextPage: followers.length === limit ? pageParam + 1 : undefined,
      }
    }

    return { profiles: [], nextPage: undefined }
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useInfiniteQuery<CommunityListPage, Error>({
    queryKey: ['communityList'],
    // @ts-ignore
    queryFn: async ({ pageParam = 0 }) => fetchCommunityList({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  })

  const renderItem: ListRenderItem<any> = ({ item: member }) => {
    return <MemberListCard member={member?.full} />
  }

  let content: React.ReactNode = null

  if (isLoading) {
    content = <ActivityIndicator />
  } else if (error) {
    content = <ErrorText error={error} />
  } else if (data) {
    const communityList = data.pages.flatMap((page) => page.profiles)

    if (communityList.length < 1) {
      content = <Typography>No Members</Typography>
    } else {
      content = (
        <FlatList
          data={communityList}
          onRefresh={refetch}
          renderItem={renderItem}
          refreshing={isRefetching}
          // @ts-ignore
          keyExtractor={(item) => item?.id}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage()
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        />
      )
    }
  }

  return (
    <Block flex1>
      <NavigationBar center title="All Members" />

      <Block pH="xl" flex1>
        {content}
      </Block>
    </Block>
  )
}

export default MembersListScreen
