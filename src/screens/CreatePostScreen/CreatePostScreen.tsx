import { useKeyboard } from '@react-native-community/hooks'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormikProvider, useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import Divider from '~/components/Divider/Divider'
import { DropDownOption } from '~/components/DropDown/DropDown'
import ChevronBottom from '~/components/Icons/ChevronBottom'
import Image from '~/components/Image/Image'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import Link from '~/components/Link/Link'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import FormikDropdown from '~/components/formik/FormikDropdown/FormikDropdown'
import { getOptionsForSecondSelect } from '~/core/config/categories'
import { ReactQueryKeys } from '~/core/config/reactQueryKeys'

import toast from '~/core/lib/toast'
import { capitalizeFirstLetter, constructFeedName } from '~/core/utils/common'
import { getSize } from '~/core/utils/responsive'
import { getCommonStringValidationSchema } from '~/core/validation/atoms'
import { useActivity } from '~/hooks/useActivity'
import { useApp } from '~/hooks/useApp'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

interface CreatePostParams {
  title: string
  description: string
  category: string
  postType: string
}

enum Fields {
  Title = 'title',
  Description = 'description',
  Category = 'category',
  PostType = 'postType',
}

const validationSchema = Yup.object({
  [Fields.Title]: getCommonStringValidationSchema('Title'),
  [Fields.Description]: getCommonStringValidationSchema('Description', 5000),
  [Fields.Category]: getCommonStringValidationSchema('Category'),
  [Fields.PostType]: getCommonStringValidationSchema('Post Type'),
})

type CreatePostScreenProps = NativeStackScreenProps<MainStackScreens, Screens.CreatePostScreen>

export type CreatePostScreenParams = undefined

