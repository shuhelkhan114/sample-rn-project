import React from 'react'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import TherapistCard from '~/modules/Cards/TherapistCard'

interface TherapistsProps {}

const Therapists: React.FC<TherapistsProps> = (props) => {
  //   const {} = props

  return (
    <Block pV="xxxl">
      <Block>
        <Typography variation="descriptionSemiBold">Booked by you before</Typography>
        <TherapistCard bookIcon={true} />
      </Block>
      <Block mT="xl">
        <Typography variation="descriptionSemiBold">All therapists</Typography>
        <TherapistCard bookIcon={true} />
        <TherapistCard bookIcon={true} />
        <TherapistCard bookIcon={true} />
        <TherapistCard bookIcon={true} />
        <TherapistCard bookIcon={true} />
        <TherapistCard bookIcon={true} />
      </Block>
    </Block>
  )
}

export default Therapists
