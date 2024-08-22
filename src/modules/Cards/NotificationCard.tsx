import React from 'react'
import Block from '~/components/Block/Block'
import CommentIcon from '~/components/Icons/CommentIcon'
import DotMenuIcon from '~/components/Icons/DotMenuIcon'
import UpgradeIcon from '~/components/Icons/UpgradeIcon'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'

interface NotificationCardProps {
  upload?: boolean
  requested?: boolean
  description?: string
}

const NotificationCard: React.FC<NotificationCardProps> = (props) => {
  const { upload = false, requested = false, description } = props
  const theme = useAppTheme()

  return (
    <Block flexDirection="row" align="center" justify="space-between" pV="lg">
      <Block flexDirection="row" align="flex-start">
        <Block>
          <Image size={getSize(46)} source={require('~/assets/userProfile1.png')} />
          <Block
            absolute
            bottom={-1}
            right={-7}
            shadow="sm"
            rounded="xxxl"
            bgColor="primary"
            pV="sm"
            pH="sm"
            //   onPress={() => navigation.navigate(Screens.SelectAvatarScreen)}
          >
            {upload ? (
              <UpgradeIcon width={16} height={16} fill={theme.colors.gray100} />
            ) : (
              <CommentIcon width={16} height={16} fill={theme.colors.gray100} />
            )}
          </Block>
        </Block>

        <Block mL="lg">
          <Typography variation="paragraphRegular">rehan2023</Typography>
          <Typography variation="descriptionRegular" color="black">
            {description}
          </Typography>
          {requested && (
            <Block flexDirection="row" align="center" mT="md">
              <Block pH="xl" pV="sm" bgColor="gray400" rounded="lg">
                <Typography variation="descriptionRegular">Deny</Typography>
              </Block>
              <Block mL="md" pH="xl" pV="sm" bgColor="primary" rounded="lg">
                <Typography variation="descriptionRegular" color="white">
                  Accept
                </Typography>
              </Block>
            </Block>
          )}
        </Block>
      </Block>

      <DotMenuIcon />
    </Block>
  )
}

export default NotificationCard
