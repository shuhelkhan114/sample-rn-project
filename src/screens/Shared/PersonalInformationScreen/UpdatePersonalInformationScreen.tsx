import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { FormikProvider, useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ChevronLeft } from 'react-native-feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import DropDown from '~/components/DropDown/DropDown'
import InlineDatePicker from '~/components/InlineDatePicker/InlineDatePicker'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import Modal from '~/components/Modal/Modal'
import ScrollView from '~/components/ScrollView/ScrollView'
import TextInput from '~/components/TextInput/TextInput'
import Typography from '~/components/Typography/Typography'
import FormikInput from '~/components/formik/FormikInput/FormikInput'
import { UserRole } from '~/context/AuthContext'
import { states } from '~/core/data/states'
import { genderOptions } from '~/core/data/static'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import { getErrorMessage } from '~/core/utils/apiError'
import useAuth from '~/hooks/useAuth'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'

type UpdatePersonalInformationScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.UpdatePersonalInformationScreen
>

export type UpdatePersonalInformationScreenParams = undefined

enum Fields {
  name = 'name',
  username = 'username',
  user_bio = 'user_bio',
  calendly_link = 'calendly_link',
}

const UpdatePersonalInformationScreen: React.FC<UpdatePersonalInformationScreenProps> = (props) => {
  const { navigation } = props
  const { top, bottom } = useSafeAreaInsets()
  const theme = useAppTheme()
  const { currentUser, refetchProfile } = useAuth()
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedGender, setSelectedGender] = useState<string>()
  const [modalVisible, setModalVisible] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [isFutureDate, setIsFutureDate] = useState(false)
  const [bio, setBio] = useState<string>('')

  const { isPending, mutate: updateProfile } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      toast.success('Success', 'Update Profile successfully')
      navigation.navigate(Screens.PersonalInformationScreen)
    },
    onError(error: any) {
      const message = getErrorMessage(error)
      toast.error('Error', `${message || 'Something went wrong'}`)
    },
  })

  useEffect(() => {
    if (currentUser) {
      setSelectedState(currentUser.state)
      setSelectedGender(currentUser.gender)
      setDateOfBirth(currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : null)
      setBio(currentUser?.user_bio as string)
    }
  }, [currentUser])

  const formik = useFormik({
    initialValues: {
      [Fields.name]: currentUser.name || '',
      [Fields.username]: currentUser.username,
      [Fields.calendly_link]: currentUser.calendly_link,
    },
    validateOnMount: true,

    validationSchema: Yup.object().shape({
      [Fields.name]: Yup.string(),
      [Fields.username]: currentUser.username
        ? Yup.string().required('userName is required')
        : Yup.string(),
      [Fields.calendly_link]: Yup.string()
        .url('Invalid URL format')
        .matches(/^https:/, 'Calendly Link must start with "https:"'),
    }),

    onSubmit: async (values) => {
      const value = {
        name:
          currentUser.revealed_to_community || currentUser.role === UserRole.RecoveryCoach
            ? values.name
            : null,
        date_of_birth: dateOfBirth?.toISOString(),
        gender: selectedGender,
        location_state: selectedState,
        user_name: values.username,
        calendly_link: values.calendly_link,
        user_bio: bio,
      }
      //   @ts-ignore
      updateProfile(value)
    },
  })

  const onDateChange = (date: Date) => {
    if (date > new Date()) {
      setIsFutureDate(true)
    }
    setDateOfBirth(date)
  }

  return (
    <KeyboardView>
      <Modal onClose={setModalVisible} visible={modalVisible}>
        <Block pT="4xl">
          <InlineDatePicker
            label="Date of Birth"
            date={dateOfBirth}
            onChange={onDateChange}
            minDate={new Date(1923, 1, 1)}
          />
          {isFutureDate && (
            <Typography center mL="lg" variation="paragraphRegular" color="negative">
              Birth date should not be in future
            </Typography>
          )}
        </Block>
      </Modal>

      <FormikProvider value={formik}>
        <Block flex1>
          <Block
            pV="xl"
            pH="xl"
            align="center"
            bgColor="white"
            flexDirection="row"
            justify="space-between"
            style={{ paddingTop: top }}>
            <Block flexDirection="row" align="center" justify="space-between" flex1>
              <Block onPress={navigation.goBack}>
                <ChevronLeft fontSize={24} color={theme.colors.gray900} />
              </Block>

              <Typography mL="md" variation="title6SemiBold">
                Personal Information
              </Typography>
              <Block opacity={0}>
                <ChevronLeft fontSize={24} color={theme.colors.white} />
              </Block>
            </Block>
          </Block>

          <ScrollView pH="xxl">
            {currentUser.revealed_to_community ||
              (currentUser.role === UserRole.RecoveryCoach && (
                <Block>
                  <Typography mT="xl" mB="sm" variation="paragraphRegular">
                    Name
                  </Typography>
                  <FormikInput autoCapitalize="none" name={Fields.name} bgColor="white" />
                </Block>
              ))}

            {currentUser.username && (
              <Block>
                <Typography mT="xl" variation="paragraphRegular">
                  Username
                </Typography>
                <FormikInput autoCapitalize="none" name={Fields.username} bgColor="white" />
              </Block>
            )}

            <Typography mT="xl" variation="paragraphRegular">
              Birthday
            </Typography>
            <Block
              bW={1}
              rounded="lg"
              bC="gray300"
              pH="lg"
              pV="md"
              onPress={() => setModalVisible(true)}>
              <Typography variation="descriptionRegular" color="gray900">
                {dateOfBirth ? new Date(dateOfBirth).toDateString() : 'N/A'}
              </Typography>
            </Block>
            {isFutureDate && (
              <Typography variation="paragraphRegular" color="negative">
                Birth date should not be in future
              </Typography>
            )}

            <Typography mT="xl" variation="paragraphRegular">
              Gender
            </Typography>
            <DropDown
              options={genderOptions}
              value={selectedGender}
              placeholder="Search Gender"
              onSelect={setSelectedGender}
              modalTitle="Select Gender"
            />

            <Typography mT="xl" variation="paragraphRegular">
              State
            </Typography>
            <DropDown
              options={states}
              value={selectedState}
              placeholder="Search state"
              onSelect={setSelectedState}
              modalTitle="Select State"
              searchable
              minDropdownHeight="90%"
            />

            <Block>
              <Typography mT="xl" mB="sm" variation="paragraphRegular">
                Story
              </Typography>
              <TextInput
                multiline
                value={bio}
                scrollEnabled={false}
                placeholder="From NYC, Struggled with gambling addiction, losing over $1 million on sports betting and stock trading. Currently working in tech trying to reclaim control of my life. Excited to connect with you all."
                style={style.textbox}
                onChangeText={(text) => setBio(text)}
              />
            </Block>

            {currentUser.calendly_link && (
              <Block>
                <Typography mT="xl" variation="paragraphRegular">
                  Calendly link
                </Typography>
                <FormikInput autoCapitalize="none" name={Fields.calendly_link} bgColor="white" />
              </Block>
            )}
          </ScrollView>
        </Block>
        <Block
          pV="xl"
          pH="xl"
          align="center"
          bgColor="white"
          flexDirection="row"
          justify="space-between"
          style={{ paddingBottom: bottom }}>
          <Button
            loading={isPending}
            disabled={!formik.isValid && isFutureDate}
            variation={formik.isValid && !isFutureDate ? 'primary' : 'secondary'}
            title="Update"
            onPress={formik.submitForm}
          />
        </Block>
      </FormikProvider>
    </KeyboardView>
  )
}

const style = StyleSheet.create({
  textbox: {
    minHeight: 90,
    fontSize: 20,
    fontWeight: '400',
    alignItems: 'flex-start',
  },
})

export default UpdatePersonalInformationScreen
