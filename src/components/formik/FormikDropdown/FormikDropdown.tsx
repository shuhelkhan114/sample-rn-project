import { useField } from 'formik'
import React from 'react'
import { type ViewStyle } from 'react-native'
import Block from '~/components/Block/Block'
import DropDown, { type DropDownProps } from '~/components/DropDown/DropDown'
import ErrorText from '~/components/ErrorText/ErrorText'
import useAppTheme from '~/hooks/useTheme'

interface FormikDropdownProps extends DropDownProps {
  name: string
  containerStyles?: ViewStyle
}

const FormikDropdown: React.FC<FormikDropdownProps> = (props) => {
  const { name, containerStyles, ...restProps } = props

  const [field, meta, helpers] = useField(name as any)
  const theme = useAppTheme()
  const hasError = meta.touched && meta.error

  const handleSelect = (value: string) => {
    helpers.setValue(value)
  }

  const value = field.value || undefined

  return (
    <Block style={containerStyles}>
      <DropDown value={value} onSelect={handleSelect} {...restProps} />
      {hasError && (
        <ErrorText
          style={{
            // TODO: Refactor this
            marginVertical: 0,
            marginTop: theme.spacing.sm,
            marginLeft: theme.spacing.sm,
            fontSize: 12,
          }}
          error={{ message: meta.error }}
        />
      )}
    </Block>
  )
}

export default FormikDropdown
