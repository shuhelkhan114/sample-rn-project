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

type ReduceDebt9ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt9Screen>

export type ReduceDebt9ScreenParams = undefined

function ReduceDebt9Screen({ navigation }: ReduceDebt9ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const [amount, setAmount] = useState(() => state.user?.debt?.householdIncome?.toString() || '')

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      navigation.navigate(Screens.ReduceDebt10Screen)
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleNext = () => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({ debt: { ...state.user.debt, householdIncome: Number(amount) } })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header step={9} description="Estimate your monthly household income (after taxes)" />
          <ScrollView>
            <Block mT="xxxl" mB="auto">
              <TextInput
                isCurrencyInput
                value={amount}
                placeholder="Enter"
                onChangeText={setAmount}
                keyboardType="number-pad"
              />
            </Block>
          </ScrollView>
          <Footer
            disabled={amount === ''}
            error={updateProfileError}
            loading={updatingProfile}
            onNext={handleNext}
          />
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default ReduceDebt9Screen
