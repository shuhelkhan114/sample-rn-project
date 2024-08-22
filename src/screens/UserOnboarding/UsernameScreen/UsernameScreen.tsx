import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import EditIcon from '~/components/Icons/EditIcon'
import NoneIcon from '~/components/Icons/NoneIcon'
import ReloadIcon from '~/components/Icons/ReloadIcon'
import Image from '~/components/Image/Image'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import Modal from '~/components/Modal/Modal'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { AuthContext } from '~/context/AuthContext'
import { ConfigContext } from '~/context/ConfigContext'
import { analytics } from '~/core/lib/analytics'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getErrorMessage } from '~/core/utils/apiError'
import { getRandomInt } from '~/core/utils/common'
import SelectAvatar from '~/modules/Auth/SelectAvatar/SelectAvatar'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type UsernameScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.UsernameScreen>

export type UsernameScreenParams = undefined

const UsernameScreen: React.FC<UsernameScreenProps> = (props) => {
  const { navigation } = props
  const { state } = useContext(AuthContext)
  const { config } = useContext(ConfigContext)
  const [username, setUsername] = useState<string>('')
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState('')
  const [allAvatarModalVisible, setAllAvatarModalVisible] = useState(false)

  const { bottom } = useSafeAreaInsets()

  useEffect(() => {
    if (config?.user_profile_avatars?.length) {
      setSelectedAvatarUrl(
        config?.user_profile_avatars[getRandomInt(0, config?.user_profile_avatars.length - 1)]
      )
    }
  }, [config?.user_profile_avatars])

  const { isPending: refreshingUsername, mutate: refreshUsername } = useMutation({
    mutationFn: API.user.fetchUsername,
    onSuccess(res) {
      setUsername(res)
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      analytics.logChooseAvatar()

      navigation.navigate(Screens.DateOfBirthScreen)
    },
    onError(error: any) {
      toast.error('Profile', getErrorMessage(error))
    },
  })

  useEffect(() => {
    if (state?.user?.user_name) {
      setUsername(state?.user?.user_name)
    }
    if (state?.user?.avatar_image) {
      setSelectedAvatarUrl(state?.user?.avatar_image)
    }
  }, [state?.user])

  const handleRefreshUsername = () => {
    if (!refreshingUsername) {
      refreshUsername()
    }
  }

  const handleAvatar = () => {
    setAllAvatarModalVisible(true)
  }

  const handleSubmit = () => {
    updateProfile({
      user_name: username,
      avatar_image: selectedAvatarUrl,
    })
  }

  const handelChange = (text: string) => {
    setUsername(text)
  }

  const handleAvatarSelect = (url: string) => {
    setSelectedAvatarUrl(url)
    setAllAvatarModalVisible(false)
  }

  return (
    <Block flex1 style={{ paddingBottom: bottom }}>
      <KeyboardView>
        <Modal visible={allAvatarModalVisible} onClose={setAllAvatarModalVisible}>
          <SelectAvatar onSelect={handleAvatarSelect} />
        </Modal>
        <Block flex1>
          <NavigationBar />
          <Block flex1 mH="xl" mB="xl">
            <Typography variation="title3SemiBold">Choose Username</Typography>

            <Block mT="xxxl" mH="md" mB="auto">
              <Block align="center">
                {!selectedAvatarUrl ? (
                  <Block height={80} width={80} justify="center" align="center">
                    <ActivityIndicator />
                  </Block>
                ) : (
                  <Block onPress={handleAvatar} rounded="6xl">
                    <Image circular size={80} uri={selectedAvatarUrl} />
                    <Block
                      absolute
                      bottom={-1}
                      right={0}
                      shadow="sm"
                      rounded="xxxl"
                      bgColor="white"
                      pV="sm"
                      pH="sm">
                      <EditIcon />
                    </Block>
                  </Block>
                )}
              </Block>

              <Block mT="4xl">
                <Typography variation="descriptionRegular">Username</Typography>
                <Block
                  bC="gray400"
                  bW={1}
                  rounded="lg"
                  flexDirection="row"
                  align="center"
                  pV="md"
                  pL="lg"
                  pR="lg"
                  mT="sm">
                  <TextInput
                    style={{ flex: 1 }}
                    autoCapitalize="none"
                    value={username}
                    onChangeText={handelChange}
                  />
                  <Block onPress={handleRefreshUsername}>
                    {refreshingUsername ? (
                      <ActivityIndicator style={{ height: 24, width: 24 }} />
                    ) : (
                      <ReloadIcon />
                    )}
                  </Block>
                </Block>
              </Block>

              {error && <Block>{username?.length > 1 && <ErrorText error={error} />}</Block>}

              <Block mT="xxxl" flexDirection="row" align="center">
                <NoneIcon />
                <Typography color="gray600" mL="md" variation="descriptionRegular">
                  Your identity will not be revealed to the community
                </Typography>
              </Block>
            </Block>

            <Block>
              <Button
                loading={isPending}
                title="Next"
                disabled={!username}
                variation={!username ? 'secondary' : 'primary'}
                onPress={handleSubmit}
              />
            </Block>
          </Block>
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default UsernameScreen
