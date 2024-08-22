import React from 'react'
import Block from '~/components/Block/Block'
import ChevronRight from '~/components/Icons/ChevronRight'
import Typography from '~/components/Typography/Typography'

interface SettingsCardProps {
  icon?: React.ReactNode
  title: string
  description: string
}

const SettingsCard: React.FC<SettingsCardProps> = (props) => {
  const { icon, title, description } = props

  return (
    <Block flexDirection="row" align="center" justify="space-between" pV="lg">
      <Block flexDirection="row" align="flex-start">
        <Block>{icon}</Block>

        <Block mL="lg">
          <Typography variation="paragraphRegular">{title}</Typography>
          <Typography variation="descriptionRegular" color="black">
            {description}
          </Typography>
        </Block>
      </Block>

      <ChevronRight />
    </Block>
  )
}

export default SettingsCard
