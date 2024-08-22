import { ActivityIndicator } from 'react-native'
import { getSize } from '~/core/utils/responsive'
import Block from '../Block/Block'
import NoData from '../Illustrations/NoData'
import Typography from '../Typography/Typography'

interface EmptyBlockProps {
  message?: string
  refetching?: boolean
  onRefetch?: () => void
}

function EmptyBlock({ message = 'No data', refetching, onRefetch }: EmptyBlockProps) {
  function handleRefetch() {
    if (!refetching) {
      onRefetch?.()
    }
  }

  return (
    <Block flex1 justify="center" align="center">
      <NoData height={getSize(200)} width={getSize(200)} />
      <Typography mT="md">{message}</Typography>
      {!!onRefetch && (
        <Block pV="md" pH="4xl" onPress={handleRefetch}>
          {refetching ? (
            <ActivityIndicator />
          ) : (
            <Typography color="primary" variation="descriptionRegular">
              Refetch
            </Typography>
          )}
        </Block>
      )}
    </Block>
  )
}

export default EmptyBlock
