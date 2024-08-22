import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { ChevronLeft } from 'react-native-feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import ChevronRight from '~/components/Icons/ChevronRight'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { ConfigContext } from '~/context/ConfigContext'
import { moodOptions } from '~/core/config/options'
import API from '~/core/services'
import useAppTheme from '~/hooks/useTheme'
import { MainStackScreens, Screens } from '~/navigation/screens'
import { Addiction } from '~/typings/addiction'
import { CheckIn } from '~/typings/checkin'

// enum CheckInFilter {
//   Daily = 'daily',
//   Weekly = 'weekly',
// }

const tabs = ['Current check-in', 'Check-in history']

type AllCheckInScreenProps = NativeStackScreenProps<MainStackScreens, Screens.AllCheckInScreen>

export type AllCheckInScreenParams = undefined

const AllCheckInScreen: React.FC<AllCheckInScreenProps> = (props) => {
  const { navigation } = props

  // const [, setType] = useState<CheckInFilter>(CheckInFilter.Daily)
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const [lastCheckIn, setLastCheckIn] = useState<CheckIn>()
  const [lastCheckInAddiction, setLastCheckInAddiction] = useState<Addiction>()

  const theme = useAppTheme()
  const { top } = useSafeAreaInsets()
  const { config } = useContext(ConfigContext)

  const {
    isPending: fetchingCheckIns,
    error: fetchingCheckInsError,
    data: checkins,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['checkins'],
    queryFn: API.user.getAllCheckins,
  })

  useEffect(() => {
    if (config && checkins) {
      const lastCheckIn = checkins?.[checkins && +checkins?.length - 1]
      const lastCheckInAddiction = config.addictions.filter(
        (item) => item.id === lastCheckIn?.addiction_id
      )[0]
      setLastCheckIn(lastCheckIn)
      setLastCheckInAddiction(lastCheckInAddiction)
    }
  }, [config, checkins])

  // const handleViewDaily = () => {
  //   setType(CheckInFilter.Daily)
  // }

  // const handleViewWeekly = () => {
  //   setType(CheckInFilter.Weekly)
  // }

  let content: React.ReactNode = null

  if (fetchingCheckIns) {
    content = <ActivityIndicator />
  } else if (fetchingCheckInsError) {
    content = <ErrorText error={fetchingCheckInsError} />
  } else if (checkins.length < 1) {
    content = <Typography>No checkins found!</Typography>
  } else if (checkins) {
    content = (
      <Block mT="xl">
        <Block
          pH="sm"
          pV="sm"
          rounded="xl"
          bgColor="gray200"
          flexDirection="row"
          justify="space-between">
          {tabs.map((tab) => {
            return (
              <Block
                flex1
                key={tab}
                shadow="sm"
                rounded="xl"
                onPress={() => {
                  setSelectedTab(tab)
                }}
                bgColor={selectedTab === tab ? 'white' : 'gray200'}>
                <Typography center variation="paragraphSemiBold">
                  {tab}
                </Typography>
              </Block>
            )
          })}
        </Block>
        {selectedTab === 'Current check-in' ? (
          <ScrollView>
            {lastCheckInAddiction && lastCheckIn && (
              <Block mT="4xl" flexDirection="column">
                <Typography variation="paragraphSemiBold" mB="xl">
                  {lastCheckInAddiction.name}
                </Typography>
                {lastCheckInAddiction.name.toLocaleLowerCase() === 'anxiety & depression' ? (
                  <Typography variation="paragraphRegular" mB="xl">
                    Have you experienced anxiety or depression since your last check in?
                  </Typography>
                ) : (
                  <Typography variation="paragraphRegular" mB="xl">
                    Have you experienced a relapse today or since your last checkin?
                  </Typography>
                )}
                <Typography color="primary" variation="paragraphSemiBold">
                  {lastCheckIn?.relapse ? 'Yes' : 'No'}
                </Typography>
              </Block>
            )}

            <Block mT="xxxl" flexDirection="column">
              <Typography variation="paragraphRegular" mT="sm">
                Were you honest with yourself today?
              </Typography>
              <Typography color="primary" variation="paragraphSemiBold">
                {lastCheckIn?.honest ? 'Yes' : 'No'}
              </Typography>
            </Block>
            {lastCheckInAddiction?.name.toLocaleLowerCase() !== 'anxiety & depression' && (
              <Block mT="xxxl" flexDirection="column">
                <Typography variation="paragraphRegular" mT="sm">
                  Did you experience an urge today?
                </Typography>
                <Typography color="primary" variation="paragraphSemiBold">
                  {lastCheckIn?.urge ? 'Yes' : 'No'}
                </Typography>
              </Block>
            )}

            <Block mT="xxxl" flexDirection="column">
              <Typography variation="paragraphRegular" mT="sm">
                How is your mood today?
              </Typography>
              <Typography color="primary" variation="paragraphSemiBold">
                {moodOptions.find((mood) => mood.value === lastCheckIn?.mood)?.label ||
                  lastCheckIn?.mood}
              </Typography>
            </Block>

            <Block mT="xxxl" flexDirection="column">
              <Typography variation="paragraphRegular" mT="sm">
                What is one thing you are thankful for today?{' '}
                <Typography color="gray500" variation="paragraphRegular">
                  (optional)
                </Typography>
              </Typography>

              <Typography color="primary" variation="paragraphSemiBold">
                {lastCheckIn?.thankfull_notes}
              </Typography>
            </Block>

            <Block mT="xxxl" flexDirection="column">
              <Typography variation="paragraphRegular" mT="sm">
                Would you like to say anything to your addiction today?{' '}
                <Typography color="gray500" variation="paragraphRegular">
                  (optional)
                </Typography>
              </Typography>
              <Typography color="primary" variation="paragraphSemiBold">
                {lastCheckIn?.addiction_notes}
              </Typography>
            </Block>

            <Block mT="xxxl" pB="xxxl" flexDirection="column">
              <Typography variation="paragraphRegular" mT="sm">
                Would you like to share anything else?{' '}
                <Typography color="gray500" variation="paragraphRegular">
                  (optional)
                </Typography>
              </Typography>
              <Typography color="primary" variation="paragraphSemiBold">
                {lastCheckIn?.other_notes}
              </Typography>
            </Block>
          </ScrollView>
        ) : (
          <Block mT="4xl">
            {checkins
              .sort(
                (c1, c2) => new Date(c2.created_at).getTime() - new Date(c1.created_at).getTime()
              )
              .map((checkIn) => {
                const handlePress = () => {
                  const checkInDetails = {
                    addition_name: config?.addictions.filter(
                      (item) => item.id === checkIn?.addiction_id
                    )[0]?.name,
                    ...checkIn,
                  }
                  navigation.navigate(Screens.CheckInDetailScreen, { checkIn: checkInDetails })
                }

                return (
                  <Block
                    pH="xl"
                    pV="xl"
                    mB="xl"
                    shadow="sm"
                    rounded="lg"
                    bgColor="white"
                    key={checkIn.id}
                    onPress={handlePress}>
                    <Block flexDirection="row" justify="space-between">
                      <Typography color="gray700" variation="paragraphRegular">
                        Check-in Submitted
                      </Typography>

                      <ChevronRight fill={theme.colors.black} />
                    </Block>

                    <Block mT="md" flexDirection="row" justify="space-between">
                      <Typography color="gray500" variation="paragraphRegular">
                        {new Date(checkIn.created_at).toDateString()}
                      </Typography>

                      <Block
                        pH="xl"
                        pV="sm"
                        rounded="md"
                        bgColor={checkIn.relapse ? 'red100' : 'yellow100'}>
                        <Typography
                          variation="descriptionRegular"
                          color={checkIn.relapse ? 'red800' : 'yellow800'}>
                          {checkIn.relapse ? 'Relapse' : `Sober for ${checkIn.days || 0} days`}
                        </Typography>
                      </Block>
                    </Block>
                  </Block>
                )
              })}
          </Block>
        )}
      </Block>
    )
  }

  return (
    <Block flex1>
      <Block
        pV="xl"
        pH="xxxl"
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
            All Check in
          </Typography>
          <Block />
          {/* <Menu>
            <MenuTrigger>
              <DotMenuIcon fill={theme.colors.gray500} />
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.rounded.xl,
                marginTop: theme.spacing.xxxl,
              }}>
              <MenuOption onSelect={handleViewDaily}>
                <Typography pV="md" pH="xl" variation="descriptionRegular">
                  Daily
                </Typography>
              </MenuOption>

              <MenuOption onSelect={handleViewWeekly}>
                <Typography pV="md" pH="xl" variation="descriptionRegular">
                  Weekly
                </Typography>
              </MenuOption>
            </MenuOptions>
          </Menu> */}
        </Block>
      </Block>

      <ScrollView refreshing={isRefetching} onRefresh={refetch} pH="xxxl">
        {content}
      </ScrollView>
    </Block>
  )
}

export default AllCheckInScreen
