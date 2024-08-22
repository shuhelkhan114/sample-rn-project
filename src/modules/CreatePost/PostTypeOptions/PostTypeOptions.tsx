import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import Block from '~/components/Block/Block'
import TickIcon from '~/components/Icons/TickIcon'
import Typography from '~/components/Typography/Typography'
import { postTypeOptions } from '~/core/config/categories'
import { PostType } from '~/typings/post'

interface PostTypeOptionsProps {
  selectedPostType: PostType
  onSelect?: (type: PostType) => void
  closeModal?: (visible: false) => void
}

const PostTypeOptions: React.FC<PostTypeOptionsProps> = (props) => {
  const { selectedPostType, onSelect, closeModal } = props

  const renderItem: ListRenderItem<any> = ({ item }) => {
    const handlePress = () => {
      onSelect?.(item)
      closeModal?.(false)
    }

    return (
      <Block pV="xl" flexDirection="row" align="center" onPress={handlePress}>
        <Block mR="lg" width={16} height={16} rounded="5xl" bgColor={item.color} />
        <Typography variation="descriptionRegular" mR="auto">
          {item.name}
        </Typography>
        {selectedPostType?.id === item.id && <TickIcon />}
      </Block>
    )
  }

  return (
    <Block>
      <Typography mB="lg" variation="descriptionRegular">
        Select Story Type
      </Typography>

      <FlatList
        data={postTypeOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
        ItemSeparatorComponent={() => <Block bBW={1} bC="gray200" />}
      />
    </Block>
  )
}

export default PostTypeOptions
