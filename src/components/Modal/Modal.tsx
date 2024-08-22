import { useMemo, type PropsWithChildren } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, ViewStyle } from 'react-native'
import NativeModal from 'react-native-modal'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'
import Block from '../Block/Block'
import CloseIcon from '../Icons/CloseIcon'

interface ModalProps extends PropsWithChildren {
  visible: boolean
  disabledSwipe?: boolean
  minHeight?: string
  onClose: (visible: false) => void
  position?: 'bottom' | 'center'
  closeIcon?: boolean
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    visible,
    minHeight,
    onClose,
    disabledSwipe,
    position = 'bottom',
    closeIcon = false,
  } = props

  const theme = useAppTheme()

  const justifyContent: ViewStyle['justifyContent'] = useMemo(() => {
    switch (position) {
      case 'bottom':
        return 'flex-end'
      case 'center':
        return 'center'
    }
  }, [position])

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modal: {
          flex: 1,
          margin: 0,
          justifyContent,
          ...(position === 'center' && { marginHorizontal: theme.spacing.xxxl }),
        },
        // @ts-ignore
        container: {
          maxHeight: '90%',
          backgroundColor: 'white',
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          padding: theme.spacing.xxxl,
          paddingTop: theme.spacing.xl,
          ...(minHeight && { height: minHeight }),
          ...(position === 'center' && { borderRadius: 12 }),
        },
      }),
    [minHeight, position]
  )

  const handleClose = () => {
    onClose?.(false)
  }

  return (
    <NativeModal
      propagateSwipe
      isVisible={visible}
      style={styles.modal}
      onSwipeComplete={handleClose}
      onBackdropPress={handleClose}
      swipeDirection={disabledSwipe ? undefined : ['down']}>
      {position !== 'center' && <Block onPress={handleClose} style={{ height: '20%' }} />}
      <KeyboardAvoidingView
        style={[styles.container]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {position === 'bottom' && (
          <Block align="center">
            <Block width={32} height={4} bgColor="gray200" rounded="5xl" />
          </Block>
        )}
        <Block relative>
          {position === 'center' && closeIcon && (
            <Block onPress={handleClose} absolute top={-5} right={-16}>
              <CloseIcon />
            </Block>
          )}
          {children}
        </Block>
        <Block height={getSize(48)} />
      </KeyboardAvoidingView>
    </NativeModal>
  )
}

export default Modal
