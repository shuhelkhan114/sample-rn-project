import LogRocket from '@logrocket/react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Fragment, useEffect } from 'react'
import Block from '~/components/Block/Block'
import HeartCheckOutlineIcon from '~/components/Icons/HeartCheckOutlineIcon'
import Image from '~/components/Image/Image'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { UserRole } from '~/context/AuthContext'
import useAuth from '~/hooks/useAuth'
import { useConfig } from '~/hooks/useConfig'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'
import LegacyHomeScreen from './LegacyHomeScreen'
import ContactCard from './_components/ContactCard/ContactCard'
import DebtBanner from './_components/DebtBanner/DebtBanner'
import EmptyFinancialManager from './_components/EmptyFinancialManager/EmptyFinancialManager'
import Header from './_components/Header/Header'
import Meetings from './_components/Meetings/Meetings'
import ShareCard from './_components/ShareCard/ShareCard'
import WidgetSteps from './_components/WidgetSteps/WidgetSteps'
import Widgets, { WidgetsProps } from './_components/Widgets/Widgets'
import YourWhy from './_components/YourWhy/YourWhy'

type HomeScreenProps = NativeStackScreenProps<MainStackScreens, Screens.HomeScreen>

export type HomeScreenParams = undefined

let timeout: NodeJS.Timeout

function HomeScreen({ navigation, route }: HomeScreenProps) {
  const theme = useAppTheme()
  const { state, currentUser } = useAuth()
  const { config } = useConfig()

  useEffect(() => {
    timeout = setTimeout(() => {
      LogRocket.shutdown()
    }, 10000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const dailySavings = state.user?.money_lost_total
    ? state.user?.money_lost_total / (state.user.money_lost_within_years * 365)
    : 0

  // const recoveryCoach = state.user?.recovery_coach

  const handleSOS = () => {
    navigation.navigate(Screens.GetHelpScreen)
  }

  const handleCreateCheckin = () => {
    navigation.navigate(Screens.CreateCheckinScreen)
  }

  const widgetsData: WidgetsProps = {
    soberness: {
      totalDays: state.widgets?.total_days as number,
      totalSoberDays: state.widgets?.soberness_days as number,
      growth: state.widgets?.soberness_percentage as number,
      streak: state.widgets?.soberness_streak as number,
    },
    savings: {
      total: state.widgets?.cash_saved as number,
    },
    hours: {
      total: state.widgets?.hours_saved as number,
    },
    lastGambleDate: state.user?.last_gamble_day as string,
  }

  const user = state.user

  let financialManagerSectionContent: React.ReactNode = null
  const financialManager = config?.financial_manager
  const debtOnboardingDone = state.user?.debt_onboarding_done

  // TODO: move this to into it's own component
  // if the debt onboarding is done
  if (debtOnboardingDone) {
    // if the user has a financial manager

    if (financialManager) {
      // display financial manager card
      financialManagerSectionContent = (
        <Block
          pL="xl"
          pV="xl"
          shadow="sm"
          rounded="lg"
          bgColor="white"
          flexDirection="row"
          justify="space-between">
          <Block flex1>
            <Typography variation="title6SemiBold">Reduce Your Debt</Typography>
            <Typography color="gray600" variation="paragraphLight">
              You have filled out the debt relief form. Our team will be contacting you today.
            </Typography>
          </Block>
          <Image source={require('~/assets/debt.png')} width={110} height={100} />
        </Block>
      )
    } else {
      // display no financial manager found, contact us text
      financialManagerSectionContent = (
        <EmptyFinancialManager username={user?.user_name as string} />
      )
    }
  } else {
    // display debt banner which leads to the debt onboarding
    financialManagerSectionContent = <DebtBanner />
  }

  if (state.role === UserRole.RecoveryCoach || state.role === UserRole.FinancialManager) {
    return <LegacyHomeScreen navigation={navigation} route={route} />
  }

  return (
    <Block flex1>
      <Header
        dailySavings={dailySavings}
        hours={state.user?.hours_spend_day as number}
        role={state.role as UserRole}
        name={currentUser.displayName}
        image={currentUser.displayImage}
      />

      <Block flex1>
        <ScrollView pB="xxl">
          <Block pH="xl">
            {state.user?.hours_spend_day ? (
              <Widgets
                hours={widgetsData.hours}
                savings={widgetsData.savings}
                soberness={widgetsData.soberness}
                lastGambleDate={widgetsData.lastGambleDate}
              />
            ) : (
              <WidgetSteps />
            )}
          </Block>

          <Meetings />

          <YourWhy />

          <Block pH="xl">{financialManagerSectionContent}</Block>

          <Block pH="xl">
            <ShareCard mT="md" />
          </Block>

          <ContactCard />
        </ScrollView>
        {currentUser.role === UserRole.User && (
          <Fragment>
            <Block
              width={54}
              height={54}
              bgColor="white"
              shadow="md"
              justify="center"
              align="center"
              rounded="6xl"
              absolute
              bottom={20}
              right={20}
              onPress={handleCreateCheckin}>
              <HeartCheckOutlineIcon fill={theme.colors.primary} />
            </Block>

            <Block
              width={54}
              height={54}
              bgColor="white"
              shadow="md"
              justify="center"
              align="center"
              rounded="6xl"
              absolute
              right={20}
              bottom={90}
              onPress={handleSOS}>
              <Image source={require('~/assets/sos.png')} size={27} />
            </Block>
          </Fragment>
        )}
      </Block>
    </Block>
  )
}

export default HomeScreen
