import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import React, { Fragment, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native'
import { ChevronLeft, MoreVertical } from 'react-native-feather'
import { FlatList } from 'react-native-gesture-handler'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import toast from '~/core/lib/toast'
import { getErrorMessage } from '~/core/utils/apiError'
import { getPostCardProps } from '~/core/utils/components'
import { getSize } from '~/core/utils/responsive'
import { useActivity } from '~/hooks/useActivity'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import PostCard from '~/models/home/PostCard'
import CommentItem from '~/modules/common/CommentItem'
import { MainStackScreens, Screens } from '~/navigation/screens'
import { Comment, Post } from '~/typings/stream'

interface PostCommentParams {
  activityId: string
  reactionId?: string
  comment: string
}

type PostDetailScreenProps = NativeStackScreenProps<MainStackScreens, Screens.PostDetailScreen>

export type PostDetailScreenParams = {
  postId: string
  /** used for highlighting purpose if user is coming from notification */
  commentId?: string
}

const PostDetailScreen: React.FC<PostDetailScreenProps> = (props) => {
  const { route, navigation } = props
  const { postId, commentId } = route.params

  // const scrollViewRef = useRef<NativeScrollView>(null)
  const targetCommentRef = useRef<View>(null)

  const { top } = useSafeAreaInsets()
  const inputRef = useRef<TextInput | null>(null)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [replyingToText, setReplyingToText] = useState('')
  const [commentText, setCommentText] = useState('')

  const { bottom } = useSafeAreaInsets()

  const theme = useAppTheme()

  const { client } = useActivity()
  const { currentUser } = useAuth()

  const styles = useMemo(
    () =>
      StyleSheet.create({
        footerContainer: {
          bottom: 0,
          width: '100%',
          borderTopWidth: 2,
          position: 'absolute',
          backgroundColor: 'white',
          paddingVertical: theme.spacing.xl,
          paddingHorizontal: theme.spacing.xl,
          borderTopColor: theme.colors.gray200,
          paddingBottom: isInputFocused ? theme.spacing.xl : bottom,
        },
        inputBox: {
          width: '100%',
          paddingTop: theme.spacing.xl,
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.xl,
          backgroundColor: theme.colors.gray100,
          borderRadius: 8,
          fontSize: 16,
        },
      }),
    [isInputFocused]
  )

  const {
    isPending: fetchingPost,
    error: errorFetchingPost,
    data: post,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      return await client
        ?.feed('user', client.userId)
        .getActivityDetail(postId, {
          ownReactions: true,
          withOwnReactions: true,
          withReactionCounts: true,
          withOwnChildren: true,
          withRecentReactions: true,
          enrich: true,
          recentReactionsLimit: 25,
        })
        .then((res) => res.results[0] as unknown as Post)
    },
  })

  const {
    isPending: fetchingComment,
    error: commentError,
    data: comments,
    fetchNextPage: fetchingCommentNextPage,
    isFetchingNextPage: isFetchingCommentNextPage,
    refetch: refetchComments,
    // isRefetching,
  } = useInfiniteQuery({
    queryKey: ['comment', postId],
    refetchInterval: 1000,
    queryFn: async ({ pageParam }) => {
      const comments = await client?.reactions.filter({
        kind: 'comment',
        activity_id: postId,
        limit: 25,
        id_lt: pageParam,
        with_own_children: true,
        with_activity_data: true,
      })
      return comments?.results
    },
    initialPageParam: '',
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.[24]?.id
    },
  })

  const { isPending: postingComment, mutate: comment } = useMutation({
    mutationFn: async (params: PostCommentParams) => {
      const { activityId, reactionId, comment } = params

      const targetFeeds = []
      if (post?.actor.id !== currentUser.id) {
        targetFeeds.push(`notification:${post?.actor.id}`)
      }

      if (reactionId) {
        setSelectedComment(null)
        return await client?.reactions.addChild(
          'comment',
          reactionId,
          {
            text: comment.trim(),
          },
          { targetFeeds }
        )
      }

      return await client?.reactions.add(
        'comment',
        activityId,
        { text: comment.trim() },
        { targetFeeds }
      )
    },
    onSuccess() {
      setCommentText('')
      refetchComments()
    },
  })

  const handlePostComment = () => {
    if (commentText.trim()) {
      comment({
        activityId: postId,
        comment: commentText,
        ...(selectedComment && { reactionId: selectedComment.id }),
      })
    }
  }

  // const scrollToComment = () => {
  //   // TODO: temp fix for now
  //   if (targetCommentRef?.current) {
  //     targetCommentRef?.current?.measureLayout?.(
  //       scrollViewRef.current as any,
  //       (x: number, y: number) => {
  //         scrollViewRef?.current?.scrollTo?.({ x: 0, y, animated: true })
  //       },
  //       () => {}
  //     )
  //   }
  // }

  // useEffect(() => {
  //   if (commentId) {
  //     scrollToComment()
  //   }
  // }, [commentId, targetCommentRef?.current, scrollViewRef?.current])

  const handleBlur = () => {
    setIsInputFocused(false)
    setSelectedComment(null)
  }

  const handleShare = () => {
    toast.show('In progress', 'Work in progress!')
  }

  const handleReport = () => {
    toast.show('Post has been reported', 'Thank you. We are looking into it!')
  }

  const renderItem = ({ item }: { item: Comment }) => {
    const handleReply = () => {
      setSelectedComment(item)
      inputRef.current?.focus()
    }
    return (
      <Block
        key={item.id}
        // @ts-ignore
        ref={item.id === commentId ? targetCommentRef : undefined}>
        <CommentItem
          comment={item}
          onReply={handleReply}
          refetch={refetchComments}
          setReplyingToText={setReplyingToText}
          notificationCommentId={commentId}
        />
      </Block>
    )
  }

  let content: React.ReactNode = null

  if (fetchingPost) {
    content = <ActivityIndicator />
  } else if (errorFetchingPost) {
    content = <Typography>Error fetching post details.</Typography>
  } else if (post) {
    content = (
      <Fragment>
        <Block mV="xl">
          <PostCard
            disabled
            key={post.id}
            showFullContent
            {...getPostCardProps(post, currentUser.id)}
          />
        </Block>
        <Block
          flex1
          style={{
            paddingBottom: isInputFocused ? getSize(selectedComment ? 180 : 120) : getSize(100),
          }}>
          {!fetchingComment && (
            <FlatList
              // refreshControl={
              //   <RefreshControl refreshing={isRefetching} onRefresh={refetchComments} />
              // }
              renderItem={renderItem}
              onEndReached={() => {
                fetchingCommentNextPage()
              }}
              data={[].concat(...(comments?.pages as any[])) || []}
            />
          )}
          {fetchingComment ||
            (isFetchingCommentNextPage && (
              <Block flexDirection="row" justify="center" pV="lg">
                <ActivityIndicator />
              </Block>
            ))}
          {commentError && <ErrorText error={getErrorMessage(commentError)} />}
        </Block>
      </Fragment>
    )
  }

  return (
    <KeyboardView>
      <Block flex1 bgColor="gray100">
        <Block
          pV="xl"
          pH="xl"
          align="center"
          bgColor="white"
          flexDirection="row"
          justify="space-between"
          style={{ paddingTop: top }}>
          <Block flexDirection="row" align="center" justify="space-between" flex1>
            <Block onPress={navigation.goBack}>
              <ChevronLeft fontSize={24} color={theme.colors.gray900} />
            </Block>

            <Typography mL="md" variation="title6SemiBold">
              Detail
            </Typography>
            <Block opacity={0}>
              <Menu>
                <MenuTrigger>
                  <MoreVertical color={theme.colors.gray500} />
                </MenuTrigger>
                <MenuOptions
                  optionsContainerStyle={{
                    paddingVertical: theme.spacing.sm,
                    borderRadius: theme.rounded.xl,
                    marginTop: theme.spacing.xxxl,
                  }}>
                  <MenuOption onSelect={handleShare}>
                    <Typography pV="md" pH="xl" variation="descriptionRegular">
                      Share
                    </Typography>
                  </MenuOption>
                  <MenuOption onSelect={handleReport}>
                    <Typography pV="md" pH="xl" variation="descriptionRegular">
                      Report
                    </Typography>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </Block>
          </Block>
        </Block>

        <ScrollView>{content}</ScrollView>

        <Block style={styles.footerContainer}>
          {selectedComment && (
            <Block mB="md">
              <Typography color="primary" variation="descriptionSemiBold">
                Replying to:
              </Typography>

              <Typography>{replyingToText}</Typography>
            </Block>
          )}
          <TextInput
            multiline
            ref={inputRef}
            value={commentText}
            onBlur={handleBlur}
            style={styles.inputBox}
            placeholder="Add a comment"
            editable={!postingComment}
            onChangeText={setCommentText}
            onFocus={() => setIsInputFocused(true)}
          />
          {isInputFocused && (
            <Block flexDirection="row" mT="md" justify="space-between" align="center">
              <Block />
              <Block pH="lg" pV="sm" bgColor="primary" rounded="xxxl" onPress={handlePostComment}>
                <Typography variation="descriptionSemiBold" color="white">
                  Reply
                </Typography>
              </Block>
            </Block>
          )}
        </Block>
      </Block>
    </KeyboardView>
  )
}

export default PostDetailScreen
