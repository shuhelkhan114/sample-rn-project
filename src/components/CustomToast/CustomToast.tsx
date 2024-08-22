import React, { ReactNode, createContext, useContext, useRef } from 'react'
import Toast, { ToastRef } from 'react-native-toast-message'
import Block from '../Block/Block'
import Typography from '../Typography/Typography'

interface ToastProviderProps {
  children: ReactNode
}

interface ToastContextType {
  showToast: () => void
}

export interface CustomToastProps {
  text1: string
  text2?: string
  type?: 'error' | 'ideal' | 'success'
}

const CustomToast = (props: any) => {
  const { type, text1, text2 } = props

  return (
    <Block width="auto" bgColor="black" flexDirection="row" justify="space-between" align="center">
      <Block>
        {type === 'error' && <Block></Block>}
        {type === 'error' && <Block></Block>}
        {type === 'error' && <Block></Block>}
        <Block>
          <Typography>{text1}</Typography>
          {text2 && <Typography>{text2}</Typography>}
        </Block>
      </Block>
      <Typography color="primary">Okay</Typography>
    </Block>
  )
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const toastRef = useRef<ToastRef>(null) // Use 'any' if you don't have a specific type for Toast ref

  const showToast = () => {
    toastRef?.current?.show({
      // @ts-ignore
      render: ({ text1, text2, type }: CustomToastProps) => (
        <CustomToast text1={text1} text2={text2} type={type} />
      ),
    })
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* @ts-ignore */}
      <Toast ref={toastRef as any} config={{ success: (props) => <CustomToast {...props} /> }} />
    </ToastContext.Provider>
  )
}

export default ToastProvider
