import React from 'react'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import RecoveryCoachCard from '~/modules/Cards/RecoveryCoachCard'

interface RecoveryCoachesProps {}

const RecoveryCoaches: React.FC<RecoveryCoachesProps> = (props) => {
  // const {} = props

  return (
    <Block pV="xxxl">
      <Block>
        <Typography variation="descriptionSemiBold">Reached by you before</Typography>
        <RecoveryCoachCard />
      </Block>
      <Block mT="xl">
        <Typography variation="descriptionSemiBold">All Recovery Coaches</Typography>
        <RecoveryCoachCard />
        <RecoveryCoachCard />
        <RecoveryCoachCard />
        <RecoveryCoachCard />
        <RecoveryCoachCard />
        <RecoveryCoachCard />
        <RecoveryCoachCard />
      </Block>
    </Block>
  )
}

export default RecoveryCoaches
