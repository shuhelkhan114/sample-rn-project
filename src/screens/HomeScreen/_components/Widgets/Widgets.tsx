import { Text } from 'react-native'

import { Popable } from 'react-native-popable'
import { PieChart } from 'react-native-svg-charts'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import Button from '~/components/Button/Button'
import InfoIcon2 from '~/components/Icons/InfoIcon2'
import InfoIcon3 from '~/components/Icons/InfoIcon3'
import Modal from '~/components/Modal/Modal'
import { getSize } from '~/core/utils/responsive'
import AnimatedNumber from './AnimatedNumber'
import WidgetCard from './WidgetCard/WidgetCard'

export interface WidgetsProps {
  soberness: {
    growth: number
    totalDays: number
    totalSoberDays: number
    streak: number
  }
  savings: {
    total: number
  }
  hours: {
    total: number
  }
  lastGambleDate: string
}

// TODO: Refactor this whole component
function Widgets({ soberness, savings, hours, lastGambleDate }: WidgetsProps) {
  const isSoberAndTotalSoberDaysEqual = soberness.totalDays === soberness.totalSoberDays

  const [infoModalVisible, setInfoModalVisible] = useState<'soberness' | null>(null)

  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true)
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  })

  if (!ready) {
    return null
  }

  const colors = ['#8001FF', '#C6D2FD', '#C6D2FD', '#F0E5FC', '#E5EAFC', '#C6D2FD']
  let finalData = []
  const streak = soberness.streak
  let emoji = ''
  let text = ''
  let streakTop: string = '0%'
  let streakLeft: string = '0%'

  if (streak < 30) {
    const arcValue = 15
    const percentage = streak / 30
    const value = percentage * arcValue
    finalData = [value, arcValue - value, 8, 8, 8, 11]
    emoji = '🔥'
    text = 'You are doing \ngreat!'
    streakTop = '10%'
    streakLeft = '10%'
  } else if (streak < 60) {
    const arcValue = 8
    const percentage = (streak - 30) / 30
    const value = percentage * arcValue
    finalData = [15, value, arcValue - value, 8, 8, 11]
    emoji = '🔥'
    text = 'You are doing\n great!'
    streakTop = '-5%'
    streakLeft = '35%'
  } else if (streak < 90) {
    const arcValue = 8
    const percentage = (streak - 60) / 30
    const value = percentage * arcValue
    finalData = [15, 8, value, arcValue - value, 8, 11]
    emoji = '🚀'
    text = 'Almost there!'
    streakTop = '-5%'
    streakLeft = '55%'
  } else if (streak < 180) {
    const arcValue = 8
    const percentage = (streak - 90) / 90
    const value = percentage * arcValue
    finalData = [15, 8, 8, value, arcValue - value, 11]
    emoji = '🚀'
    text = 'Almost there!'
    streakTop = '0%'
    streakLeft = '75%'
  } else if (streak < 365) {
    const arcValue = 11
    const percentage = (streak - 180) / 185
    const value = percentage * arcValue
    finalData = [15, 8, 8, 8, value, arcValue - value]
    emoji = '❤️'
    text = 'You did it!'
    streakTop = '20%'
    streakLeft = '85%'
  } else {
    emoji = '❤️'
    text = 'You did it!'
    finalData = [15, 8, 8, 8, 11, 0]
    streakTop = '20%'
    streakLeft = '85%'
  }

  const daysMapping = [30, 60, 90, 180, 365]

  const pieData = finalData.map((value, index) => {
    const i = daysMapping.findIndex((day) => day >= streak)
    const slot = i === -1 ? 0 : i
    return {
      value,
      svg: {
        fill: streak > 360 ? '#8001FF' : slot >= index ? '#8001FF' : colors[index],
      },
      arc: {
        padAngle: slot === index - 1 ? 0 : 0.02,
      },
      key: `pie-${index}`,
    }
  })

  const startAngle = -Math.PI / 2
  const endAngle = Math.PI / 2

  return (
    <Block mT="lg">
      <Modal visible={!!infoModalVisible} onClose={() => setInfoModalVisible(null)}>
        <Typography mT="xxxl" variation="title4SemiBold">
          How we calculate
        </Typography>

        <Typography color="gray800" mT="xxxl" variation="paragraphLight">
          We track your progress from your last gamble date,{' '}
          <Typography color="gray800" variation="paragraphSemiBold">
            {format(new Date(lastGambleDate), 'MMM Lo, yyyy')}
          </Typography>{' '}
          noted at sign-up. Relapses reset streaks, but your savings, overall sober days, and time
          gained remain. It&apos;s about progress, not perfection.
        </Typography>

        <Block
          flexDirection="row"
          mT="xxxl"
          pH="lg"
          pV="lg"
          align="center"
          style={{ backgroundColor: '#FFA50026' }}
          rounded="lg">
          <Block
            width={24}
            height={24}
            rounded="6xl"
            align="center"
            justify="center"
            bgColor="warning">
            <InfoIcon3 />
          </Block>
          <Typography mL="lg" variation="paragraphRegular">
            Widgets update every 24 hours
          </Typography>
        </Block>

        <Button title="Close" mT="lg" onPress={() => setInfoModalVisible(null)} />
      </Modal>

      <Block flexDirection="row">
        <WidgetCard mR="lg" onPress={() => setInfoModalVisible('soberness')}>
          <Block absolute top={10} right={10}>
            <InfoIcon2 />
          </Block>
          <Block flexDirection="row" align="flex-end">
            <AnimatedNumber value={soberness.totalSoberDays} />
            <Typography color="gray600" variation="descriptionLight" mB="sm">
              {!isSoberAndTotalSoberDaysEqual && `/${soberness.totalDays}`} days
            </Typography>
          </Block>

          <Block mT="xxl">
            <Typography variation="descriptionSemiBold">☺️️ Soberness</Typography>
          </Block>
        </WidgetCard>

        <WidgetCard justify="space-between">
          <AnimatedNumber value={parseInt(savings.total?.toString())} isCurrency />
          <Typography variation="descriptionSemiBold">💰 Cash Kept</Typography>
        </WidgetCard>
      </Block>

      <Block flexDirection="row" mT="lg">
        <WidgetCard mR="lg" justify="space-between">
          <Block flexDirection="row" align="flex-end">
            <AnimatedNumber value={hours.total} />
            <Typography variation="title6Light" mB="xs">
              {' '}
              Hours
            </Typography>
          </Block>
          <Block mT="xxxl">
            <Typography variation="descriptionSemiBold">👨‍👩‍👦 Moments Saved</Typography>
          </Block>
        </WidgetCard>

        <WidgetCard flex1 width="100%" height={120} justify="space-between" pT="sm">
          {/* TODO: Make it a reusable component */}
          <Block
            pH="sm"
            absolute
            rounded="lg"
            zIndex={999999}
            top={streakTop as any}
            left={streakLeft as any}
            // Move this to theme palette
            style={{ backgroundColor: '#1E1B39' }}>
            <Block
              bgColor="red800"
              absolute
              top="70%"
              left="50%"
              height={8}
              width={8}
              rounded="sm"
              style={{ backgroundColor: '#1E1B39', transform: [{ rotate: '45deg' }] }}
            />
            <Typography color="white" variation="smallRegular" style={{ fontSize: getSize(8) }}>
              {streak} days
            </Typography>
          </Block>
          <Popable visible content={`${streak} days`}>
            <Block align="center" onPress={() => {}}>
              <PieChart
                // @ts-ignore
                sort={null}
                startAngle={startAngle}
                onPress={() => alert('Hello')}
                endAngle={endAngle}
                innerRadius={'55%'}
                style={{
                  position: 'absolute',
                  height: getSize(140),
                  width: getSize(140),
                }}
                data={pieData as any}
              />
            </Block>

            <Block absolute zIndex={999} width="100%" height={120} align="center" justify="center">
              <Text style={{ fontSize: 9.5 }}>{emoji}</Text>
              <Text style={{ fontSize: getSize(8), textAlign: 'center' }}>{text}</Text>
            </Block>
          </Popable>

          <Block mT="4xl">
            <Typography variation="descriptionSemiBold">⚡️ Sober Streak</Typography>
          </Block>
        </WidgetCard>
      </Block>
    </Block>
  )
}

export default Widgets
