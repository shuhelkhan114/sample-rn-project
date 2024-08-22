import React from 'react'
import Block from '~/components/Block/Block'
import BookmarkIcon from '~/components/Icons/BookmarkIcon'
import DotIcon from '~/components/Icons/DotIcon'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'

interface RecoveryCoachProfileCardProps {}

const RecoveryCoachProfileCard: React.FC<RecoveryCoachProfileCardProps> = (props) => {
  return (
    <Block mV="xl" bW={1} bC="gray100" rounded="xl" overflow="hidden">
      <Block relative>
        <Block
          zIndex={10}
          absolute
          top={8}
          left={8}
          flexDirection="row"
          align="center"
          bgColor="white"
          pV="md"
          pH="md"
          rounded="lg">
          <BookmarkIcon width={16} height={16} />
          <Typography color="primary" variation="smallRegular" mL="sm">
            Recommended
          </Typography>
        </Block>
        <Image source={require('~/assets/recovery-coach.png')} />
      </Block>
      <Block pH="xxl" pB="xxl" pT="md">
        <Block flexDirection="row" justify="space-between" align="center">
          <Typography variation="paragraphSemiBold">Michael Carter</Typography>
          <Block flexDirection="row" align="center">
            <VerifiedAccountIcon width={16} height={16} />
            <Typography mL="sm" color="primary" variation="smallRegular">
              Verified
            </Typography>
          </Block>
        </Block>

        <Block flexDirection="row" align="center">
          <Typography mR="sm" variation="descriptionRegular">
            Tobacco, Alcohol
          </Typography>
          <DotIcon />
          <Typography mL="sm" color="primary" variation="descriptionRegular">
            6 month sober
          </Typography>
        </Block>
      </Block>
    </Block>
  )
}

export default RecoveryCoachProfileCard
