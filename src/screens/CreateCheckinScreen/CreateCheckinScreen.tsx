import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { FormikProvider, useFormik } from 'formik'
import { ScrollView } from 'react-native'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import CircularStarIcon from '~/components/Icons/CircularStarIcon'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import RadioGroup, { RadioOption } from '~/components/RadioGroup/RadioGroup'
import Typography from '~/components/Typography/Typography'
import FormikTextArea from '~/components/formik/FormikTextArea/FormikTextArea'
import { moodOptions } from '~/core/config/options'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { MainStackScreens, Screens } from '~/navigation/screens'

enum YesNo {
  Yes = 'YES',
  No = 'NO',
}

const yesNoOptions: RadioOption[] = [
  {
    label: 'Yes',
    value: YesNo.Yes,
  },
  {
    label: 'No',
    value: YesNo.No,
  },
]

enum Fields {
  Relapses = 'relapses',
  Honest = 'honest',
  Urge = 'urge',
  Mood = 'mood',
  OtherNotes = 'other_notes',
  ThankfullNotes = 'thankfull_notes',
  AddictionNotes = 'addiction_notes',
  Anxiety = 'Anxiety_note',
}

type CreateCheckinScreenProps = NativeStackScreenProps<
  MainStackScreens,
  Screens.CreateCheckinScreen
>

export type CreateCheckinScreenParams = undefined

