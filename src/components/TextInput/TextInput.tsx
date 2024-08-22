import { useMemo } from 'react'
import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { ChevronDown } from 'react-native-feather'
import useAppTheme from '~/hooks/useTheme'
import Block from '../Block/Block'
import DropDown, { DropDownOption } from '../DropDown/DropDown'

interface TextInputProps extends NativeTextInputProps {
  suffix?: string
  suffixOptions?: DropDownOption[]
  minValue?: number
  maxValue?: number
  isCurrencyInput?: boolean
  formatter?: (value: string) => string
  onSuffixChange?: (value: string) => void
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

function TextInput({
  isCurrencyInput,
  suffix,
  style,
  minValue,
  maxValue,
  formatter,
  value,
  suffixOptions,
  onChangeText,
  onSuffixChange,
  ...restProps
}: TextInputProps) {
  const theme = useAppTheme()

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          borderWidth: 1,
          borderRadius: 6,
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: theme.colors.gray300,
          paddingHorizontal: theme.spacing.lg,
          ...(suffix && { paddingRight: theme.spacing.lg }),
        },
        input: {
          flex: 1,
          paddingVertical: theme.spacing.lg,
        },
        text: {
          color: theme.colors.gray500,
        },
      }),
    [theme]
  )

  const handleOnChangeText = (text: string) => {
    if (text === '') {
      onChangeText?.(text)
    } else if (minValue && Number(text) < minValue) {
      onChangeText?.(minValue?.toString())
    } else if (maxValue && Number(text) > maxValue) {
      onChangeText?.(maxValue.toString())
    } else if (isCurrencyInput) {
      onChangeText?.(text.replaceAll(',', '').replaceAll('$', ''))
    } else {
      let value = text
      if (formatter && typeof formatter === 'function') {
        value = formatter(value)
      }
      onChangeText?.(value)
    }
  }

  const displayValue = useMemo(() => {
    if (isCurrencyInput) {
      if (value) {
        if (value === '$') {
          return ''
        } else {
          value = usdFormatter.format(Number(value?.replace(',', '').replace('$', '')))
        }
      }
    }
    return value
  }, [isCurrencyInput, value])

  let suffixContent = null

  if (suffix) {
    if (suffixOptions && suffixOptions.length > 0) {
      suffixContent = (
        <DropDown
          value={suffix}
          onSelect={onSuffixChange}
          renderField={({ openModal }) => {
            return (
              <Block onPress={openModal} flexDirection="row" align="center">
                <Text style={styles.text}>{suffix}</Text>
                <ChevronDown color={theme.colors.gray500} />
              </Block>
            )
          }}
          options={suffixOptions}
        />
      )
    } else {
      suffixContent = <Text style={styles.text}>{suffix}</Text>
    }
  }

  return (
    <View style={[styles.container, style]}>
      <NativeTextInput
        style={styles.input}
        value={displayValue}
        placeholderTextColor={theme.colors.gray400}
        {...restProps}
        onChangeText={handleOnChangeText}
      />
      {suffixContent}
    </View>
  )
}

export default TextInput
