import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Block from '~/components/Block/Block'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import TextInput from '~/components/TextInput/TextInput'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { MainStackScreens, Screens } from '~/navigation/screens'
import Footer from '../_components/Footer/Footer'
import Header from '../_components/Header/Header'

type ReduceDebt7ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt7Screen>

export type ReduceDebt7ScreenParams = undefined

function ReduceDebt7Screen({ navigation }: ReduceDebt7ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const [value, setValue] = useState(() => state.user?.debt?.creditScore?.toString() || '')

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      navigation.navigate(Screens.ReduceDebt8Screen)
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleNext = () => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({ debt: { ...state.user.debt, creditScore: Number(value) } })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header step={7} description="What's your credit score?" />
          <ScrollView>
            <Block mT="xxxl" mB="auto">
              <TextInput
                minValue={1}
                maxValue={850}
                value={value}
                placeholder="Enter"
                onChangeText={setValue}
                keyboardType="number-pad"
              />
            </Block>
          </ScrollView>
          <Footer
            onNext={handleNext}
            disabled={value === ''}
            error={updateProfileError}
            loading={updatingProfile}
          />
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default ReduceDebt7Screen
