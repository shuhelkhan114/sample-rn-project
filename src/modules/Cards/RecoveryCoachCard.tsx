import React from 'react'
import Block from '~/components/Block/Block'
import CommentIcon from '~/components/Icons/CommentIcon'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'

interface RecoveryCoachCardProps {
  name?: string
  // TODO: valid type of image
  image?: any
}

const RecoveryCoachCard: React.FC<RecoveryCoachCardProps> = (props) => {
  const { name, image } = props
  const theme = useAppTheme()

  return (
    <Block flexDirection="row" align="center" justify="space-between" pV="xl">
      <Block flexDirection="row" align="center">
        <Image size={getSize(56)} source={image || require('~/assets/userProfile2.png')} />
        <Block mL="md">
          <Typography variation="paragraphSemiBold">{name || 'Michael Carter'}</Typography>
          <Block flexDirection="row" align="center">
            <VerifiedAccountIcon width={16} height={16} fill={theme.colors.secondary} />
            <Typography variation="descriptionRegular">Verified Recovery Coach</Typography>
          </Block>
          <Typography variation="descriptionRegular" color="black">
            Tobacco, Alcohol
          </Typography>
          <Typography variation="descriptionRegular" color="positive">
            6 month sober
          </Typography>
        </Block>
      </Block>

      <Block
        mT="md"
        pH="md"
        pV="sm"
        rounded="md"
        onPress={() => {}}
        bgColor="secondary"
        flexDirection="row"
        align="center"
        style={{ maxWidth: 100 }}>
        <CommentIcon fill="#fff" />
        <Typography mL="sm" color="white" variation="descriptionRegular">
          Message
        </Typography>
      </Block>
    </Block>
  )
}

export default RecoveryCoachCard
