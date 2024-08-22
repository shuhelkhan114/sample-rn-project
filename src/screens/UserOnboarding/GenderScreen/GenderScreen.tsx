import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { TOTAL_USER_ONBOARDING_STEPS } from '~/core/config/onboarding'
import { analytics } from '~/core/lib/analytics'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import SelectGender from '~/models/about/SelectGender'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import { GenderValue } from '~/typings/common'

type GenderScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.GenderScreen>

export type GenderScreenParams = undefined

const GenderSelectionScreen: React.FC<GenderScreenProps> = (props) => {
  const { navigation } = props
  const { bottom } = useSafeAreaInsets()

  const { state } = useAuth()

  const [selectedGender, setSelectedGender] = useState<GenderValue | null>(null)

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      analytics.logGenderSelected(selectedGender as string)
      navigation.navigate(Screens.StateScreen)
    },
    onError(error: any) {
      toast.error('Error', `${error.message || 'Something went wrong'}`)
    },
  })

  useEffect(() => {
    setSelectedGender(state.user?.gender as GenderValue)
  }, [state.user])

  const handleNext = () => {
    if (selectedGender) {
      updateProfile({ gender: selectedGender })
    }
  }

  return (
    <Block flex1>
      <NavigationBar />

      <Block flex1 justify="space-between" mH="xl">
        <Block>
          <Typography variation="paragraphRegular">
            Question 2 of {TOTAL_USER_ONBOARDING_STEPS}
          </Typography>
          <Typography mT="xl" variation="paragraphLight" color="gray700">
            What is your gender?
          </Typography>
        </Block>

        <SelectGender selectedGender={selectedGender} onSelect={setSelectedGender} />

        <Block style={{ paddingBottom: bottom }}>
          <Typography mB="lg" pV="sm" center variation="paragraphLight">
            Your identity or information will not be revealed to the community
          </Typography>

          <ErrorText error={updateProfileError} />

          <Button
            mB="xl"
            title="Next"
            onPress={handleNext}
            loading={updatingProfile}
            disabled={!selectedGender}
            variation={!selectedGender ? 'secondary' : 'primary'}
          />
        </Block>
      </Block>
    </Block>
  )
}

export default GenderSelectionScreen
