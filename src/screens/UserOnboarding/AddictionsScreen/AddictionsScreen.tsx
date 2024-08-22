import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { ConfigContext } from '~/context/ConfigContext'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { useActivity } from '~/hooks/useActivity'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import { Addiction } from '~/typings/addiction'

import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import CheckBox from '~/components/CheckBox/CheckBox'
import EmptyBlock from '~/components/EmptyBlock/EmptyBlock'
import ErrorBlock from '~/components/ErrorBlock/ErrorBlock'
import ErrorText from '~/components/ErrorText/ErrorText'
import FetchingBlock from '~/components/FetchingBlock/FetchingBlock'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { TOTAL_USER_ONBOARDING_STEPS } from '~/core/config/onboarding'
import { analytics } from '~/core/lib/analytics'
import { constructFeedName } from '~/core/utils/common'

type AddictionsScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.AddictionsScreen>

export type AddictionsScreenParams = undefined

const AddictionsScreen: React.FC<AddictionsScreenProps> = (props) => {
  const { navigation } = props
  const {
    config,
    fetching: fetchingConfig,
    fetchConfig,
    error: configFetchingError,
  } = useContext(ConfigContext)

  const { user } = useActivity()

  const [selectedAddictions, setSelectedAddictions] = useState<Addiction[]>([])

  const {
    isPending,
    error: updatingProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: async () => {
      // 1. follow selected the addiction feed groups on stream chat server
      const feedGroups = new Set<string>()

      // 1.1 construct the feed group names
      selectedAddictions.forEach((addiction) => {
        feedGroups.add(constructFeedName(addiction.description))
      })

      // 1.2 follow the feed groups
      await Promise.all(
        [...feedGroups].map(async (addiction) => user?.follow('addiction', `${addiction}`))
      )

      // 2. update the user profile
      return API.user.updateProfile({
        addiction_ids: selectedAddictions.map((addiction) => addiction.id),
      })
    },
    async onSuccess() {
      analytics.logGamblingAddictionsSelected(
        selectedAddictions.map((addiction) => addiction.name).join(', ')
      )
      // navigate to recovery coach screen
      navigation.navigate(Screens.LastGambleDayScreen, { from: 'onboarding' })
    },
    onError(error) {
      toast.error('Error', `${error.message || 'Something went wrong'}`)
    },
  })

  const handleNext = () => {
    updateProfile()
  }

  let content: React.ReactNode = null

  if (fetchingConfig) {
    content = <FetchingBlock />
  } else if (configFetchingError) {
    content = (
      <ErrorBlock error={configFetchingError} onRetry={fetchConfig} retrying={fetchingConfig} />
    )
  } else if (config?.addictions.length === 0) {
    content = (
      <EmptyBlock
        onRefetch={fetchConfig}
        refetching={fetchingConfig}
        message="No addictions found!"
      />
    )
  } else if (config?.addictions) {
    // NOTE: We are temporarily disabled all the categories except gambling...
    const [addiction] = config?.addictions.filter((addiction) =>
      addiction.name.toLowerCase().includes('gambling')
    )

    if (addiction?.sub_addictions?.[0]) {
      content = (
        <ScrollView>
          <Block mB="auto" mT="4xl">
            {addiction.sub_addictions.map((addiction) => {
              const checked = !!selectedAddictions.find((ad) => ad.id === addiction.id)

              const handleCheck = () => {
                const exists = selectedAddictions.find((ad) => ad.id === addiction.id)

                if (exists) {
                  setSelectedAddictions((prev) => prev.filter((ad) => ad.id !== addiction.id))
                } else {
                  setSelectedAddictions((prev) => [...prev, addiction])
                }
              }

              return (
                <Block
                  flex1
                  bW={1}
                  pV="md"
                  pH="md"
                  mB="xxxl"
                  rounded="xl"
                  bC="gray300"
                  align="center"
                  flexDirection="row"
                  key={addiction.id}
                  onPress={handleCheck}>
                  <CheckBox checked={!!checked} onChange={handleCheck} />
                  <Typography color="gray700" mL="md" flex1 variation="descriptionRegular">
                    {addiction.name}
                  </Typography>
                </Block>
              )
            })}
          </Block>
        </ScrollView>
      )
    } else {
      content = (
        <EmptyBlock
          onRefetch={fetchConfig}
          refetching={fetchingConfig}
          message="No gambling addictions found!"
        />
      )
    }
  }

  const isValid = Object.values(selectedAddictions).length > 0

  return (
    <Block flex1>
      <NavigationBar />

      <Block flex1 mH="xl">
        <Block>
          <Typography variation="paragraphRegular">
            Question 4 of {TOTAL_USER_ONBOARDING_STEPS}
          </Typography>
          <Typography mT="xl" variation="paragraphLight" color="gray700">
            Which of these gambling activities has contributed to your struggle with addiction?
          </Typography>
        </Block>

        {content}

        <Block mB="7xl">
          <Typography mB="lg" pV="sm" color="gray800" center>
            Your identity or information will not be revealed to the community
          </Typography>

          <ErrorText error={updatingProfileError} />

          <Button
            title="Next"
            loading={isPending}
            disabled={!isValid}
            onPress={handleNext}
            variation={!isValid ? 'secondary' : 'primary'}
          />
        </Block>
      </Block>
    </Block>
  )
}

export default AddictionsScreen
