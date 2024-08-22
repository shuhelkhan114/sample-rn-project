import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { MainStackScreens, Screens } from '~/navigation/screens'
import Header from '../_components/Header/Header'
import RadioButtons from '../_components/RadioButtons/RadioButtons'

type ReduceDebt5ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt5Screen>

export type ReduceDebt5ScreenParams = undefined

function ReduceDebt5Screen({ navigation }: ReduceDebt5ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      navigation.navigate(Screens.ReduceDebt6Screen)
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleNext = (value: string) => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({
        debt: { ...state.user.debt, abilityToMakeMinimumPayments: value },
      })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header
            step={5}
            description="What is your current ability to make minimum payments on your debts?"
          />

          <RadioButtons
            value={state.user?.debt?.abilityToMakeMinimumPayments || ''}
            mT="xxxl"
            options={[
              {
                label: 'Easy, I can comfortably make minimum payments',
                value: 'Easy, I can comfortably make minimum payments',
              },
              {
                label: "Manageable, but it's a stretch",
                value: "Manageable, but it's a stretch",
              },
              {
                label: 'Difficult, I often miss payments',
                value: 'Difficult, I often miss payments',
              },
              {
                label: "Impossible, I can't make any payments",
                value: "Impossible, I can't make any payments",
              },
            ]}
            onChange={handleNext}
          />
          <ErrorText error={updateProfileError} />
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default ReduceDebt5Screen
