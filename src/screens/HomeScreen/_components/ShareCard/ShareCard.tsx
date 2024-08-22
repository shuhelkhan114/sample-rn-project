import { Share } from 'react-native'
import Block, { BlockProps } from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import Typography from '~/components/Typography/Typography'

interface ShareCardProps extends BlockProps {}

function ShareCard(props: ShareCardProps) {
  const handleShare = () => {
    Share.share({ url: 'https://2ly.link/1vsor' })
  }

  return (
    <Block pH="xl" rounded="xl" pV="xl" bgColor="white" shadow="sm" {...props}>
      <Typography variation="paragraphRegular" color="gray700">
        Share Yume in your G/A or SMART Zoom chats or with friends—it’s a simple act that supports
        both their recovery and yours.
      </Typography>

      <Typography mT="lg" color="gray500" variation="descriptionLight">
        Remember to share respectfully, without soliciting, just genuine support.
      </Typography>

      <Button onPress={handleShare} mT="xl" title="Spread the Word" />
    </Block>
  )
}

export default ShareCard
