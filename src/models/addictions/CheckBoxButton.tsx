import React, { useState } from 'react'
import Block from '~/components/Block/Block'
import CheckBox from '~/components/CheckBox/CheckBox'
import ChevronBottom from '~/components/Icons/ChevronBottom'
import Link from '~/components/Link/Link'
import Modal from '~/components/Modal/Modal'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { Addiction } from '~/typings/addiction'

interface CheckBoxButtonProps {
  addiction: Addiction
  selectedAddictions: Addiction[]
  onChange: (addiction: Addiction) => void
}

const CheckBoxButton: React.FC<CheckBoxButtonProps> = (props) => {
  const { addiction, selectedAddictions = [], onChange } = props
  const { name, sub_addictions } = addiction

  const [modalVisible, setModalVisible] = useState(false)

  const handleDone = () => {
    setModalVisible(false)
  }

  const selectedSubAddictions = selectedAddictions.filter((ad) => ad.parent_id === addiction.id)
  const selected =
    !!selectedAddictions.find((ad) => ad.id === addiction.id) || !!selectedSubAddictions?.[0]

  const showModal = () => {
    if (sub_addictions && sub_addictions.length > 0) {
      setModalVisible(true)
    } else {
      onChange(addiction)
    }
  }

  return (
    <>
      <Modal onClose={setModalVisible} visible={modalVisible}>
        <Block flexDirection="row" mT="xl" justify="space-between" align="center">
          <Typography variation="paragraphSemiBold">{name} Addiction</Typography>

          <Link onPress={handleDone} color="primary" variation="descriptionSemiBold">
            DONE
          </Link>
        </Block>

        <Block mT="lg">
          <ScrollView>
            {addiction.sub_addictions?.map((addiction) => {
              const checked = !!selectedAddictions.find((ad) => ad.id === addiction.id)

              const handleSelect = () => {
                onChange(addiction)
              }

              return (
                <Block
                  flex1
                  pV="xl"
                  rounded="xl"
                  align="center"
                  flexDirection="row"
                  key={addiction.id}
                  onPress={handleSelect}>
                  <CheckBox checked={!!checked} onChange={() => handleSelect()} />
                  <Typography mL="md" flex1 variation="descriptionRegular">
                    {addiction.name}
                  </Typography>
                </Block>
              )
            })}
          </ScrollView>
        </Block>
      </Modal>

      <Block
        bW={1}
        pR="md"
        mR="md"
        mB="xxxl"
        rounded="xl"
        align="center"
        flexDirection="row"
        onPress={showModal}
        justify="space-between"
        bC={selected ? 'primary' : 'gray300'}>
        <Block pV="md" pL="md">
          <CheckBox
            checked={selected}
            label={name}
            onChange={() => (selectedSubAddictions?.[0] ? onChange(addiction) : showModal())}
          />
        </Block>

        <Block mL="md">
          {sub_addictions && (
            <>
              {selectedSubAddictions?.[0] ? (
                <Block pH="lg" pV="xs" rounded="6xl" bgColor="blue100">
                  <Typography lineHeight={0} color="blue800" variation="descriptionRegular">
                    {selectedSubAddictions.length}
                  </Typography>
                </Block>
              ) : sub_addictions?.[0] ? (
                <ChevronBottom />
              ) : null}
            </>
          )}
        </Block>
      </Block>
    </>
  )
}

export default CheckBoxButton
