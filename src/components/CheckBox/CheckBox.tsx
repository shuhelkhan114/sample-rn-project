import Checkbox from 'expo-checkbox'
import { StyleSheet, type ViewStyle } from 'react-native'
import Block, { BlockProps } from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import useAppTheme from '~/hooks/useTheme'

interface CheckBoxProps extends BlockProps {
  checked?: boolean
  label?: string
  size?: number
  onChange?: (checked: boolean) => void
  style?: ViewStyle
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const { checked, label, size = 16, style, onChange, ...restProps } = props
  const theme = useAppTheme()
  const styles = StyleSheet.create({
    checkbox: {
      height: size,
      width: size,
    },
  })

  return (
    <Block
      flexDirection="row"
      align="center"
      style={style}
      onPress={() => onChange?.(!checked)}
      {...restProps}>
      <Checkbox
        value={checked}
        style={styles.checkbox}
        onValueChange={() => onChange?.(!checked)}
        color={checked ? theme.colors.primary : theme.colors.gray400}
      />
      <Typography mL="md" color="gray700" variation="paragraphRegular">
        {label}
      </Typography>
    </Block>
  )
}

export default CheckBox
