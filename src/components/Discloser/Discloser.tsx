import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-native-feather'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'
import useAppTheme from '~/hooks/useTheme'

export interface DiscloserItemProps {
  title: string
  description: string
}

interface DiscloserProps {
  options: DiscloserItemProps[]
}

const Discloser: React.FC<DiscloserProps> = (props) => {
  const { options } = props
  const [selectedItem, setSelectedItem] = useState<number | string>()
  const theme = useAppTheme()

  const toggleContentVisibility = (index: number) => {
    if (selectedItem === index) {
      setSelectedItem('')
    } else {
      setSelectedItem(index)
    }
  }

  return (
    <Block>
      {options.map((item, index) => (
        <Block
          key={item.title}
          bBW={1}
          pV="lg"
          bC="gray200"
          onPress={() => toggleContentVisibility(index)}>
          <Block flexDirection="row" align="center" justify="space-between">
            <Typography color="gray700" variation="paragraphRegular">
              {item.title}
            </Typography>
            {selectedItem === index ? (
              <ChevronUp width={20} height={20} color={theme.colors.gray400} />
            ) : (
              <ChevronDown width={20} height={20} color={theme.colors.gray400} />
            )}
          </Block>
          {selectedItem === index && (
            <Typography mT="lg" variation="descriptionLight" color="gray700">
              {item.description}
            </Typography>
          )}
        </Block>
      ))}
    </Block>
  )
}

export default Discloser
