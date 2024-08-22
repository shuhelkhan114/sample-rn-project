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

type ReduceDebt4ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt4Screen>

export type ReduceDebt4ScreenParams = undefined

function ReduceDebt4Screen({ navigation }: ReduceDebt4ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const [values, setValues] = useState<CheckBoxOption[]>(() => {
    return state.user?.debt?.debtCreditors?.map((value) => ({ label: value, value })) || []
  })

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      navigation.navigate(Screens.ReduceDebt5Screen)
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleNext = () => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({
        debt: { ...state.user.debt, debtCreditors: values.map((value) => value.label) },
      })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header step={4} description="Who are the creditors?" />
          <ScrollView>
            <CheckBoxes
              values={values}
              mT="xxxl"
              options={[
                {
                  label: 'Capital One',
                  value: 'Capital One',
                },
                {
                  label: 'American Express',
                  value: 'American Express',
                },
                {
                  label: 'Wells Fargo',
                  value: 'Wells Fargo',
                },
                {
                  label: 'Chase',
                  value: 'Chase',
                },
                {
                  label: 'Visa',
                  value: 'Visa',
                },
                {
                  label: 'Bank Of America',
                  value: 'Bank Of America',
                },
                {
                  label: 'Mastercard',
                  value: 'Mastercard',
                },
                {
                  label: 'Other',
                  value: 'Other',
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

export default ReduceDebt4Screen
