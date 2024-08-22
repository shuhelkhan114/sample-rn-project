import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import Block from '~/components/Block/Block'
import FilterIcon from '~/components/Icons/FilterIcon'
import Link from '~/components/Link/Link'
import Modal from '~/components/Modal/Modal'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'

interface FilterProps {}

const filterOption = ['Hot', 'Top', 'New']

const Filter: React.FC<FilterProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [value, setValue] = useState('')

  const openModal = () => {
    setModalVisible(true)
  }

  return (
    <Block>
      <Modal onClose={setModalVisible} visible={modalVisible}>
        <Block mB="xxxl" flexDirection="row" justify="space-between" align="center">
          <Typography variation="descriptionSemiBold">Filter</Typography>
          <Link
            onPress={() => setModalVisible(false)}
            color="primary"
            variation="paragraphSemiBold">
            DONE
          </Link>
        </Block>
        <ScrollView>
          {filterOption.map((option, index) => {
            const handleSelect = () => {
              setValue(option)
            }
            const checked = value === option

            return (
              <Block
                pB="xl"
                rounded="xl"
                key={option}
                flexDirection="row"
                align="center"
                flex1
                onPress={handleSelect}>
                <Checkbox value={checked} onValueChange={handleSelect} />
                <Block mL="xl">
                  <Typography flex1 variation="paragraphRegular">
                    {option}
                  </Typography>
                </Block>
              </Block>
            )
          })}
        </ScrollView>

        <Block>
          <Block mB="xl" />
        </Block>
      </Modal>
      <Block onPress={openModal}>
        <FilterIcon />
      </Block>
    </Block>
  )
}

export default Filter
