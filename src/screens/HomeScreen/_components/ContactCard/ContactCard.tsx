import { Linking } from 'react-native'
import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import PhoneIcon from '~/components/Icons/PhoneIcone'
import Image from '~/components/Image/Image'

import Typography from '~/components/Typography/Typography'
import useAppTheme from '~/hooks/useTheme'

function ContactCard() {
  const theme = useAppTheme()

  return (
    <Block mT="xl" pH="xl">
      <Typography variation="title5SemiBold">Reach out to us</Typography>
      <Block mT="xl" pH="md" pV="xl" shadow="sm" rounded="xl" align="center" bgColor="white">
        <Block flexDirection="row">
          <Image width={100} height={72} source={require('../../../../assets/announcement.png')} />
          <Typography variation="paragraphRegular" flex1>
            Keep our 24/7 support hotline,{' '}
            <Typography variation="paragraphRegular" color="primary">
              585-535-YUME (9863)
            </Typography>
            , saved in your contacts!
          </Typography>
        </Block>
        <Typography color="gray600" mT="md" variation="descriptionLight">
          We use this number to check in on you during your onboarding calls and provide support
          whenever you need it. Available 24/7 for support & product inquiries.
        </Typography>
        <Button
          mT="xl"
          title="Call us"
          variation="secondary"
          onPress={async () => Linking.openURL('tel:5855359863')}
          icon={<PhoneIcon width={24} height={24} fill={theme.colors.primary} />}
        />
      </Block>
    </Block>
  )
}

export default ContactCard
