import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import SelectGender from '~/models/about/SelectGender'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import { GenderValue } from '~/typings/common'

type RecoveryCoachGenderSelectionScreenProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.RecoveryCoachGenderSelectionScreen
>

export type RecoveryCoachGenderSelectionScreenParams = undefined

const RecoveryCoachGenderSelectionScreen: React.FC<RecoveryCoachGenderSelectionScreenProps> = (
  props
) => {
  const { navigation } = props
  const [selectedGender, setSelectedGender] = useState<GenderValue | null>(null)

  const { bottom } = useSafeAreaInsets()

  const { state } = useAuth()

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.recoveryCoach.updateProfile,
    onSuccess() {
      navigation.navigate(Screens.RecoveryCoachLocationScreen)
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  useEffect(() => {
    setSelectedGender(state.recoveryCoach?.gender || null)
  }, [state?.recoveryCoach])

  const handleNext = () => {
    if (selectedGender) {
      updateProfile({ gender: selectedGender })
    }
  }

  return (
    <Block flex1 style={{ paddingBottom: bottom }} mB="xl">
      <NavigationBar />

      <Block flex1 justify="space-between" mH="xl">
        <Block>
          <Typography variation="paragraphRegular">Question 2 of 6</Typography>
          <Typography mT="xl" variation="paragraphLight" color="gray700">
            Could you share your gender with us to personalise your experience?
          </Typography>
        </Block>

        <SelectGender selectedGender={selectedGender} onSelect={setSelectedGender} />

        <Block>
          <ErrorText error={error} />
          <Button
            loading={isPending}
            title="Next"
            disabled={!selectedGender}
            variation={!selectedGender ? 'secondary' : 'primary'}
            onPress={handleNext}
          />
        </Block>
      </Block>
    </Block>
  )
}

export default RecoveryCoachGenderSelectionScreen