const CreateCheckinScreen: React.FC<CreateCheckinScreenProps> = (props) => {
  const { navigation } = props
  const { state, refetchProfile } = useAuth()

  const initialValues = {
    [Fields.Relapses]: [],
    [Fields.Honest]: '',
    [Fields.Urge]: '',
    [Fields.Mood]: '',
    [Fields.ThankfullNotes]: '',
    [Fields.AddictionNotes]: '',
    [Fields.OtherNotes]: '',
    [Fields.Anxiety]: '',
  }

  const { isPending: checkingIn, mutate: createCheckIn } = useMutation({
    mutationFn: API.user.createCheckIn,
    onSuccess(res) {
      refetchProfile()
      toast.success('Checkin', 'Checkin added!')
      navigation.goBack()
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  const validationSchema = Yup.object().shape({
    [Fields.Honest]: Yup.string().required('Please select an option for Question 1'),
    [Fields.Urge]: Yup.string(),
    [Fields.Mood]: Yup.string().required('Please select an option for Question 3'),
  })

  const rootAddictions = state?.user?.parent_addictions || []

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit(values) {
      createCheckIn(
        values.relapses.map((relapse, index) => {
          let fields = {}
          if (rootAddictions[index].name.toLocaleLowerCase() !== 'anxiety & depression') {
            fields = { urge: values[Fields.Urge] === 'YES' }
          }
          return {
            mood: values[Fields.Mood],
            relapse: relapse === 'YES',
            honest: values[Fields.Honest] === 'YES',
            other_notes: values[Fields.OtherNotes],
            addiction_id: rootAddictions[index].id,
            thankfull_notes: values[Fields.ThankfullNotes],
            addiction_notes:
              rootAddictions[index].name.toLocaleLowerCase() === 'anxiety & depression'
                ? values[Fields.Anxiety]
                : values[Fields.AddictionNotes],
            ...fields,
          }
        })
      )
    },
  })

  const { setFieldValue, values, handleSubmit } = formik

  return (
    <FormikProvider value={formik}>
      <NavigationBar
        center
        button
        title="Create check in"
        onPressButton={handleSubmit}
        buttonTitle={checkingIn ? 'SUBMITTING...' : 'SUBMIT'}
      />
      <KeyboardView>
        <Block flex1>
          <ScrollView>
            {rootAddictions.map((category) => (
              <Block
                mT="xl"
                pH="lg"
                pV="lg"
                mH="xxxl"
                rounded="lg"
                align="center"
                bgColor="blue100"
                flexDirection="row"
                key={category.name}>
                <CircularStarIcon />
                <Typography mL="lg" variation="descriptionSemiBold">
                  {category.name}
                </Typography>
                {category.name.toLocaleLowerCase() !== 'anxiety & depression' && (
                  <Typography mL="sm" variation="descriptionRegular">
                    : Sober for {state.widgets?.soberness_days} Days
                  </Typography>
                )}
              </Block>
            ))}

            {rootAddictions.map((category, index) => (
              <Block key={category.name} mT="4xl" pH="xxxl" flexDirection="column">
                <Typography variation="paragraphSemiBold" mB="xl">
                  {category.name}
                </Typography>
                {category.name.toLocaleLowerCase() === 'anxiety & depression' ? (
                  <Typography variation="paragraphRegular" mB="xl">
                    Have you experienced anxiety or depression since your last check in?
                  </Typography>
                ) : (
                  <Typography variation="paragraphRegular" mB="xl">
                    Have you experienced a relapse today or since your last checkin?
                  </Typography>
                )}

                <Block align="center" flexDirection="row">
                  <RadioGroup
                    options={yesNoOptions}
                    selected={values.relapses[index]}
                    onChange={async (option) =>
                      setFieldValue(`${Fields.Relapses}.${index}`, option.value)
                    }
                  />
                </Block>
              </Block>
            ))}

            <Block mT="xxxl" pH="xxxl" flexDirection="column">
              <Typography variation="paragraphRegular" mT="sm">
                Were you honest with yourself today?
              </Typography>
              <Block mT="xl" align="center" flexDirection="row">
                <RadioGroup
                  options={yesNoOptions}
                  selected={values.honest}
                  onChange={async (option) => setFieldValue(Fields.Honest, option.value)}
                />
              </Block>
            </Block>

            {rootAddictions.filter(
              (category) => category.name.toLocaleLowerCase() !== 'anxiety & depression'
            )?.[0] && (
              <Block mT="xxxl" pH="xxxl" flexDirection="column">
                <Typography variation="paragraphRegular" mT="sm">
                  Did you experience an urge today?
                </Typography>

                <Block mT="xl" align="center" flexDirection="row">
                  <RadioGroup
                    options={yesNoOptions}
                    selected={values.urge}
                    onChange={async (option) => setFieldValue(Fields.Urge, option.value)}
                  />
                </Block>
              </Block>
            )}

            <Block mT="xxxl" pH="xxxl" flexDirection="column">
              <Typography variation="paragraphRegular" mT="sm">
                How is your mood today?
              </Typography>
              <Block mT="xl" align="center" flexDirection="row">
                <RadioGroup
                  options={moodOptions}
                  selected={values.mood}
                  renderField={(option, onChange) => {
                    return (
                      <Block
                        pH="lg"
                        pV="sm"
                        mR="lg"
                        bW={1}
                        rounded="xl"
                        bgColor="gray200"
                        onPress={onChange}
                        key={option.value}
                        bC={values.mood === option.value ? 'primary' : 'gray200'}>
                        <Typography variation="title3Light">{option.label}</Typography>
                      </Block>
                    )
                  }}
                  onChange={async (option) => setFieldValue(Fields.Mood, option.value)}
                />
              </Block>
            </Block>

            <Block mT="xxxl" pH="xxxl" flexDirection="column">
              <Typography variation="paragraphRegular" mT="sm">
                What is one thing you are thankful for today?{' '}
                <Typography color="gray500" variation="paragraphRegular">
                  (optional)
                </Typography>
              </Typography>
              <Block mT="xl" align="center" flexDirection="row">
                <FormikTextArea
                  numberOfLines={8}
                  inputHeight={80}
                  inputStyle={{ width: '100%' }}
                  style={{ width: '100%' }}
                  name={Fields.ThankfullNotes}
                  autoCapitalize="sentences"
                  placeholder="Write..."
                />
              </Block>
            </Block>

            {rootAddictions.filter(
              (category) => category.name.toLocaleLowerCase() === 'anxiety & depression'
            )?.[0] && (
              <Block mT="xxxl" pH="xxxl" flexDirection="column">
                <Typography variation="paragraphRegular" mT="sm">
                  Would you like to say anything to anxiety or depression today?
                  <Typography color="gray500" variation="paragraphRegular">
                    (optional)
                  </Typography>
                </Typography>
                <Block mT="xl" align="center" flexDirection="row">
                  <FormikTextArea
                    numberOfLines={8}
                    inputHeight={80}
                    inputStyle={{ width: '100%' }}
                    style={{ width: '100%' }}
                    name={Fields.Anxiety}
                    autoCapitalize="sentences"
                    placeholder="Write..."
                  />
                </Block>
              </Block>
            )}

            {rootAddictions.filter(
              (category) => category.name.toLocaleLowerCase() !== 'anxiety & depression'
            )?.[0] && (
              <Block mT="xxxl" pH="xxxl" flexDirection="column">
                <Typography variation="paragraphRegular" mT="sm">
                  Would you like to say anything to your addiction today?
                  <Typography color="gray500" variation="paragraphRegular">
                    (optional)
                  </Typography>
                </Typography>
                <Block mT="xl" align="center" flexDirection="row">
                  <FormikTextArea
                    numberOfLines={8}
                    inputHeight={80}
                    inputStyle={{ width: '100%' }}
                    style={{ width: '100%' }}
                    name={Fields.AddictionNotes}
                    autoCapitalize="sentences"
                    placeholder="Write..."
                  />
                </Block>
              </Block>
            )}

            <Block pB="xxxl" mT="xxxl" pH="xxxl" flexDirection="column">
              <Typography variation="paragraphRegular" mT="sm">
                Would you like to share anything else?{' '}
                <Typography color="gray500" variation="paragraphRegular">
                  (optional)
                </Typography>
              </Typography>
              <Block mT="xl" align="center" flexDirection="row">
                <FormikTextArea
                  numberOfLines={8}
                  inputHeight={80}
                  inputStyle={{ width: '100%' }}
                  style={{ width: '100%' }}
                  name={Fields.OtherNotes}
                  autoCapitalize="sentences"
                  placeholder="Write..."
                />
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </KeyboardView>
    </FormikProvider>
  )
}

export default CreateCheckinScreen
