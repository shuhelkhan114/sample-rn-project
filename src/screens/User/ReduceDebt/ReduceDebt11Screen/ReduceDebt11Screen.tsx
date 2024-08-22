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

type ReduceDebt11ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt11Screen>

export type ReduceDebt11ScreenParams = undefined

function ReduceDebt11Screen({ navigation }: ReduceDebt11ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const [values, setValues] = useState<CheckBoxOption[]>([])

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      navigation.navigate(Screens.ReduceDebt12Screen)
      refetchProfile()
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleNext = () => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({
        debt: {
          ...state.user?.debt,
          previousDebtReliefService: values.map((value) => value.label),
        },
      })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header
            step={11}
            description="Have you previously used any debt relief services or filed for bankruptcy?"
          />

          <ScrollView>
            <CheckBoxes
              mB="auto"
              values={values}
              mT="xxxl"
              options={[
                {
                  label: 'No, this is my first time seeking help',
                  value: 'No, this is my first time seeking help',
                },
                {
                  label: 'Yes, I have used credit counseling/ debt management services',
                  value: 'Yes, I have used credit counseling/ debt management services',
                },
                {
                  label: 'Yes, I have filed for bankruptcy before',
                  value: 'Yes, I have filed for bankruptcy before',
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

export default ReduceDebt11Screen
