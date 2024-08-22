import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import Block from '~/components/Block/Block'
import SmileIcon from '~/components/Icons/SmileIcon'
import Image from '~/components/Image/Image'
import Modal from '~/components/Modal/Modal'
import Typography from '~/components/Typography/Typography'
import { getSize } from '~/core/utils/responsive'
import { Screens } from '~/navigation/screens'

interface RevealYourselfProps {}

const RevealYourself: React.FC<RevealYourselfProps> = (props) => {
  const navigation = useNavigation<any>()
  const [modalVisible, setModalVisible] = useState(false)

  // const openModal = () => {
  //   setModalVisible(true)
  // }

  const revealUser = async () => {
    // revealYourSelf({ revealed_to_community: true })
    // setModalVisible(false)
    navigation.navigate(Screens.PreparePublicProfileScreen)
  }

  return (
    <Block style={{ width: '100%' }}>
      <Modal onClose={setModalVisible} visible={modalVisible}>
        <Block align="center" pV="xl">
          <Image source={require('~/assets/userProfile2.png')} size={getSize(74)} />
          <Typography mV="lg" color="white" variation="descriptionSemiBold">
            RecoveryTrailblazer
          </Typography>
          <Typography mV="xxl" variation="descriptionSemiBold">
            Show your true colors
          </Typography>
          <Typography variation="paragraphRegular">
            Feel the freedom to reveal yourself to everyone when you&apos;re comfortable. It&apos;s
            your choice, and your privacy is always respected.
          </Typography>
          <Typography pT="xl" mB="xxxl" variation="paragraphRegular">
            If you choose to reveal yourself you&apos;ll be seen as Jane Doe only by everyone that
            follows you.
          </Typography>
          <Block pH="md" style={{ width: '100%' }}>
            <Block
              bgColor="primary"
              rounded="md"
              pV="xl"
              flexDirection="row"
              justify="center"
              align="center"
              onPress={revealUser}
              style={{ width: '100%' }}>
              <SmileIcon />
              <Typography mL="lg" center variation="descriptionRegular" color="white">
                Reveal Yourself
              </Typography>
            </Block>
          </Block>
        </Block>
      </Modal>
      <Block
        pV="md"
        mT="xl"
        rounded="md"
        align="center"
        bgColor="primary"
        justify="center"
        flexDirection="row"
        onPress={revealUser}
        style={{ width: '100%' }}>
        <SmileIcon fill="white" />
        <Typography mL="sm" center variation="descriptionRegular" color="white">
          Reveal Yourself to everyone
        </Typography>
      </Block>
    </Block>
  )
}

export default RevealYourself
