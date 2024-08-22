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

type ReduceDebt10ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt10Screen>

export type ReduceDebt10ScreenParams = undefined

function ReduceDebt10Screen({ navigation }: ReduceDebt10ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      navigation.navigate(Screens.ReduceDebt11Screen)
      refetchProfile()
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleSelect = (value: string) => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({ debt: { ...state.user?.debt, estimatedTimeToPayOffWithoutHelp: value } })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header
            step={10}
            description="How long do you realistically think it would take you to pay off your debt without additional help?"
          />
          <RadioButtons
            mT="xxxl"
            options={[
              {
                label: 'Less than 2 years',
                value: 'Less than 2 years',
              },
              {
                label: '2 to 5 years',
                value: '2 to 5 years',
              },
              {
                label: '5 to 10 years',
                value: 'More than 10 years',
              },
            ]}
            onChange={handleSelect}
          />
          <ErrorText error={updateProfileError} />
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default ReduceDebt10Screen
