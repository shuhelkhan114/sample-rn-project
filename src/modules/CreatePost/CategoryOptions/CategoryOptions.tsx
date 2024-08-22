import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import Block from '~/components/Block/Block'
import TickIcon from '~/components/Icons/TickIcon'
import Typography from '~/components/Typography/Typography'
import { categoryOptions } from '~/core/config/categories'
import { PostCategory } from '~/typings/post'

interface CategoryOptionsProps {
  selectedCategory: PostCategory
  onSelect?: (type: PostCategory) => void
  closeModal?: (visible: false) => void
}

const CategoryOptions: React.FC<CategoryOptionsProps> = (props) => {
  const { selectedCategory, onSelect, closeModal } = props

  const renderItem: ListRenderItem<PostCategory> = ({ item }) => {
    const handlePress = () => {
      onSelect?.(item)
      closeModal?.(false)
    }

    return (
      <Block
        pV="xl"
        flexDirection="row"
        align="center"
        justify="space-between"
        onPress={handlePress}>
        <Typography variation="descriptionRegular">{item.name}</Typography>
        {selectedCategory?.id === item.id && <TickIcon />}
      </Block>
    )
  }

  return (
    <Block>
      <Typography mB="lg" variation="descriptionRegular">
        Select Story Category
      </Typography>

      <FlatList
        data={categoryOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Block bBW={1} bC="gray200" />}
      />
    </Block>
  )
}

export default CategoryOptions
