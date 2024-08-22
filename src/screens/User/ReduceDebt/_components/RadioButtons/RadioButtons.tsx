import { useState } from 'react'
import Block, { BlockProps } from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'

export interface RadioButtonOption {
  label: string
  value: string
}

interface RadioButtonProps extends BlockProps {
  value?: string
  options: RadioButtonOption[]
  onChange: (value: string) => void
}

function RadioButtons({ value, options, onChange, ...restProps }: RadioButtonProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <Block {...restProps}>
      {options.map((option) => {
        const handleChange = () => {
          setSelected(option.value)
          setTimeout(() => {
            onChange?.(option.value)
          }, 200)
        }

        return (
          <Block
            bW={selected === option.value ? 3 : 1}
            pV="lg"
            pH="xxl"
            mT="xxxl"
            rounded="xxl"
            key={option.value}
            onPress={handleChange}
            bC={value === option.value || selected === option.value ? 'primary' : 'gray300'}>
            <Typography color="gray500" variation="paragraphRegular" center>
              {option.label}
            </Typography>
          </Block>
        )
      })}
    </Block>
  )
}

export default RadioButtons