const CreatePostScreen: React.FC<CreatePostScreenProps> = (props) => {
  const { navigation } = props
  const keyboard = useKeyboard()
  const { top } = useSafeAreaInsets()

  const queryClient = useQueryClient()
  const { currentUser } = useAuth()
  const { setRecentlyCreatedPost } = useApp()
  const { user, client } = useActivity()
  const [subOption, setSubOption] = useState<any[]>()

  const theme = useAppTheme()

  const initialValues = {
    [Fields.Title]: __DEV__ ? '' : '',
    [Fields.Description]: __DEV__ ? '' : '',
    [Fields.Category]: '',
    [Fields.PostType]: '',
  }

  const { isPending, mutateAsync: createPost } = useMutation({
    mutationFn: async (params: CreatePostParams) => {
      const { title, description, category, postType } = params
      const feedGroup = constructFeedName(category)

      const activity = {
        title,
        category,
        postType,
        verb: 'tweet',
        tweet: description,
        object: Date.now(),
        actor: `SU:${user?.userId}`,
        time: new Date().toISOString(),
        to: [`notification:${feedGroup}`],
        createdAt: new Date().toISOString(),
      }

      let feed: [string, string] = ['addiction', feedGroup]

      // post into global yume feed so that it's visible to everyone, `yume` is admin account
      if (currentUser.username?.toLowerCase() === 'yume') {
        feed = ['yume', 'yume']
      }

      return await client?.feed(...feed).addActivity(activity)
    },
    onSuccess(response) {
      // update has one post for showing create post card on home screen
      const hasOnePost = queryClient.getQueryData(['hasOnePost'])

      if (!hasOnePost) {
        queryClient.setQueryData(['hasOnePost'], () => true)
      }

      if (response) {
        setRecentlyCreatedPost(response)
      }

      queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.Feed, user?.id] })

      toast.success('Post', 'Post added successfully')
      formik.setFieldValue(Fields.Title, '')
      formik.setFieldValue(Fields.Description, '')
      // @ts-ignore
      navigation.navigate('CommunityStack')
    },
    onError(error: any) {
      toast.error('Post', error.message)
    },
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      if (!isPending) {
        createPost({
          title: values.title.trim(),
          description: values.description.trim(),
          category: values.category,
          postType: values.postType,
        })
      }
    },
  })

  const categoryOptions = useMemo(() => {
    if (currentUser.username?.toLowerCase() === 'yume') {
      return [
        {
          label: 'yume',
          value: 'yume',
        },
      ]
    }
    const uniqueCategories: Record<string, DropDownOption> = {}
    //  for user
    currentUser?.parent_addictions.forEach((addiction) => {
      uniqueCategories[addiction.description] = {
        label: addiction.description,
        value: addiction.description,
      }
    })
    // for recovery coach
    currentUser?.parent_addictions.forEach((addiction) => {
      uniqueCategories[addiction.description] = {
        label: addiction.description,
        value: addiction.description,
      }
    })

    return Object.values(uniqueCategories).filter(
      (category) => category?.value?.toLocaleLowerCase()?.includes('gambling')
    )
  }, [currentUser?.parent_addictions])

  useEffect(() => {
    if (categoryOptions?.[0]?.value) {
      formik.setFieldValue(Fields.Category, categoryOptions[0]?.value)
    }
  }, [categoryOptions])

  const { setFieldValue, values } = formik

  const style = StyleSheet.create({
    titleInput: {
      fontSize: getSize(20),
      paddingHorizontal: theme.spacing.xxxl,
    },
    descriptionInput: {
      fontSize: getSize(16),
      paddingHorizontal: theme.spacing.xxxl,
      marginBottom: theme.spacing.xxxl,
      marginTop: theme.spacing.xxxl,
      paddingBottom: getSize(100),
    },
  })

  useEffect(() => {
    const data =
      currentUser.username?.toLowerCase() === 'yume'
        ? [
            {
              label: 'App Update',
              value: 'App Update',
            },
            {
              label: 'Celebration',
              value: 'celebration',
            },
          ]
        : getOptionsForSecondSelect(categoryOptions[0]?.value.toLocaleLowerCase())
    formik.setFieldValue(Fields.PostType, data[0]?.value)
    setSubOption(data)
  }, [currentUser.username])

  return (
    <FormikProvider value={formik}>
      <KeyboardView>
        <ScrollView>
          <Block flex1 style={{ paddingTop: top }}>
            <Block pV="xl" pH="xxxl" flexDirection="row" align="center">
              <Typography variation="title5SemiBold" mR="auto">
                Post
              </Typography>
              <Link
                color={formik.isValid ? 'primary' : 'backgroundPrimary'}
                disabled={!formik.isValid}
                onPress={formik.submitForm}
                variation="descriptionSemiBold">
                {isPending ? 'Publishing...' : 'Publish'}
              </Link>
            </Block>

            <Block pH="xxxl" pV="xxxl" flexDirection="row">
              <Image mT={'xl'} size={48} circular uri={currentUser.displayImage} />
              <Block mH="xl">
                <Typography color="black" variation="descriptionSemiBold">
                  {currentUser.displayName}
                </Typography>
                <Block pR="xl" flexDirection="row" wrap>
                  {/* TODO: deprecate `renderField` method instead opt into visible/non-visible boolean state */}
                  {currentUser?.username === 'yume' && (
                    <Block mT="lg">
                      <FormikDropdown
                        name={Fields.Category}
                        options={categoryOptions}
                        onSelect={(e) => {
                          const valueOption = getOptionsForSecondSelect(e.toLocaleLowerCase())
                          setSubOption(valueOption)
                          formik.setFieldValue(Fields.Category, e)
                          formik.setFieldValue(Fields.PostType, valueOption?.[0]?.value)
                        }}
                        modalTitle="Select Category"
                        renderField={({ openModal }) => {
                          return (
                            <Block
                              pH="lg"
                              mR="md"
                              pV="sm"
                              rounded="lg"
                              align="center"
                              bgColor="gray200"
                              flexDirection="row"
                              onPress={openModal}>
                              <Typography variation="descriptionRegular">
                                {values.category}
                              </Typography>
                              <ChevronBottom />
                            </Block>
                          )
                        }}
                      />
                    </Block>
                  )}
                  <Block mT="lg">
                    <FormikDropdown
                      name={Fields.PostType}
                      options={subOption || []}
                      modalTitle=""
                      renderField={({ openModal }) => {
                        return (
                          <Block
                            pH="lg"
                            mR="md"
                            pV="sm"
                            rounded="lg"
                            align="center"
                            flexDirection="row"
                            bgColor="green100"
                            onPress={() => {
                              openModal()
                            }}>
                            <Typography variation="descriptionRegular">
                              {capitalizeFirstLetter(values.postType)}
                            </Typography>
                            <ChevronBottom />
                          </Block>
                        )
                      }}
                    />
                  </Block>
                </Block>
              </Block>
            </Block>

            <Block pV="lg" pH="xxxl">
              <Divider />
            </Block>

            <Block flex1>
              <TextInput
                multiline
                value={values.title}
                placeholder="Title of your story"
                style={style.titleInput}
                onChangeText={async (text) => await setFieldValue(Fields.Title, text)}
              />

              <TextInput
                multiline
                value={values.description}
                onChangeText={async (text) => await setFieldValue(Fields.Description, text)}
                placeholder="What story would you like to share?"
                style={style.descriptionInput}
              />
            </Block>
            {keyboard.keyboardShown && (
              <Block pH="xl" pV="xxl">
                <Button
                  variation={formik.isValid ? 'primary' : 'secondary'}
                  title={isPending ? 'Publishing...' : 'Publish'}
                  onPress={formik.submitForm}
                />
              </Block>
            )}
          </Block>
        </ScrollView>
      </KeyboardView>
    </FormikProvider>
  )
}

export default CreatePostScreen
