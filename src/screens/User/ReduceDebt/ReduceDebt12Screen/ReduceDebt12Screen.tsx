import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Block from '~/components/Block/Block'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { MainStackScreens, Screens } from '~/navigation/screens'
import CheckBoxes, { CheckBoxOption } from '../_components/CheckBoxes/CheckBoxes'
import Footer from '../_components/Footer/Footer'
import Header from '../_components/Header/Header'

type ReduceDebt12ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt12Screen>

export type ReduceDebt12ScreenParams = undefined

function ReduceDebt12Screen({ navigation }: ReduceDebt12ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const [values, setValues] = useState<CheckBoxOption[]>([])

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      navigation.navigate(Screens.ReducedDebtFinalScreen)
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleNext = () => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({ debt: { ...state.user?.debt, mainGoal: values.map((value) => value.label) } })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header step={12} description="What is your main goal in seeking debt relief?" />
          <ScrollView>
            <CheckBoxes
              mB="auto"
              values={values}
              mT="xxxl"
              options={[
                {
                  label: 'Lower my monthly payments',
                  value: 'Lower my monthly payments',
                },
                {
                  label: 'Reduce the total debt owed',
                  value: 'Reduce the total debt owed',
                },
                {
                  label: 'Protect my credit score',
                  value: 'Protect my credit score',
                },
                {
                  label: 'Get a fresh start due to overwhelming debt',
                  value: 'Get a fresh start due to overwhelming debt',
                },
              ]}
              onChange={setValues}
            />
          </ScrollView>

          <Footer
            onNext={handleNext}
            loading={updatingProfile}
            error={updateProfileError}
            disabled={values.length === 0}
          />
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default ReduceDebt12Screen
