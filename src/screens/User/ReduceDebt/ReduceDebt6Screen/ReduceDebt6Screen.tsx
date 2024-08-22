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

type ReduceDebt6ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt6Screen>

export type ReduceDebt6ScreenParams = undefined

function ReduceDebt6Screen({ navigation }: ReduceDebt6ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      navigation.navigate(Screens.ReduceDebt7Screen)
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleNext = (value: string) => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({
        debt: { ...state.user.debt, employmentStatus: value },
      })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header step={6} description="What’s your current employment status?" />
          <RadioButtons
            value={state.user?.debt?.employmentStatus || ''}
            mT="xxxl"
            options={[
              {
                label: 'Employed full-time',
                value: 'Employed full-time',
              },
              {
                label: 'Employed part-time',
                value: 'Employed part-time',
              },
              {
                label: 'Unemployed',
                value: 'Unemployed',
              },
              {
                label: 'Self-employed',
                value: 'Self-employed',
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

export default ReduceDebt6Screen
