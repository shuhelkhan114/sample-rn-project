import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import ErrorBlock from '~/components/ErrorBlock/ErrorBlock'
import FetchingBlock from '~/components/FetchingBlock/FetchingBlock'
import InfoIcon2 from '~/components/Icons/InfoIcon2'
import Link from '~/components/Link/Link'
import Modal from '~/components/Modal/Modal'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import API from '~/core/services'
import useAuth from '~/hooks/useAuth'
import { MainStackScreens, Screens } from '~/navigation/screens'
import MeetingCard from './MeetingCard/MeetingCard'

interface MeetingsProps {}

function Meetings(props: MeetingsProps) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [infoModalVisible, setInfoModalVisible] = useState(false)

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreens, Screens.HomeScreen>>()

  const { state } = useAuth()

  const {
    isPending: fetchingMeetings,
    error: fetchingMeetingsError,
    refetch,
    isRefetching,
    data: meetings,
  } = useQuery({
    queryKey: ['user/meetings'],
    // Refetch every 1 minutes so that the user can see the updated meetings
    refetchInterval: 1 * 60 * 1000,
    queryFn: async () => API.user.fetchUpcomingMeetings(userTimezone),
  })

  useEffect(() => {
    if (state.user?.location_city) {
      refetch()
    }
  }, [state.user?.location_city])

  let content: React.ReactNode

  if (!state.user?.location_city) {
    content = (
      <Block pH="xl" mT="xl">
        <Typography>Please choose your nearest city to get meeting suggestion</Typography>
        <Link
          variation="descriptionBold"
          color="primary"
          center
          onPress={() => navigation.navigate(Screens.StateScreen, { from: 'main' })}>
          Choose City
        </Link>
      </Block>
    )
  } else if (fetchingMeetings) {
    content = <FetchingBlock />
  } else if (fetchingMeetingsError) {
    content = <ErrorBlock error={fetchingMeetingsError} onRetry={refetch} retrying={isRefetching} />
  } else if (!meetings?.[0]) {
    return null
  } else {
    content = (
      <ScrollView horizontal pV="xl" contentContainerStyle={{ paddingHorizontal: 16 }}>
        {meetings.map(({ meeting, status, local_time }) => (
          <MeetingCard
            status={status}
            key={meeting.id}
            startTime={local_time}
            weekDay={meeting.weekday}
            title={meeting.meeting_type}
            source={meeting.meeting_source}
            meetingId={meeting.meeting_id}
            meetingType={meeting.meeting_type}
            meetingLink={meeting.meeting_link}
            meetingPassCode={meeting.meeting_passcode}
          />
        ))}
      </ScrollView>
    )
  }

  return (
    <Block mB="xxxl" mT="xxl">
      <Modal visible={!!infoModalVisible} onClose={setInfoModalVisible}>
        <Typography mT="xxxl" variation="title4SemiBold">
          Today&apos;s Online G/A & Smart Meetings
        </Typography>

        <Typography color="gray800" mT="xxxl" variation="paragraphLight">
          GA focuses on spiritual growth and mutual support through the 12 steps, while SMART
          Recovery empowers you with scientific self-help approaches to behavior change. Engaging
          with either or both can be helpful -both avenues provide solid support
        </Typography>

        <Button title="Close" mT="xxl" onPress={() => setInfoModalVisible(false)} />
      </Modal>

      <Block pH="xl" flexDirection="row" align="center">
        <Typography variation="title6SemiBold">Online G/A & Smart Meetings</Typography>
        <Block pH="xl" onPress={() => setInfoModalVisible(true)}>
          <InfoIcon2 />
        </Block>
      </Block>

      {content}
    </Block>
  )
}

export default Meetings
