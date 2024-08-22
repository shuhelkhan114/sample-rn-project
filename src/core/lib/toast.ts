import Toast, { ToastPosition } from 'react-native-toast-message'

interface ToastParams {
  type: 'success' | 'error' | 'show'
  text1: string
  text2: string
  position?: ToastPosition
  duration?: number
  props: {
    actionText?: string
    actionOnPress?: () => void
  }
}

const showToast = (params: ToastParams) => {
  Toast.show({
    type: params.type,
    text1: params.text1,
    text2: params.text2,
    position: params.position,
    visibilityTime: params.duration || 3000,
    ...(params.props.actionText && {
      props: {
        actionText: params.props.actionText,
        actionOnPress: params.props.actionOnPress,
      },
    }),
  })
}

const toast = {
  success: (
    text: string,
    description: string,
    actionText?: string,
    actionOnPress?: () => void,
    position?: ToastPosition,
    duration?: number
  ) => {
    showToast({
      duration,
      text1: text,
      text2: description,
      type: 'success',
      position: position || 'top',
      props: { actionText, actionOnPress },
    })
  },
  error: (
    text: string,
    description: string,
    actionText?: string,
    actionOnPress?: () => void,
    position?: ToastPosition,
    duration?: number
  ) => {
    showToast({
      duration,
      text1: text,
      text2: description,
      type: 'error',
      position,
      props: {
        actionText,
        actionOnPress,
      },
    })
  },
  show: (
    text: string,
    description: string,
    actionText?: string,
    actionOnPress?: () => void,
    position?: ToastPosition,
    duration?: number
  ) => {
    showToast({
      duration,
      text1: text,
      text2: description,
      type: 'show',
      position,
      props: {
        actionText,
        actionOnPress,
      },
    })
  },
}

export default toast
