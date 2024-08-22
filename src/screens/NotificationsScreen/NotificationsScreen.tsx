import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import React, { Fragment } from 'react'
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { useActivity } from '~/hooks/useActivity'
import { MainStackScreens, Screens } from '~/navigation/screens'
import CommentNotification from './NotificationRow/CommentNotification/CommentNotification'
import NewPostRow from './NotificationRow/PostNotification/PostNotification'

type NotificationsScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.NotificationsScreen
>

export type NotificationsScreenParams = undefined

const NotificationsScreen: React.FC<NotificationsScreenProps> = (props) => {
  const { client } = useActivity()

  const {
    isPending: fetchingNotifications,
    error: fetchingNotificationsError,
    data: notifications,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      return client
        ?.feed('notification', client.userId)
        .get({
          mark_seen: true,
          limit: 200,
        })
        .then((res) => {
          return (
            res.results
              .map((notification) => notification.activities)
              .flat()
              // @ts-ignore
              .sort((n1, n2) => new Date(n2.time).getTime() - new Date(n1.time).getTime())
          )
        })
    },
  })

  const renderItem: ListRenderItem<any> = (params) => {
    const { item: notification } = params

    if (notification.verb === 'tweet') {
      return <NewPostRow key={notification.id} post={notification} />
    }

    if (notification.verb === 'comment') {
      return <CommentNotification key={notification.id} comment={notification} />
    }

    return <Fragment />
  }

  let content: React.ReactNode = null

  if (fetchingNotifications) {
    content = <ActivityIndicator />
  } else if (fetchingNotificationsError) {
    content = <ErrorText error={fetchingNotificationsError} />
  } else if (notifications) {
    if (notifications.length < 1) {
      content = <Typography>No notifications</Typography>
    } else {
      content = (
        <FlatList
          data={notifications}
          onRefresh={refetch}
          renderItem={renderItem}
          refreshing={isRefetching}
          // @ts-ignore
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )
    }
  }

  return (
    <Block flex1>
      <NavigationBar title="Notifications" />

      <Block pH="xl" flex1>
        {content}
      </Block>
    </Block>
  )
}

export default NotificationsScreen
