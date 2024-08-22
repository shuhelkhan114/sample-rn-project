import Block from '~/components/Block/Block'
import MessageIcon from '~/components/Icons/MessageIcon'
import PhoneIcon from '~/components/Icons/PhoneIcone'
import VerifiedAccountIcon from '~/components/Icons/VerifiedAccountIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import useAppTheme from '~/hooks/useTheme'

interface FinancialManagerCardProps {
  name: string
  image: string
  isOnline: boolean
  onMessage: () => void
  onCall: () => void
}

function FinancialManagerCard({
  name,
  image,
  isOnline,
  onMessage,
  onCall,
}: FinancialManagerCardProps) {
  const theme = useAppTheme()

  return (
    <Block
      mV="lg"
      pV="xl"
      pH="xl"
      shadow="sm"
      rounded="lg"
      align="center"
      bgColor="white"
      flexDirection="row"
      onPress={onMessage}
      justify="space-between">
      <Block flex1 flexDirection="row" align="center">
        <Block>
          <Image circular size={56} uri={image} />
          {isOnline && (
            <Block
              bW={1}
              absolute
              bottom={1}
              right={1}
              width={12}
              bC="white"
              height={12}
              rounded="xxxl"
              bgColor="positive"
            />
          )}
        </Block>

        <Block mL="lg" flex1>
          <Typography variation="descriptionSemiBold">{name}</Typography>
          <Typography color="gray600" variation="smallRegular" numberOfLines={1}>
            Financial Manager
          </Typography>
        </Block>
      </Block>

      <Block>
        <Block mB="lg" flexDirection="row" align="center" justify="flex-end">
          <VerifiedAccountIcon fill={theme.colors.positive} width={16} height={16} />
          <Typography mL="sm" color="positive" variation="smallRegular">
            Verified
          </Typography>
        </Block>
        <Block flexDirection="row" align="center">
          <Block
            pH="lg"
            pV="md"
            mR="md"
            rounded="md"
            onPress={onMessage}
            bgColor="backgroundPrimary">
            <MessageIcon fill={theme.colors.primary} width={11} height={11} />
          </Block>
          <Block pH="lg" pV="md" rounded="md" onPress={onCall} bgColor={'backgroundPrimary'}>
            <PhoneIcon fill={theme.colors.primary} />
          </Block>
        </Block>
      </Block>
    </Block>
  )
}

export default FinancialManagerCard
