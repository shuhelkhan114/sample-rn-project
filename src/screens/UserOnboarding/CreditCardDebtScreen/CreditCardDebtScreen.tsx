import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { FormikProvider, useFormik } from 'formik'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import DropDown from '~/components/DropDown/DropDown'
import ErrorText from '~/components/ErrorText/ErrorText'
import KeyboardView from '~/components/KeyboardView/KeyboardView'
import NavigationBar from '~/components/NavigationBar/NavigationBar'
import ScrollView from '~/components/ScrollView/ScrollView'
import TextInput from '~/components/TextInput/TextInput'
import Typography from '~/components/Typography/Typography'
import FormikDropdown from '~/components/formik/FormikDropdown/FormikDropdown'
import toast from '~/core/lib/toast'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { AuthStackScreens } from '~/navigation/AuthStack'
import { Screens } from '~/navigation/screens'
import CheckBoxes from '~/screens/User/ReduceDebt/_components/CheckBoxes/CheckBoxes'
import Header from '../_components/Header/Header'
import Callout from './Callout/Callout'

type CreditCardDebtScreenProps = NativeStackScreenProps<
  AuthStackScreens,
  Screens.CreditCardDebtScreen
>

export type CreditCardDebtScreenParams = {
  from: 'onboarding' | 'home'
}

enum Fields {
  hasDebt = 'hasDebt',
  totalDebtAmount = 'totalDebtAmount',
  debtNature = 'debtNature',
  debtCreditors = 'debtCreditors',
  assets = 'assets',
  abilityToMakeMinimumPayments = 'abilityToMakeMinimumPayments',
  employmentStatus = 'employmentStatus',
  creditScore = 'creditScore',
  householdIncome = 'householdIncome',
  estimatedTimeToPayOffWithoutHelp = 'estimatedTimeToPayOffWithoutHelp',
  previousDebtReliefService = 'previousDebtReliefService',
  mainGoal = 'mainGoal',
  fullName = 'fullName',
  address = 'address',
}

const validationSchema = Yup.object().shape({})

const yesNoOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]

const employmentOptions = [
  {
    label: 'Employed full-time',
    value: 'Employed full-time',
  },
  {
    label: 'Employed part-time',
    value: 'Employed part-time',
  },
  {
    label: 'Unemployed',
    value: 'Unemployed',
  },
  {
    label: 'Self-employed',
    value: 'Self-employed',
  },
]

const debtReliefOptions = [
  {
    label: 'No, this is my first time seeking help',
    value: 'Noˌ this is my first time seeking help',
  },
  {
    label: 'Yes, I have used credit counseling/ debt management services',
    value: 'Yes, I have used credit counseling/ debt management services',
  },
  {
    label: 'Yes, I have filed for bankruptcy before',
    value: 'Yes, I have filed for bankruptcy before',
  },
]

const mainGoalOptions = [
  {
    label: 'Lower my monthly payments',
    value: 'Lower my monthly payments',
  },
  {
    label: 'Reduce the total debt owed',
    value: 'Reduce the total debt owed',
  },
  {
    label: 'Protect my credit score',
    value: 'Protect my credit score',
  },
  {
    label: 'Get a fresh start due to overwhelming debt',
    value: 'Get a fresh start due to overwhelming debt',
  },
]

