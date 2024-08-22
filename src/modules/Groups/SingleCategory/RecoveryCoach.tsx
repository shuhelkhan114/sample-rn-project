import React from 'react'
import Block from '~/components/Block/Block'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'

interface RecoveryCoachProps {}

const RecoveryCoach: React.FC<RecoveryCoachProps> = (props) => {
  //   const {} = props

  return (
    <ScrollView>
      <Block pB="xxxl" flex1 align="center" justify="center" pH="xxxl" mT="5xl">
        {/* <Image size={getSize(72)} source={require('~/assets/userProfile1.png')} />
        <Typography pV="xxxl" variation="title1Regular">
          Yume Verified Recovery Coach
        </Typography> */}
        <Typography pB="xxxl">
          Introducing our &quot;Certified Recovery Coaches&quot; – individuals who&apos;ve triumphed
          over addiction for over a year. They&apos;re beacons of hope, ready to mentor and guide
          you on your journey to recovery.
        </Typography>
        <Typography pB="xxxl">
          These recover coaches have walked the path you&apos;re on, offering insight, support, and
          the promise of a brighter future. Embrace their wisdom as you navigate towards a
          healthier, addiction-free life.
        </Typography>
      </Block>
    </ScrollView>
  )
}

export default RecoveryCoach
