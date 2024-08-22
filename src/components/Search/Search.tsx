import { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { getSize } from '~/core/utils/responsive'
import useAppTheme from '~/hooks/useTheme'
import Block, { BlockProps } from '../Block/Block'
import SearchIcon from '../Icons/SearchIcon'

interface SearchProps extends BlockProps {
  value?: string
  placeholder?: string
  onSearch: (text: string) => void
  onClear: (text: '') => void
}

const Search: React.FC<SearchProps> = (props) => {
  const { onSearch, onClear, placeholder = '', ...restProps } = props
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const theme = useAppTheme()

  useEffect(() => {
    setValue(props.value || '')
  }, [props.value])

  const styles = useMemo(
    () =>
      StyleSheet.create({
        searchInput: {
          flex: 1,
          height: '100%',
          fontSize: getSize(12),
          paddingVertical: theme.spacing.xl,
          ...theme.fonts.regular,
        },
      }),
    [focused]
  )

  const handleSearch = useCallback(
    (text: string) => {
      setValue(text)
      onSearch?.(text)
    },
    [setValue, onSearch]
  )

  const handleClear = useCallback(() => {
    setValue('')
    onClear?.('')
  }, [])

  return (
    <Block
      bW={1}
      pH="xxxl"
      rounded="5xl"
      align="center"
      flexDirection="row"
      bgColor="white"
      justify="space-between"
      bC={focused ? 'primary' : 'gray200'}
      {...restProps}>
      <TextInput
        value={value}
        style={styles.searchInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={handleSearch}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray800}
      />
      <Block onPress={handleClear}>
        <SearchIcon />
      </Block>
    </Block>
  )
}

export default Search