const CreditCardDebtScreen: React.FC<CreditCardDebtScreenProps> = (props) => {
  const { navigation, route } = props
  const { from = 'onboarding' } = route.params

  const { state, refetchProfile } = useAuth()

  const { bottom } = useSafeAreaInsets()

  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: API.user.updateProfile,
    onSuccess() {
      refetchProfile()
      navigation.navigate(Screens.HoursLostScreen, { from })
    },
    onError(error: any) {
      toast.error('Profile', `${error.message || 'Something went wrong'}`)
    },
  })

  const formik = useFormik({
    initialValues: {
      [Fields.hasDebt]: '',
      [Fields.creditScore]: '',
      [Fields.totalDebtAmount]: '',
      [Fields.fullName]: '',
      [Fields.householdIncome]: '',
      [Fields.employmentStatus]: '',
      [Fields.previousDebtReliefService]: '',
      [Fields.mainGoal]: [],
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      if (state.user?.debt) {
        // TODO: refactor this block
        if (values.hasDebt === 'No') {
          updateProfile({
            debt: {
              ...(state.user?.debt || {}),
              hasDebt: false,
            },
            debt_onboarding_done: false,
          })
        } else {
          updateProfile({
            debt: {
              ...(state.user?.debt || {}),
              hasDebt: values.hasDebt === 'Yes',
              creditScore: Number(values.creditScore),
              totalDebtAmount: Number(values.totalDebtAmount),
              fullName: values.fullName,
              householdIncome: Number(values.householdIncome),
              employmentStatus: values.employmentStatus,
              previousDebtReliefService: [values.previousDebtReliefService],
              mainGoal: values.mainGoal,
            },
            debt_onboarding_done: true,
          })
        }
      }
    },
  })

  const { values } = formik

  const isFormValid =
    values.hasDebt === 'Yes'
      ? values.creditScore &&
        values.totalDebtAmount &&
        values.fullName &&
        values.householdIncome &&
        values.employmentStatus &&
        values.previousDebtReliefService &&
        values.mainGoal
      : true

  return (
    <FormikProvider value={formik}>
      <Block flex1>
        <KeyboardView>
          <NavigationBar />

          <Block pH="xl" flex1>
            <ScrollView pB="xxl">
              <Header step={from === 'home' ? 3 : 7} totalSteps={from === 'home' ? 5 : undefined} />

              <Block mT="xxxl" />

              <FormikDropdown
                name={Fields.hasDebt}
                placeholder="Select"
                options={yesNoOptions}
                modalTitle="Select Option"
                label="Do you have any debt Yume can help with?"
              />

              {values.hasDebt === 'Yes' && (
                <Block>
                  <Typography mT="xxxl">How much debt do you have?</Typography>
                  <TextInput
                    isCurrencyInput
                    minValue={1}
                    placeholder="Enter"
                    keyboardType="number-pad"
                    value={values.totalDebtAmount}
                    onChangeText={async (value) =>
                      formik.setFieldValue(Fields.totalDebtAmount, value)
                    }
                  />

                  {values.totalDebtAmount && Number(values.totalDebtAmount) > 100 && (
                    <Callout amount={Number(values.totalDebtAmount)} mT="xxxl" />
                  )}

                  <Typography mT="xxxl">What&apos;s your credit score?</Typography>
                  <TextInput
                    minValue={1}
                    maxValue={850}
                    placeholder="Enter"
                    keyboardType="number-pad"
                    value={values.creditScore}
                    onChangeText={async (value) => formik.setFieldValue(Fields.creditScore, value)}
                  />

                  <Typography mT="xxxl">Full Name</Typography>
                  <TextInput
                    placeholder="Enter"
                    autoCapitalize="words"
                    value={values.fullName}
                    onChangeText={async (value) => formik.setFieldValue(Fields.fullName, value)}
                  />

                  <Typography mT="xxxl">
                    Estimate your monthly household income (after taxes)
                  </Typography>
                  <TextInput
                    isCurrencyInput
                    minValue={1}
                    placeholder="Enter"
                    keyboardType="number-pad"
                    value={values.householdIncome}
                    onChangeText={async (value) =>
                      formik.setFieldValue(Fields.householdIncome, value)
                    }
                  />

                  <Block mT="xxl" />

                  <DropDown
                    label="What’s your current employment status?"
                    options={employmentOptions}
                    value={values.employmentStatus}
                    modalTitle="Select Option"
                    placeholder="Select"
                    onSelect={async (value) => formik.setFieldValue(Fields.employmentStatus, value)}
                  />

                  <Block mT="xxl" />

                  <DropDown
                    label="Have you previously used any debt relief services or filed for bankruptcy?"
                    placeholder="Select"
                    modalTitle="Select Option"
                    options={debtReliefOptions}
                    value={values.previousDebtReliefService}
                    separator="*"
                    onSelect={async (value) =>
                      formik.setFieldValue(Fields.previousDebtReliefService, value)
                    }
                  />

                  <Typography mT="xxxl">What is your main goal in seeking debt relief?</Typography>

                  <CheckBoxes
                    values={values.mainGoal}
                    options={mainGoalOptions}
                    onChange={async (values) => formik.setFieldValue(Fields.mainGoal, values)}
                  />
                </Block>
              )}
            </ScrollView>

            <Block style={{ paddingBottom: bottom }}>
              <Typography mB="lg" pV="sm" center variation="paragraphLight">
                Your identity or information will not be revealed to the community
              </Typography>

              <ErrorText error={error} />

              <Button
                title="Next"
                loading={isPending}
                disabled={!isFormValid}
                variation={!isFormValid ? 'secondary' : 'primary'}
                onPress={formik.submitForm}
                mB="xl"
              />
            </Block>
          </Block>
        </KeyboardView>
      </Block>
    </FormikProvider>
  )
}

export default CreditCardDebtScreen
