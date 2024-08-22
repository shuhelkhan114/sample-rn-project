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

type ReduceDebt2ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt2Screen>

export type ReduceDebt2ScreenParams = undefined

function ReduceDebt2Screen({ navigation }: ReduceDebt2ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const [amount, setAmount] = useState(() => state.user?.debt?.totalDebtAmount?.toString() || '')

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      navigation.navigate(Screens.ReduceDebt3Screen)
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleNext = () => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({ debt: { ...state.user.debt, totalDebtAmount: Number(amount) } })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header step={2} description="Roughly, how much total debt do you currently have?" />
          <ScrollView>
            <Block mT="xxxl" mB="auto">
              <TextInput
                minValue={1}
                isCurrencyInput
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter"
                keyboardType="number-pad"
              />
            </Block>
          </ScrollView>
          <Footer
            onNext={handleNext}
            disabled={amount === ''}
            error={updateProfileError}
            loading={updatingProfile}
          />
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default ReduceDebt2Screen
