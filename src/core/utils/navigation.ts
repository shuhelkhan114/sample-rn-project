import { createRef } from 'react'

export const navigationRef = createRef<any>()

// TODO: Hacky way for now, please refer to: https://github.com/react-navigation/react-navigation/issues/6879
export const waitForNavigationToBeReady = async () => {
  const checkIfReady = (resolve: (value: unknown) => void) => {
    if (navigationRef?.current?.isReady()) {
      resolve(true)
    }

    setTimeout(() => {
      checkIfReady(resolve)
    }, 25)
  }

  return new Promise((resolve) => {
    checkIfReady(resolve)
  })
}
