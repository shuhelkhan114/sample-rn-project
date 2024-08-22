import React from 'react'
import Block from '~/components/Block/Block'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { getSize } from '~/core/utils/responsive'

interface TherapistProps {}

const Therapist: React.FC<TherapistProps> = (props) => {
  //   const {} = props

  return (
    <Block flex1 align="center" justify="center" pH="xxxl" mT="5xl">
      <Image size={getSize(72)} source={require('~/assets/userProfile1.png')} />
      <Typography pV="xxxl" variation="title1Regular">
        Yume Therapists
      </Typography>
      <Typography pB="xxxl">
        Introducing our &quot;Verified Recovery Coach&quot; – individuals who&apos;ve triumphed over
        addiction for over a year. They&apos;re beacons of hope, ready to mentor and guide you on
        your journey to recovery.
      </Typography>
      <Typography pB="xxxl">
        These recovery coaches have walked the path you&apos;re on, offering insight, support, and
        the promise of a brighter future. Embrace their wisdom as you navigate towards a healthier,
        addiction-free life.
      </Typography>
    </Block>
  )
}

export default Therapist
