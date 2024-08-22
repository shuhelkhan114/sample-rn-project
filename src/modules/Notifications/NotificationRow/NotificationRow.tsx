import React from 'react'
import Block from '~/components/Block/Block'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { Notification } from '~/typings/notification'

interface NotificationRowProps {
  notification: Notification
  onPress?: () => void
}

const NotificationRow: React.FC<NotificationRowProps> = (props) => {
  const { notification, onPress } = props

  let description = ''

  switch (notification.type) {
    case 'new-message':
      description = 'Sent you a message'
      break
    case 'mention':
      description = `Mentioned you in a comment: ${notification.comment}`
      break
    default:
      break
  }

  return (
    <Block flexDirection="row" pV="xl" onPress={onPress}>
      <Image size={40} circular uri={notification.imageUrl} />
      <Block mL="xl">
        <Typography variation="descriptionRegular">{notification.username}</Typography>
        <Typography mT="xs" variation="smallLight" color="gray700">
          {description}
        </Typography>
      </Block>
    </Block>
  )
}

export default NotificationRow
