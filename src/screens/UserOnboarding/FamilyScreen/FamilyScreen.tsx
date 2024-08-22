import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import Block from '~/components/Block/Block'
import DropDown from '~/components/DropDown/DropDown'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import TextInput from '~/components/TextInput/TextInput'
import Typography from '~/components/Typography/Typography'
import { analytics } from '~/core/lib/analytics'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import { formatPhone } from '../StateScreen/StateScreen'
import Footer from '../_components/Footer/Footer'
import Header from '../_components/Header/Header'

type FamilyScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.FamilyScreen>

export type FamilyScreenParams = {
  from: 'onboarding' | 'home'
}

function FamilyScreen(props: FamilyScreenProps) {
  const { navigation, route } = props

  const { from } = route.params || {}

  const { refetchProfile } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [relationship, setRelationship] = useState('')

  const {
    isPending: updatingProfile,
    error: updateProfileError,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      analytics.logSpouseTherapistAdded({
        name,
        email,
        phone,
        relationship,
      })
      refetchProfile()
      if (from === 'onboarding') {
        navigation.navigate(Screens.SubscriptionScreen)
      } else {
        // @ts-ignore
        navigation.navigate(Screens.HomeScreen)
      }
    },
    onError(error: any) {
      toast.error('Error', `${error.message || 'Something went wrong'}`)
    },
  })

  const handleNext = () => {
    if (name && email && relationship) {
      updateProfile({ family_members: [{ name, email, phone, relationship }] })
    }
  }

  const handleSkip = () => {
    refetchProfile()
    if (from === 'onboarding') {
      navigation.navigate(Screens.SubscriptionScreen)
    } else {
      // @ts-ignore
      navigation.navigate(Screens.HomeScreen)
    }
  }

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <Block flex1 justify="space-between" mH="xl">
          <ScrollView>
            <Header
              step={from === 'home' ? 4 : 8}
              totalSteps={from === 'home' ? 4 : undefined}
              isOptional
              onSkip={handleSkip}
              description="Add a loved one or therapist to your recovery circle for added accountability, raising your likelihood of beating gambling addiction by 25%. We will share your progress & ongoing achievements."
            />

            <Block mT="xxxl">
              <Typography mB="sm">Name</Typography>
              <TextInput value={name} onChangeText={setName} placeholder="Enter" />

              <Typography mT="xxxl" mB="sm">
                Email
              </Typography>

              <TextInput
                value={email}
                placeholder="Enter"
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Typography mT="xxxl" mB="sm">
                Phone (Optional)
              </Typography>

              <TextInput
                value={phone}
                formatter={formatPhone}
                onChangeText={setPhone}
                placeholder="Enter phone"
                keyboardType="number-pad"
              />

              <Block mT="xxxl">
                <DropDown
                  label="Relationship"
                  value={relationship}
                  onSelect={setRelationship}
                  options={[
                    {
                      label: 'Spouse',
                      value: 'Spouse',
                    },
                    {
                      label: 'Partner',
                      value: 'Partner',
                    },
                    {
                      label: 'Therapist',
                      value: 'Therapist',
                    },
                    {
                      label: 'Parent',
                      value: 'Parent',
                    },
                    {
                      label: 'Close Friend',
                      value: 'Close Friend',
                    },
                    {
                      label: 'Sibling',
                      value: 'Sibling',
                    },
                    {
                      label: 'Mentor',
                      value: 'Mentor',
                    },
                  ]}
                />
              </Block>

              <Footer
                mT="xxxl"
                allowSkip
                onSkip={handleSkip}
                loading={updatingProfile}
                onNext={handleNext}
                error={updateProfileError}
                disabled={!name || !email || !relationship}
              />
            </Block>
          </ScrollView>
        </Block>
      </KeyboardView>
    </Block>
  )
}

export default FamilyScreen
