import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Block from '~/components/Block/Block'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { MainStackScreens, Screens } from '~/navigation/screens'
import Footer from '~/screens/UserOnboarding/_components/Footer/Footer'
import CheckBoxes, { CheckBoxOption } from '../_components/CheckBoxes/CheckBoxes'
import Header from '../_components/Header/Header'

type ReduceDebt3ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt3Screen>

export type ReduceDebt3ScreenParams = undefined

function ReduceDebt3Screen({ navigation }: ReduceDebt3ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const [values, setValues] = useState<CheckBoxOption[]>(() => {
    return state.user?.debt?.debtNature?.map((value) => ({ label: value, value })) || []
  })

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      navigation.navigate(Screens.ReduceDebt4Screen)
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleNext = () => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({
        debt: { ...state.user.debt, debtNature: values.map((value) => value.label) },
      })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header step={3} description="What is the nature of most of your debt?" />
          <CheckBoxes
            mB="auto"
            values={values}
            mT="xxxl"
            options={[
              {
                label: 'Credit card debt',
                value: 'Credit card debt',
              },
              {
                label: 'Personal loans',
                value: 'Personal loans',
              },
              {
                label: 'Student loans',
                value: 'Student loans',
              },
              {
                label: 'Other',
                value: 'Other',
              },
            ]}
            onChange={setValues}
          />

          <Footer
            onNext={handleNext}
            error={updateProfileError}
            loading={updatingProfile}
            disabled={values.length === 0}
          />
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default ReduceDebt3Screen
