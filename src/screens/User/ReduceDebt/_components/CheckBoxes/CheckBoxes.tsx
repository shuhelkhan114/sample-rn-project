import Block, { BlockProps } from '~/components/Block/Block'
import CheckBox from '~/components/CheckBox/CheckBox'
import Typography from '~/components/Typography/Typography'

export interface CheckBoxOption {
  label: string
  value: string
}

interface CheckBoxesProps extends BlockProps {
  options: CheckBoxOption[]
  values: CheckBoxOption[]
  onChange: (value: CheckBoxOption[]) => void
}

function CheckBoxes({ values, options, onChange, ...restProps }: CheckBoxesProps) {
  return (
    <Block {...restProps}>
      {options.map((option) => {
        const checked = values.find((value) => value.value === option.value)

        const handleCheck = () => {
          if (checked) {
            onChange?.(values.filter((value) => value.value !== option.value))
          } else {
            onChange?.([...values, option])
          }
        }

        return (
          <Block
            bW={1}
            pV="lg"
            pH="xxl"
            mT="xxxl"
            rounded="xxl"
            key={option.value}
            flexDirection="row"
            onPress={handleCheck}
            bC={checked ? 'primary' : 'gray300'}>
            <CheckBox size={20} checked={!!checked} onChange={handleCheck} />
            <Typography flex1 color="gray500" variation="paragraphRegular">
              {option.label}
            </Typography>
          </Block>
        )
      })}
    </Block>
  )
}

export default CheckBoxes
