import React, { useContext } from 'react'
import { ListRenderItem } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Block from '~/components/Block/Block'
import Image from '~/components/Image/Image'
import ScrollView from '~/components/ScrollView/ScrollView'
import Typography from '~/components/Typography/Typography'
import { ConfigContext } from '~/context/ConfigContext'
import { Config } from '~/typings/config'

interface SelectAvatarProps {
  onSelect: (url: string) => void
}

const SelectAvatar: React.FC<SelectAvatarProps> = (props) => {
  const { onSelect } = props
  const { config } = useContext(ConfigContext)

  const renderItem: ListRenderItem<Config['user_profile_avatars'][0]> = ({ item }) => {
    const handlePress = () => {
      onSelect(item)
    }

    return (
      <Block pV="lg" flex1 justify="space-between" align="center" onPress={handlePress}>
        <Image circular uri={item} size={56} />
      </Block>
    )
  }

  return (
    <Block>
      <Typography pV="xxxl" variation="title4SemiBold">
        Select an Avatar
      </Typography>
      <ScrollView>
        <Block pB="9xl">
          <FlatList
            numColumns={4}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            data={config?.user_profile_avatars}
          />
        </Block>
      </ScrollView>
    </Block>
  )
}

export default SelectAvatar
