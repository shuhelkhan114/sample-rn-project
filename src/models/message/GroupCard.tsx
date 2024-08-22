import React from 'react'
import Block from '~/components/Block/Block'
import Image from '~/components/Image/Image'
import Typography from '~/components/Typography/Typography'
import { getSize } from '~/core/utils/responsive'

interface GroupCardProps {
  group: {
    name: string
    image: any[]
    people: number
    notification?: number
  }
}

const GroupCard: React.FC<GroupCardProps> = (props) => {
  const { group } = props

  return (
    <Block
      pV="xl"
      bW={1}
      pH="xl"
      rounded="lg"
      bC="gray300"
      mV="lg"
      flexDirection="row"
      align="center"
      justify="space-between"
      onPress={() => {}}>
      <Block flex1 flexDirection="row" align="center">
        <Block>
          <Typography variation="descriptionSemiBold">{group.name}</Typography>
          <Typography color="gray600" variation="smallRegular">
            {group.people} people online
          </Typography>
        </Block>

        <Block mL="xl" flexDirection="row" align="center">
          {group.image.map((image, index) => (
            <Block key={image} absolute left={16 * index} bC="gray200" bW={2} rounded="6xl">
              <Image key={image} size={getSize(40)} source={image} />
            </Block>
          ))}
        </Block>
      </Block>
      {group.notification && (
        <Block bgColor="pink100" pH="lg" pV="xs" rounded="lg" align="center" justify="center">
          <Typography color="pink800" variation="descriptionRegular">
            {group.notification}
          </Typography>
        </Block>
      )}
    </Block>
  )
}

export default GroupCard
