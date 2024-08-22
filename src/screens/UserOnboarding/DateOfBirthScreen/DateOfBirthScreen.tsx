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
import { TOTAL_USER_ONBOARDING_STEPS } from '~/core/config/onboarding'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type DateOfBirthScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.DateOfBirthScreen>

export type DateOfBirthScreenParams = undefined

const DateOfBirthScreen: React.FC<DateOfBirthScreenProps> = (props) => {
  const { navigation } = props
  const { bottom } = useSafeAreaInsets()
  const { state } = useAuth()

  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [isFutureDate, setIsFutureDate] = useState(false)

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      navigation.navigate(Screens.GenderScreen)
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  useEffect(() => {
    setDateOfBirth(state.user?.date_of_birth ? new Date(state.user?.date_of_birth) : null)
  }, [state.user])

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
    <Block flex1>
      <NavigationBar />

      <Block flex1 justify="space-between" mH="xl">
        <Block>
          <Typography variation="paragraphRegular">
            Question 1 of {TOTAL_USER_ONBOARDING_STEPS}
          </Typography>
          <Typography mT="xl" variation="paragraphLight" color="gray700">
            When were you born?
          </Typography>
        </Block>

        <Block>
          <InlineDatePicker
            key="dateOfBirth"
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

        <Block style={{ paddingBottom: bottom }}>
          <ErrorText error={error} />
          <Typography mB="lg" pV="sm" center variation="paragraphLight">
            Your identity or information will not be revealed to the community
          </Typography>
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

export default DateOfBirthScreen
