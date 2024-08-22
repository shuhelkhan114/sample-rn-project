import Block from '~/components/Block/Block'
import Button from '~/components/Button/Button'
import Image from '~/components/Image/Image'
import Modal from '~/components/Modal/Modal'
import Typography from '~/components/Typography/Typography'

interface SuccessModalProps {
  visible: boolean
  onConfirm: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = (props) => {
  const { visible, onConfirm } = props

  return (
    <Modal position="center" visible={visible} onClose={onConfirm}>
      <Block align="center">
        <Block
          width={92}
          height={92}
          align="center"
          justify="center"
          bgColor="gray100"
          style={{ borderRadius: 92 }}>
          <Image size={49} source={require('~/assets/success_party.png')} />
        </Block>
        <Typography mT="xxxl" variation="title4SemiBold">
          Profile revealed
        </Typography>
        <Typography center mT="xxxl" color="gray800" variation="paragraphLight">
          Congratulations on your courage and honesty with yourself!{'\n\n'}Now everyone in Yume can
          see you in the newsfeed and messaging.
        </Typography>
        <Button mT="xxxl" title="Okay" onPress={onConfirm} />
      </Block>
    </Modal>
  )
}

export default SuccessModal
