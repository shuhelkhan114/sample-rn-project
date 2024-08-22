import { captureException } from '@sentry/react-native'
import { useState } from 'react'
import { Dimensions, Linking, Share } from 'react-native'
import Block, { BlockProps } from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import Divider from '~/components/Divider/Divider'
import ClockIcon from '~/components/Icons/ClockIcon'
import DuplicateIcon from '~/components/Icons/DuplicateIcon'
import PhoneIcon from '~/components/Icons/PhoneIcone'
import Image from '~/components/Image/Image'
import Link from '~/components/Link/Link'
import Modal from '~/components/Modal/Modal'
import Typography from '~/components/Typography/Typography'
import toast from '~/core/lib/toast'
import { capitalizeFirstLetter } from '~/core/utils/common'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'

interface MeetingCardProps extends BlockProps {
  title: string
  source: string
  meetingId: string
  weekDay: string
  meetingPassCode: string
  startTime: string
  status: string
  meetingLink: string
  meetingType: string
}

function MeetingCard({
  title,
  status,
  source,
  meetingId,
  weekDay,
  meetingPassCode,
  meetingLink,
  startTime,
  meetingType,
  ...restProps
}: MeetingCardProps) {
  const theme = useAppTheme()

  const [joinModalVisible, setJoinModalVisible] = useState(false)

  let link = ''

  if (meetingLink?.startsWith('http')) {
    link = meetingLink
  } else if (meetingPassCode?.startsWith('http')) {
    link = meetingPassCode
  } else if (meetingId?.startsWith('http')) {
    link = meetingId
  }

  const joinMeeting = () => {
    setJoinModalVisible(false)
    Linking.openURL(link)
  }

  const handleJoin = async () => {
    setJoinModalVisible(true)
  }

  let modalTitle = 'General Notice for a G/A Meeting'
  let content = (
    <>
      <Typography color="gray800" variation="paragraphLight">
        Are you ready to join today’s meeting and take a step forward in your recovery journey?
      </Typography>
      <Typography mT="xxl" color="gray800" variation="paragraphLight">
        Joining a Gamblers Anonymous meeting today? Here’s what to expect: We begin with
        introductions and then share our stories and support each other. Sharing is optional;
        listening is just as valuable. Our meetings are a confidential and safe space. For any extra
        support, our app resources are here for you.
      </Typography>
    </>
  )

  if (meetingType === 'Smart Recovery Meeting') {
    modalTitle = 'General Notice for a SMART Meeting'
    content = (
      <>
        <Typography color="gray800" variation="paragraphLight">
          Are you ready to join today’s meeting and take a step forward in your recovery journey?
        </Typography>
        <Typography mT="xxl" color="gray800" variation="paragraphLight">
          Ready for your SMART Recovery meeting? Here’s a quick rundown: Meetings start with
          introductions, then move to discussions on coping strategies and experiences. Feel free to
          share or just listen. Everything’s confidential, creating a safe space for all. Remember,
          you&apos;re not alone in this journey. Support is always available in the app.
        </Typography>
      </>
    )
  }

  return (
    <Block
      mR="xl"
      pH="lg"
      pV="lg"
      shadow="sm"
      bgColor="white"
      rounded="xl"
      width={Dimensions.get('screen').width * 0.75}
      {...restProps}>
      <Modal visible={joinModalVisible} onClose={() => setJoinModalVisible(false)}>
        <Typography variation="title4SemiBold">{modalTitle}</Typography>
        <Block mT="xxxl">{content}</Block>
        <Button onPress={joinMeeting} mT="xxxl" title="Yes - Let's Go" />
        <Button
          onPress={() => setJoinModalVisible(false)}
          mT="md"
          variation="tertiary"
          title="No - I'm not ready"
        />
      </Modal>
      <Block flexDirection="row" align="center" justify="space-between" wrap>
        <Typography color="gray800" variation="title6SemiBold">
          {title}
        </Typography>
        <Image width={82} height={34} source={require('../../../../../assets/zoom.png')} />
      </Block>

      <Block mT="xl" flexDirection="row" align="center">
        <ClockIcon stroke={theme.colors.gray500} />
        <Typography mR="auto" variation="paragraphRegular" color="gray700" mL="md">
          {capitalizeFirstLetter(weekDay)}, {startTime}
        </Typography>
        {status === 'ongoing' && (
          <Block pH="md" rounded="xl" style={{ backgroundColor: theme.colors.primary + '1A' }}>
            <Typography color="primary">On-Going</Typography>
          </Block>
        )}
      </Block>

      <Divider mV="lg" />

      <Block flexDirection="row" align="center">
        <DuplicateIcon />
        <Block mL="md" flex1>
          <Typography color="gray700" variation="paragraphRegular">
            Meeting Link:{' '}
          </Typography>
          <Link
            color="primary"
            variation="smallLight"
            onPress={() => {
              Share.share({ message: link })
                .then((res) => {})
                .catch((error) => {
                  captureException(error)
                  toast.error('Error', 'Unable to share link, please try again later!')
                })
            }}>
            Share Link
          </Link>
        </Block>
        <Button
          mL="lg"
          title="Join"
          style={{ flex: 1 }}
          variation="secondary"
          onPress={handleJoin}
          textStyle={{ fontSize: getSize(12) }}
          icon={<PhoneIcon width={15} height={15} fill={theme.colors.primary} />}
        />
      </Block>
    </Block>
  )
}

export default MeetingCard
