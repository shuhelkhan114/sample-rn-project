import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { ConfigContext } from '~/context/ConfigContext'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { useActivity } from '~/hooks/useActivity'
import CheckBoxButton from '~/models/addictions/CheckBoxButton'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import { Addiction } from '~/typings/addiction'

type RecoveryCoachAddictionsScreenProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.RecoveryCoachAddictionsScreen
>

export type RecoveryCoachAddictionsScreenParams = undefined

const RecoveryCoachAddictionsScreen: React.FC<RecoveryCoachAddictionsScreenProps> = (props) => {
  const { navigation } = props
  const { config } = useContext(ConfigContext)
  const [selectedAddictions, setSelectedAddictions] = useState<Addiction[]>([])

  const { user } = useActivity()

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: async (params: any) => {
      const feedGroups = new Set<string>()
      selectedAddictions.forEach((addiction) => {
        feedGroups.add(addiction.description.replaceAll(' ', '').replaceAll('&', '_').toLowerCase())
      })
      await Promise.all(
        [...feedGroups].map(async (addiction) => user?.follow('addiction', `${addiction}`))
      )
      return API.recoveryCoach.updateProfile({
        addiction_ids: selectedAddictions.map((addiction) => addiction.id),
      })
    },
    async onSuccess() {
      navigation.navigate(Screens.RecoveryCoachWriteOwnStory)
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  const handleNext = () => {
    updateProfile({
      addiction_ids: Object.values(selectedAddictions)
        .flat()
        .map((addiction) => addiction.id),
    })
  }

  return (
    <Block flex1>
      <NavigationBar />

      <Block flex1 mH="xl">
        <Block>
          <Typography variation="paragraphRegular">Question 4 of 6</Typography>
          <Typography mT="xl" variation="paragraphLight" color="gray700">
            Which addiction have you recovered from?
          </Typography>
        </Block>

        <ScrollView>
          <Block mB="auto" mT="4xl">
            {config?.addictions.map((item) => {
              const handleChange = (addiction: Addiction) => {
                const exists = selectedAddictions.find((ad) => ad.id === addiction.id)

                if (exists) {
                  setSelectedAddictions((prev) => prev.filter((ad) => ad.id !== addiction.id))
                } else {
                  setSelectedAddictions((prev) => [...prev, addiction])
                }
              }

              return (
                <CheckBoxButton
                  key={item.name}
                  addiction={item}
                  onChange={handleChange}
                  selectedAddictions={selectedAddictions}
                />
              )
            })}
          </Block>
        </ScrollView>

        <Block mB="7xl">
          <ErrorText error={error} />
          <Button
            title="Next"
            loading={isPending}
            onPress={handleNext}
            disabled={Object.values(selectedAddictions).length < 1}
            variation={Object.values(selectedAddictions).length < 1 ? 'secondary' : 'primary'}
          />
        </Block>
      </Block>
    </Block>
  )
}

export default RecoveryCoachAddictionsScreen
