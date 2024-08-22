import React from 'react'
import Block from '~/components/Block/Block'

interface RadioButtonProps {
  selected?: boolean
  width?: number
  height?: number
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
  const { selected, height = 24, width = 24 } = props

  return (
    <Block
      width={width}
      rounded="6xl"
      align="center"
      height={height}
      justify="center"
      bW={selected ? 5 : 1}
      bC={selected ? 'primary' : 'gray300'}>
      {selected && <Block width={12} height={12} rounded="6xl" />}
    </Block>
  )
}

export default RadioButton
