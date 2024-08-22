import Block from '../Block/Block'
import RadioButton from '../RadioButton/RadioButton'
import Typography from '../Typography/Typography'

export interface RadioOption {
  label: string
  value: string
}

interface RadioGroupProps {
  /** selected value in `string` */
  selected?: string | null
  /** possible options */
  options: RadioOption[]
  /** on change callback */
  onChange: (option: RadioOption) => void
  /** custom option renderer */
  renderField?: (option: RadioOption, onChange: () => void) => React.ReactNode
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const { selected, options, onChange, renderField } = props

  return (
    <Block flexDirection="row" align="center">
      {options.map((option) => {
        const isSelected = option.value === selected

        const handleChange = () => {
          onChange?.(option)
        }

        if (renderField && typeof renderField === 'function') {
          return renderField(option, handleChange)
        }

        return (
          <Block
            pH="xl"
            pV="lg"
            mR="xl"
            bW={1}
            rounded="lg"
            align="center"
            flexDirection="row"
            key={option.value}
            onPress={handleChange}
            bC={isSelected ? 'primary' : 'gray300'}>
            <RadioButton selected={isSelected} width={16} height={16} />
            <Typography pR="lg" variation="paragraphRegular" color="gray700" mL="lg">
              {option.label}
            </Typography>
          </Block>
        )
      })}
    </Block>
  )
}

export default RadioGroup
