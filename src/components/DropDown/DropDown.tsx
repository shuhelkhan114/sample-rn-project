import ChevronBottom from '~/components/Icons/ChevronBottom'
// import ChevronRight from '~/components/Icons/ChevronRight'
import Modal from '~/components/Modal/Modal'
import ScrollView from '~/components/ScrollView/ScrollView'
// import Search from '~/components/Search/Search'
import Checkbox from 'expo-checkbox'
import { useEffect, useState } from 'react'
import Typography from '~/components/Typography/Typography'
import useAppTheme from '~/hooks/useTheme'
import Block, { type BlockProps } from '../Block/Block'
import Search from '../Search/Search'

export interface DropDownOption {
  label: string
  value: string
  description?: string
}

export interface DropDownProps extends BlockProps {
  value?: string
  multiple?: boolean
  placeholder?: string
  options: DropDownOption[]
  type?: 'default' | 'modal'
  modalTitle?: string
  modalTitleDescription?: string
  searchable?: boolean
  minDropdownHeight?: string
  label?: string
  // floatingLabel?: boolean
  renderTitle?: (props: { closeModal: () => void }) => React.ReactNode
  renderField?: (props: { openModal: () => void }) => React.ReactNode
  onSelect?: (value: string) => void
  separator?: string
}

const DropDown: React.FC<DropDownProps> = (props) => {
  const {
    value,
    minDropdownHeight,
    placeholder = 'Search',
    separator = ',',
    // floatingLabel = true,
    label,
    modalTitle = 'Select an option',
    modalTitleDescription = '',
    options = [],
    style,
    multiple,
    searchable,
    renderTitle,
    renderField,
    onSelect,
    ...restProps
  } = props
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<DropDownOption[]>(() => options)

  useEffect(() => {
    if (search === '') {
      setFilteredOptions(options)
    } else {
      setFilteredOptions(
        options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
      )
    }
  }, [search])

  useEffect(() => {
    if (options) {
      setFilteredOptions(options)
    }
  }, [options])

  const theme = useAppTheme()

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const optionsMap: Record<string, string> = options.reduce((acc, option) => {
    // @ts-expect-error
    acc[option.value] = option.label
    return acc
  }, {})

  return (
    <Block>
      <Modal onClose={setModalVisible} visible={modalVisible} minHeight={minDropdownHeight}>
        {renderTitle ? (
          renderTitle({ closeModal })
        ) : (
          <Block>
            <Typography variation="paragraphSemiBold">{modalTitle}</Typography>
            {modalTitleDescription && <Typography mT="md">{modalTitleDescription}</Typography>}
          </Block>
        )}

        {searchable && (
          <Block pV="xl">
            <Search placeholder={placeholder} onSearch={setSearch} onClear={setSearch} />
          </Block>
        )}

        <ScrollView>
          {filteredOptions?.[0] ? (
            filteredOptions.map((option, index) => {
              const handleSelect = () => {
                if (multiple) {
                  const alreadyExits = value?.split(',').includes(option.value)
                  if (alreadyExits) {
                    onSelect?.(
                      // @ts-expect-error
                      value
                        ?.split(',')
                        .filter((v) => v !== option.value)
                        .join(',')
                    )
                  } else {
                    if (options.length - 1 === value?.split(',').length) {
                      onSelect?.('*')
                    } else {
                      if (value === '') {
                        onSelect?.(option.value)
                      } else {
                        onSelect?.(value + `,${option.value}`)
                      }
                    }
                  }
                } else {
                  onSelect?.(option.value)
                  setModalVisible(false)
                }
              }

              const checked = value === '*' || value?.split(',').includes(option.value)

              return (
                <Block
                  pV="xl"
                  rounded="xl"
                  key={option.value}
                  flexDirection="row"
                  align="center"
                  justify="space-between"
                  flex1
                  style={{
                    borderBottomWidth: 1,
                    borderColor: theme.colors.gray100,
                    ...(index === filteredOptions.length - 1 && { borderBottomWidth: 0 }),
                  }}
                  onPress={handleSelect}>
                  <Block>
                    <Typography variation="paragraphRegular" flex1>
                      {option.label}
                    </Typography>
                    {option.description && (
                      <Typography mT="sm" flex1>
                        {option.description}
                      </Typography>
                    )}
                  </Block>
                  {multiple && <Checkbox value={checked} onValueChange={handleSelect} />}
                </Block>
              )
            })
          ) : (
            <Block mT="xl">
              <Typography>No Option Available.</Typography>
            </Block>
          )}
        </ScrollView>
      </Modal>

      {renderField ? (
        renderField({ openModal })
      ) : (
        <Block>
          {label && (
            <Typography color="gray900" mB="sm" variation="descriptionLight">
              {label}
            </Typography>
          )}
          <Block
            bW={1}
            pV="md"
            pH="lg"
            rounded="lg"
            align="center"
            flexDirection="row"
            justify="space-between"
            bgColor="white"
            style={{
              borderWidth: 1,
              borderColor: theme.colors.gray300,
            }}
            onPress={() => {
              setModalVisible(true)
            }}
            {...restProps}>
            <Typography
              color={value ? 'black' : 'gray400'}
              numberOfLines={1}
              variation="descriptionRegular"
              flex1>
              {value === '*'
                ? 'All of them'
                : value
                ? value
                    .split(separator)
                    .map((value) => optionsMap[value])
                    .join(`${separator} `)
                : placeholder}
            </Typography>
            <ChevronBottom fill={theme.colors.gray300} />
          </Block>
        </Block>
      )}
    </Block>
  )
}

export default DropDown
