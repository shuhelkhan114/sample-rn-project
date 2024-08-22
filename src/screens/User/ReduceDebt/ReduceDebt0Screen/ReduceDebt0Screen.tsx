import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import TextInput from '~/components/TextInput/TextInput'
import Typography from '~/components/Typography/Typography'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { MainStackScreens, Screens } from '~/navigation/screens'
import Footer from '../_components/Footer/Footer'

type ReduceDebt0ScreenProps = NativeStackScreenProps<MainStackScreens, Screens.ReduceDebt0Screen>

export type ReduceDebt0ScreenParams = undefined

function ReduceDebt0Screen({ navigation }: ReduceDebt0ScreenProps) {
  const { state, refetchProfile } = useAuth()
  const [fullName, setFullName] = useState('')

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

  const handleNext = () => {
    if (!updatingProfile && state.user?.debt) {
      updateProfile({ debt: { ...state.user?.debt, fullName } })
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block pH="xl" flex1>
          <Block>
            <Typography variation="paragraphRegular">
              Starting your Debt Recovery Journey
            </Typography>
            <Typography mT="xl" variation="paragraphLight" color="gray700">
              Please enter the following details
            </Typography>
          </Block>

          <ScrollView>
            <Block mB="auto" mT="xxxl">
              <Typography mB="sm">Full Name</Typography>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
              />

              {/*
              NOTE: Temporary hidden

              <Typography mT="xxl" mB="sm">
                Address
              </Typography>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your address, city & state"
              /> */}
            </Block>
          </ScrollView>

          <ErrorText error={updateProfileError} />
          <Footer
            onNext={handleNext}
            error={updateProfileError}
            loading={updatingProfile}
            disabled={!fullName}
          />
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default ReduceDebt0Screen
