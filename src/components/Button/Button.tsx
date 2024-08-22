import { useMemo } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
  type PressableProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import { type Size } from '~/core/styles/theme'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'

interface Props extends PressableProps {
  title: string
  style?: ViewStyle
  textStyle?: TextStyle
  variation?: 'primary' | 'secondary' | 'tertiary'
  roundness?: 'circular' | 'rounded'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  align?: ViewStyle['alignItems']
  justify?: ViewStyle['justifyContent']
  loading?: boolean
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
  mH?: Size
  mV?: Size
  mT?: Size
  mR?: Size
  mB?: Size
  mL?: Size
  pH?: Size
  pV?: Size
  pT?: Size
  pR?: Size
  pB?: Size
  pL?: Size
}

const Button: React.FC<Props> = (props) => {
  const {
    title,
    variation = 'primary',
    style,
    onPress,
    icon,
    iconPosition = 'left',
    roundness = 'rounded',
    loading,
    disabled,
    textStyle,
    align,
    justify,
    mH,
    mV,
    mT,
    mR,
    mB,
    mL,
    pH,
    pV,
    pT,
    pR,
    pB,
    pL,
    ...restProps
  } = props
  const theme = useAppTheme()

  const backgroundColor = useMemo(() => {
    switch (variation) {
      case 'primary':
        return theme.colors.primary
      case 'secondary':
        return theme.colors.primary + '1A'
      case 'tertiary':
        return theme.colors.white
    }
  }, [variation])

  const textColor = useMemo(() => {
    switch (variation) {
      case 'primary':
        return theme.colors.gray100
      case 'secondary':
        return theme.colors.primary
      case 'tertiary':
        return theme.colors.primary
    }
  }, [variation])

  const border = useMemo(() => {
    switch (variation) {
      case 'tertiary':
        return { borderWidth: 1, borderColor: theme.colors.primary }
    }
  }, [variation])

  const borderRadius = useMemo(() => {
    switch (roundness) {
      case 'circular':
        return 200
      case 'rounded':
        return 10
    }
  }, [])

  const styles = useMemo(
    () =>
      StyleSheet.create({
        // @ts-ignore
        container: {
          width: '100%',
          borderRadius,
          backgroundColor,
          flexDirection: 'row',
          alignItems: align ?? 'center',
          justifyContent: justify ?? 'center',
          paddingVertical: getSize(12) as any,
          ...(mH && { marginHorizontal: theme.spacing[mH] }),
          ...(mV && { marginVertical: theme.spacing[mV] }),
          ...(mT && { marginTop: theme.spacing[mT] }),
          ...(mR && { marginRight: theme.spacing[mR] }),
          ...(mB && { marginBottom: theme.spacing[mB] }),
          ...(mL && { marginLeft: theme.spacing[mL] }),
          ...(pH && { paddingHorizontal: theme.spacing[pH] }),
          ...(pV && { paddingVertical: theme.spacing[pV] }),
          ...(pT && { paddingTop: theme.spacing[pT] }),
          ...(pR && { paddingRight: theme.spacing[pR] }),
          ...(pB && { paddingBottom: theme.spacing[pB] }),
          ...(pL && { paddingLeft: theme.spacing[pL] }),
          ...border,
          ...style,
        },
        text: {
          ...theme.typography.paragraphSemiBold,
          color: textColor,
          ...textStyle,
        },
      }),
    [
      borderRadius,
      backgroundColor,
      style,
      disabled,
      textStyle,
      mH,
      mV,
      mT,
      mR,
      mB,
      mL,
      pH,
      pV,
      pT,
      pR,
      pB,
      pL,
    ]
  )

  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled && !loading) onPress?.(event)
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, { opacity: disabled ? 0.5 : pressed ? 0.8 : 1 }]}
      {...restProps}>
      {loading ? (
        <ActivityIndicator
          style={{ paddingVertical: getSize(1.4) }}
          color={variation === 'primary' ? theme.colors.white : theme.colors.primary}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && <Block mR="md">{icon}</Block>}
          <Typography style={styles.text}>{title}</Typography>
          {icon && iconPosition === 'right' && <Block mL="md">{icon}</Block>}
        </>
      )}
    </Pressable>
  )
}

export default Button
