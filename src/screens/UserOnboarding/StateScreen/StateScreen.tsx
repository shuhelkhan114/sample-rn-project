import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FormikProvider, useFormik } from 'formik'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorText from '~/components/ErrorText/ErrorText'
import FormikDropdown from '~/components/formik/FormikDropdown/FormikDropdown'
import FormikInput from '~/components/formik/FormikInput/FormikInput'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { TOTAL_USER_ONBOARDING_STEPS } from '~/core/config/onboarding'
import { states } from '~/core/data/states'
import { analytics } from '~/core/lib/analytics'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import Callout from './Callout/Callout'

type StateScreenProps = NativeStackScreenProps<AuthStackScreens, Screens.StateScreen>

export type StateScreenParams =
  | {
      from: 'main'
    }
  | undefined

export const formatPhone = (value: string, previousValue?: string) => {
  // const cleaned = ('' + text).replace(/\D/g, '')
  // const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  // if (match) {
  //   const intlCode = match[1] ? '+1 ' : '',
  //     number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')

  //   return number
  // }

  // return text
  if (!value) return value
  const currentValue = value.replace(/[^\d]/g, '')
  const cvLength = currentValue.length

  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return currentValue
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`
  }
  return value
}

const initialValues = {
  state: '',
  closestCity: '',
  phone: '',
}

const StateScreen: React.FC<StateScreenProps> = (props) => {
  const { navigation, route } = props
  const { from } = route.params || {}
  const { bottom } = useSafeAreaInsets()

  const { state, refetchProfile } = useAuth()

  const validationSchema = Yup.object().shape({
    state: Yup.string().required('State is required'),
    closestCity: Yup.string().nullable(),
    phone: Yup.string().required('Phone number is required').length(14, 'Invalid phone number'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const { state, phone, closestCity } = values
      updateProfile({
        location_state: state,
        phone_number: phone,
        ...(closestCity && { location_city: closestCity }),
      })
    },
  })

  const { values, setFieldValue } = formik
  const selectedState = values.state

  useEffect(() => {
    if (!selectedState) {
      setFieldValue('closestCity', '')
    }
  }, [selectedState])

  const {
    isPending: fetchingCities,
    error: fetchingCitiesError,
    data: cities,
  } = useQuery({
    enabled: !!selectedState,
    queryKey: ['user/cities', selectedState],
    queryFn: async () => API.user.getNearestCities(selectedState),
  })

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      analytics.logStateSubmitted(selectedState)
      analytics.logPhoneSubmitted(values.phone)

      if (from === 'main') {
        refetchProfile()
        navigation.goBack()
      } else {
        navigation.navigate(Screens.AddictionsScreen)
      }
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  useEffect(() => {
    if (from !== 'main' && state.user) {
      setFieldValue('state', state.user?.location_state)
    }
  }, [state.user])

  return (
    <Block flex1>
      <KeyboardView>
        <NavigationBar />

        <FormikProvider value={formik}>
          <Block flex1 mH="xl">
            <ScrollView>
              <Block>
                {from !== 'main' && (
                  <Typography variation="paragraphRegular">
                    Question 3 of {TOTAL_USER_ONBOARDING_STEPS}
                  </Typography>
                )}
                <Typography mT="xl" variation="paragraphLight" color="gray700">
                  Enter your state to find local meetings and therapists, and provide your phone
                  number for important updates.
                </Typography>
              </Block>

              <Block width="100%" mB="auto" mV="4xl">
                <Block mB="xxxl">
                  <FormikDropdown
                    name="state"
                    searchable
                    label="State"
                    options={states}
                    minDropdownHeight="90%"
                    modalTitle="Select State"
                    placeholder="Search state"
                  />

                  <ErrorText error={fetchingCitiesError} />

                  {selectedState && !cities?.[0] && (
                    <Typography mT="xl" variation="descriptionRegular" color="warning">
                      No cities found for this state, G/A & Smart meeting maybe not available
                      (Optional)
                    </Typography>
                  )}

                  {selectedState && cities?.[0] && (
                    <Block mT="xxxl">
                      {fetchingCities ? (
                        <ActivityIndicator />
                      ) : (
                        <FormikDropdown
                          name="closestCity"
                          searchable
                          options={
                            cities?.map((city) => ({
                              label: city,
                              value: city,
                            })) || []
                          }
                          minDropdownHeight="90%"
                          modalTitle="Select closest city"
                          placeholder="Search closest city"
                          label="Which city is closest to you?"
                        />
                      )}
                    </Block>
                  )}

                  <Typography mT="xxxl" mB="xs">
                    Phone Number
                  </Typography>

                  <FormikInput
                    name="phone"
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                    maxLength={14}
                    formatter={formatPhone}
                  />

                  <Callout mT="4xl" />
                </Block>
              </Block>
            </ScrollView>

            <Block style={{ paddingBottom: bottom }}>
              <Typography mB="lg" pV="sm" center variation="paragraphLight">
                Your identity or information will not be revealed to the community
              </Typography>

              <ErrorText error={error} />

              <Button
                loading={isPending}
                title={from === 'main' ? 'Save' : 'Next'}
                disabled={!formik.isValid}
                variation={!formik.isValid ? 'secondary' : 'primary'}
                onPress={formik.submitForm}
                mB="xl"
              />
            </Block>
          </Block>
        </FormikProvider>
      </KeyboardView>
    </Block>
  )
}

export default StateScreen
