import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import InlineDatePicker from '~/components/InlineDatePicker/InlineDatePicker'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { analytics } from '~/core/lib/analytics'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type RecoveryCoachDOBSelectionScreenProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.RecoveryCoachDOBSelectionScreen
>

export type RecoveryCoachDOBSelectionScreenParams = undefined

const RecoveryCoachDOBSelectionScreen: React.FC<RecoveryCoachDOBSelectionScreenProps> = (props) => {
  const { navigation } = props
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date())
  const [isFutureDate, setIsFutureDate] = useState(false)

  const { bottom } = useSafeAreaInsets()
  const { state } = useAuth()

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.recoveryCoach.updateProfile,
    onSuccess() {
      analytics.logDateOfBirthSubmitted(dateOfBirth?.toISOString())

      navigation.navigate(Screens.RecoveryCoachGenderSelectionScreen)
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  useEffect(() => {
    setDateOfBirth(
      state?.recoveryCoach?.date_of_birth ? new Date(state.recoveryCoach.date_of_birth) : null
    )
  }, [state?.recoveryCoach])

  const handleNext = () => {
    if (dateOfBirth && dateOfBirth > new Date()) {
      setIsFutureDate(true)
    } else {
      updateProfile({ date_of_birth: dateOfBirth?.toISOString() })
    }
  }

  const handleChange = (date: Date) => {
    if (date < new Date()) {
      setIsFutureDate(false)
    }
    setDateOfBirth(date)
  }

  return (
    <Block flex1 mB="xl" style={{ paddingBottom: bottom }}>
      <NavigationBar />

      <Block flex1 justify="space-between" mH="xl">
        <Block>
          <Typography variation="paragraphRegular">Question 1 of 6</Typography>
          <Typography mT="xl" variation="paragraphLight" color="gray700">
            When&apos;s the special day you celebrate your birthday?
          </Typography>
        </Block>

        <Block>
          <InlineDatePicker
            label="Date of Birth"
            date={dateOfBirth}
            onChange={handleChange}
            minDate={new Date(1923, 1, 1)}
          />

          {isFutureDate && (
            <Typography mL="lg" variation="paragraphRegular" color="negative">
              Birth date should not be in future
            </Typography>
          )}
        </Block>

        <Block>
          <ErrorText error={error} />
          <Button
            mB="xl"
            disabled={!dateOfBirth}
            variation={!dateOfBirth ? 'secondary' : 'primary'}
            loading={isPending}
            title="Next"
            onPress={handleNext}
          />
        </Block>
      </Block>
    </Block>
  )
}

export default RecoveryCoachDOBSelectionScreen
