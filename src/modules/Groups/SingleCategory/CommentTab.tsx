import React from 'react'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'

interface CommentTabProps {}

const CommentTab: React.FC<CommentTabProps> = (props) => {
  return (
    <Block>
      <Block flexDirection="row" align="center" wrap pV="xl" pH="xxxl" bBW={1} bC="gray100">
        <Block rounded="6xl" bW={1} bC="gray100" pH="xl" pV="md" mR="lg">
          <Typography variation="descriptionRegular">Alcohol</Typography>
        </Block>
        <Block rounded="6xl" bW={1} bC="gray100" pH="xl" pV="md" mR="lg">
          <Typography variation="descriptionRegular">Tobacco</Typography>
        </Block>
      </Block>
      <Block></Block>
    </Block>
  )
}

export default CommentTab
