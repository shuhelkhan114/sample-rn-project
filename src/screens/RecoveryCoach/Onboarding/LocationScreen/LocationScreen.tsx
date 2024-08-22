import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import DropDown from '~/components/DropDown/DropDown'
import ErrorText from '~/components/ErrorText/ErrorText'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import Typography from '~/components/Typography/Typography'
import { states } from '~/core/data/states'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'

type RecoveryCoachLocationScreenProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.RecoveryCoachLocationScreen
>

export type RecoveryCoachLocationScreenParams = undefined

const RecoveryCoachLocationScreen: React.FC<RecoveryCoachLocationScreenProps> = (props) => {
  const { navigation } = props
  const { bottom } = useSafeAreaInsets()

  const [selectedState, setSelectedState] = useState('')

  const { state } = useAuth()

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.recoveryCoach.updateProfile,
    onSuccess() {
      navigation.navigate(Screens.RecoveryCoachAddictionsScreen)
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  useEffect(() => {
    if (state.recoveryCoach) {
      setSelectedState(state.recoveryCoach?.location_state)
    }
  }, [state.recoveryCoach])

  const handleNext = () => {
    updateProfile({ location_state: selectedState })
  }

  return (
    <Block flex1 style={{ paddingBottom: bottom }} mB="xl">
      <NavigationBar />
      <Block flex1 mH="xl">
        <Block>
          <Typography variation="paragraphRegular">Question 3 of 6</Typography>
          <Typography mT="xl" variation="paragraphLight" color="gray700">
            What state are you currently in? This way, we can offer location-specific recovery
            coach’s and recommendations.
          </Typography>
        </Block>
        <Block width="100%" mB="auto" mV="4xl">
          <DropDown
            searchable
            label="State"
            options={states}
            value={selectedState}
            minDropdownHeight="90%"
            modalTitle="Select State"
            placeholder="Search state"
            onSelect={setSelectedState}
          />
        </Block>

        <Block>
          <ErrorText error={error} />
          <Button
            title="Next"
            loading={isPending}
            onPress={handleNext}
            disabled={!selectedState}
            variation={!selectedState ? 'secondary' : 'primary'}
          />
        </Block>
      </Block>
    </Block>
  )
}

export default RecoveryCoachLocationScreen
