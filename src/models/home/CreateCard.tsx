import React from 'react'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'

interface CreateCardProps {
  title: string
  description: string
  buttonTitle: string
  onButtonClick: () => void
}

const CreateCard: React.FC<CreateCardProps> = (props) => {
  const { title, description, buttonTitle, onButtonClick } = props

  return (
    <Block bgColor="gray100" pV="lg" pH="xxxl" rounded="md">
      <Typography variation="paragraphSemiBold">{title}</Typography>
      <Typography mV="lg" variation="descriptionLight">
        {description}
      </Typography>
      <Block flexDirection="row">
        <Block bgColor="primary" rounded="xl" pH="xl" pV="md" onPress={onButtonClick}>
          <Typography center color="white" variation="paragraphSemiBold">
            {buttonTitle}
          </Typography>
        </Block>
      </Block>
    </Block>
  )
}

export default CreateCard
