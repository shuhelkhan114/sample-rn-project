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

type ReduceDebt8ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt8Screen>

export type ReduceDebt8ScreenParams = undefined

function ReduceDebt8Screen({ navigation }: ReduceDebt8ScreenProps) {
  const { state, refetchProfile } = useAuth()

  const [values, setValues] = useState<CheckBoxOption[]>(() => {
    return state.user?.debt?.assets?.map((value) => ({ label: value, value })) || []
  })

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      navigation.navigate(Screens.ReduceDebt9Screen)
    },
    onError() {
      toast.error('Error', 'Failed to update form, please try again!')
    },
  })

  const handleNext = () => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({
        debt: { ...state.user.debt, assets: values.map((value) => value.label) },
      })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Header step={8} description="Do you own any significant assets (e.g., home, car)?" />
          <ScrollView>
            <CheckBoxes
              values={values}
              mT="xxxl"
              options={[
                {
                  label: 'Yes, I own a home',
                  value: 'Yes, I own a home',
                },
                {
                  label: 'Yes, I own a car',
                  value: 'Yes, I own a car',
                },
                {
                  label: 'Yes, I own a home and a car',
                  value: 'Yes, I own a home and a car',
                },
                {
                  label: 'No significant assets',
                  value: 'No significant assets',
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

export default ReduceDebt8Screen
