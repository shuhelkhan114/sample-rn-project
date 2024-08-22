import { AxiosError } from 'axios'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import Block from '../Block/Block'
import InternalServer from '../Illustrations/InternalServer'
import NoInternet from '../Illustrations/NoInternet'
import NotFound from '../Illustrations/NotFound'
import Typography from '../Typography/Typography'

interface ErrorBlockProps {
  error: unknown
  retrying?: boolean
  onRetry?: () => void
}

const ErrorBlock: React.FC<ErrorBlockProps> = (props) => {
  const { error, retrying, onRetry } = props

  let content: React.ReactNode = null

  if (error instanceof AxiosError) {
    if (error.response?.status === 404) {
      content = <NotFound />
    } else if (error.response?.status === 500) {
      content = <InternalServer />
    } else if (error.code === 'ECONNABORTED') {
      content = <NoInternet />
    } else {
      content = <InternalServer />
    }
  }

  console.log(content)

  function handleRetry() {
    if (!retrying) {
      onRetry?.()
    }
  }

  return (
    <Block flex1 justify="center" align="center">
      {/* {content} */}
      <Typography color="negative">
        {(error as Error)?.message || 'Something went wrong, please try again!'}
      </Typography>
      {!!onRetry && (
        <Block pV="md" pH="4xl" onPress={handleRetry}>
          {retrying ? (
            <ActivityIndicator />
          ) : (
            <Typography color="primary" variation="descriptionRegular">
              Retry
            </Typography>
          )}
        </Block>
      )}
    </Block>
  )
}

export default ErrorBlock
