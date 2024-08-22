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

type ReduceDebt1ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt1Screen>

export type ReduceDebt1ScreenParams = undefined

function ReduceDebt1Screen({ navigation }: ReduceDebt1ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      navigation.navigate(Screens.ReduceDebt2Screen)
      refetchProfile()
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleSelect = (value: string) => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({ debt: { ...state.user?.debt, hasDebt: value === 'yes' } })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header step={1} description="Do you have any debt you would like to reduce?" />

          <RadioButtons
            value={
              state.user?.debt?.hasDebt === true
                ? 'yes'
                : state.user?.debt?.hasDebt === false
                ? 'no'
                : undefined
            }
            mT="xxxl"
            options={[
              {
                label: 'Yes',
                value: 'yes',
              },
              {
                label: 'No',
                value: 'no',
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

export default ReduceDebt1Screen
