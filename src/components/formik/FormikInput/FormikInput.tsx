import { useField } from 'formik'
import React, { useMemo, useState } from 'react'
import { StyleSheet, TextInput, type TextInputProps, type ViewStyle } from 'react-native'
import { Eye } from 'react-native-feather'
import Block from '~/components/Block/Block'
import ErrorText from '~/components/ErrorText/ErrorText'
import EyeOffIcon from '~/components/Icons/EyeOffIcon'
import Typography from '~/components/Typography/Typography'
import { type Size, type colors } from '~/core/styles/theme'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'

interface FormikInputProps extends TextInputProps {
  name: string
  label?: string
  style?: ViewStyle
  inputStyle?: ViewStyle
  placeholder?: string
  secureTextEntry?: boolean
  mH?: Size
  mV?: Size
  mT?: Size
  mR?: Size
  mB?: Size
  mL?: Size
  flex1?: boolean
  disabled?: boolean
  bgColor?: keyof typeof colors
  type?: 'text' | 'password'
  height?: Size
  formatter?: (value: string) => string
}

const FormikInput: React.FC<FormikInputProps> = (props) => {
  const {
    name,
    label,
    style,
    inputStyle,
    type,
    placeholder = '',
    secureTextEntry = false,
    flex1,
    mH,
    mV,
    mT,
    mR,
    mB,
    mL,
    disabled,
    height,
    bgColor = 'lightest',
    formatter,
    ...restProps
  } = props
  const [focused, setFocused] = useState(false)
  const [viewText, setViewText] = useState(false)
  const [, meta, helpers] = useField(name as any)
  const theme = useAppTheme()
  const hasError = meta.error && meta.touched

  const handleChange = (val: string) => {
    let value = val
    if (formatter && typeof formatter === 'function') {
      value = formatter(value)
    }
    if (!disabled) {
      helpers.setValue(value)
    }
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
          paddingVertical: theme.spacing.lg,
          paddingHorizontal: theme.spacing.lg,
          borderRadius: theme.rounded.lg,
          fontSize: getSize(14),
          // backgroundColor: 'red',
          width: type === 'password' ? '90%' : '100%',
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
      <Block
        rounded="lg"
        flexDirection="row"
        align="center"
        justify="space-between"
        bW={1}
        bC={focused ? 'secondary' : 'gray300'}>
        <TextInput
          editable={!disabled}
          style={styles.input}
          focusable={focused}
          value={meta.value}
          onBlur={() => {
            setFocused(false)
          }}
          onFocus={() => {
            setFocused(true)
          }}
          placeholderTextColor={focused ? theme.colors.black : theme.colors.gray300}
          onChangeText={handleChange}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !viewText}
          {...restProps}
        />
        {type === 'password' && (
          <Block mR="lg" onPress={() => setViewText(!viewText)}>
            {viewText ? (
              <EyeOffIcon fill={theme.colors.gray600} />
            ) : (
              <Eye width={20} height={20} color={theme.colors.gray600} />
            )}
          </Block>
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

export default FormikInput
