import React from 'react'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import { genderOptions } from '~/core/data/static'
import { GenderValue } from '~/typings/common'

interface SelectGenderProps {
  selectedGender: GenderValue | null
  onSelect?: (gender: GenderValue) => void
}

const SelectGender: React.FC<SelectGenderProps> = (props) => {
  const { selectedGender, onSelect } = props

  return (
    <Block>
      <Block mB="auto">
        <Typography mB="xxxl" color="gray700" center variation="paragraphRegular">
          Gender
        </Typography>
        {genderOptions.map((gender) => (
          <Block
            bW={1}
            pV="xl"
            mB="xxxl"
            align="center"
            rounded="xl"
            key={gender.value}
            onPress={() => onSelect?.(gender.value)}
            bC={selectedGender === gender.value ? 'primary' : 'gray200'}>
            <Typography
              color={selectedGender === gender.value ? 'gray700' : 'gray500'}
              variation="paragraphRegular">
              {gender.label}
            </Typography>
          </Block>
        ))}
      </Block>
    </Block>
  )
}

export default SelectGender
