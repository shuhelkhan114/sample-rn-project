import { useField } from 'formik'
import React, { useMemo, useState } from 'react'
import { StyleSheet, TextInput, type TextInputProps, type ViewStyle } from 'react-native'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import Typography from '~/components/Typography/Typography'
import { type Size, type colors } from '~/core/styles/theme'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'

interface FormikTextAreaProps extends TextInputProps {
  name: string
  label?: string
  style?: ViewStyle
  inputStyle?: ViewStyle
  placeholder?: string
  mH?: Size
  mV?: Size
  mT?: Size
  mR?: Size
  mB?: Size
  mL?: Size
  flex1?: boolean
  disabled?: boolean
  bgColor?: keyof typeof colors
  type?: 'text'
  height?: Size
  numberOfLines: number
  inputHeight: number
  minimumText?: number
}

const FormikTextArea: React.FC<FormikTextAreaProps> = (props) => {
  const {
    name,
    label,
    style,
    inputStyle,
    type,
    placeholder = '',
    flex1,
    mH,
    mV,
    mT,
    mR,
    mB,
    mL,
    disabled,
    height,
    numberOfLines,
    minimumText,
    inputHeight = 200,
    bgColor = 'lightest',
    ...restProps
  } = props
  const [focused, setFocused] = useState(false)
  const [, meta, helpers] = useField(name as any)
  const theme = useAppTheme()
  const hasError = meta.error && meta.touched

  const handleChange = (val: string) => {
    helpers.setValue(val)
  }

  const styles = useMemo(
    () =>
      StyleSheet.create({
        // @ts-expect-error
        wrapper: {
          opacity: disabled ? 0.5 : 1,
          ...(flex1 && { flex: 1 }),
          ...(mH && { marginHorizontal: theme.spacing[mH] }),
          ...(mV && { marginVertical: theme.spacing[mV] }),
          ...(mT && { marginTop: theme.spacing[mT] }),
          ...(mR && { marginRight: theme.spacing[mR] }),
          ...(mB && { marginBottom: theme.spacing[mB] }),
          ...(mL && { marginLeft: theme.spacing[mL] }),
          ...style,
        },
        input: {
          flexGrow: 1,
          borderRadius: theme.rounded.lg,
          fontSize: getSize(14),
          height: inputHeight,
          // @ts-ignore
          ...(bgColor && { backgroundColor: theme.colors[bgColor] }),
          ...inputStyle,
        },
      }),
    [style, focused, flex1, mH, mV, mT, mR, mB, mL]
  )

  return (
    <Block style={styles.wrapper}>
      {label && (
        <Typography mB="sm" variation="descriptionRegular">
          {label}
        </Typography>
      )}

      <Block pV="sm" pH="md" bW={1} rounded="lg" bC={focused ? 'secondary' : 'gray300'}>
        <TextInput
          multiline={true}
          numberOfLines={numberOfLines}
          style={styles.input}
          focusable={focused}
          value={meta.value}
          onBlur={() => {
            setFocused(false)
          }}
          onFocus={() => {
            setFocused(true)
          }}
          placeholderTextColor={theme.colors.gray500}
          onChangeText={handleChange}
          placeholder={placeholder}
          autoCapitalize="none"
          {...restProps}
        />
        {minimumText && (
          <Typography mB="sm" mT="sm" color="gray400" style={{ textAlign: 'right' }}>
            {meta.value.length}/{minimumText}
          </Typography>
        )}
      </Block>

      {hasError && (
        // TODO: refactor style props
        <ErrorText
          style={{
            marginVertical: 0,
            marginTop: theme.spacing.sm,
            fontSize: getSize(12),
          }}
          error={{ message: meta.error }}
        />
      )}
    </Block>
  )
}

export default FormikTextArea
