import React from 'react'
import Block from '~/components/Block/Block'
import BookIcon from '~/components/Icons/BookIcon'
import CalendarIcon from '~/components/Icons/CalendarIcon'
import DotMenuIcon from '~/components/Icons/DotMenuIcon'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'

interface TherapistCardProps {
  dotMenuOption?: boolean
  bookIcon?: boolean
}

const TherapistCard: React.FC<TherapistCardProps> = (props) => {
  const { dotMenuOption = false, bookIcon = false } = props
  const theme = useAppTheme()

  return (
    <Block flexDirection="row" align="center" justify="space-between" pV="xl">
      <Block flexDirection="row" align="flex-start">
        <Image size={getSize(56)} source={require('~/assets/userProfile1.png')} />
        <Block mL="md">
          <Typography variation="paragraphSemiBold">Dr. Jack Owen</Typography>
          <Block flexDirection="row" align="center">
            <VerifiedAccountIcon width={16} height={16} fill={theme.colors.secondary} />
            <Typography variation="descriptionRegular">Verified Recovery Coach</Typography>
          </Block>
          <Typography variation="descriptionRegular" color="black">
            Sports Betting, Stock Marke...
          </Typography>
          <Typography color="positive" variation="descriptionRegular">
            3 therapy slots available today
          </Typography>
        </Block>
      </Block>
      {dotMenuOption ? (
        <DotMenuIcon />
      ) : (
        <Block
          mT="md"
          pH="md"
          pV="sm"
          rounded="md"
          onPress={() => {}}
          bgColor="secondary"
          flexDirection="row"
          align="center"
          style={{ maxWidth: 95 }}>
          {bookIcon ? <BookIcon /> : <CalendarIcon fill="#fff" />}
          <Typography mL="md" color="white" variation="paragraphRegular">
            Book
          </Typography>
        </Block>
      )}
    </Block>
  )
}

export default TherapistCard
