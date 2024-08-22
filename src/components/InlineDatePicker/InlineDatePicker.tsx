import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import Block from '~/components/Block/Block'
import Typography from '~/components/Typography/Typography'

interface InlineDatePickerProps {
  date: Date | null
  label: string
  onChange: (date: Date) => void
  maxDate?: Date
  minDate?: Date
}

const InlineDatePicker: React.FC<InlineDatePickerProps> = (props) => {
  const { label, date, minDate, maxDate, onChange } = props

  const [visible, setVisible] = useState(false)

  const handleDateChange = (_: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    if (selectedDate) {
      onChange(selectedDate)
    }
    setVisible(false)
  }

  return (
    <Block>
      <Typography center variation="paragraphRegular" color="black">
        {label}
      </Typography>
      <Block mB="auto" pV="xxl" pH="xxxl">
        {Platform.OS === 'android' && (
          <Block>
            {date && (
              <Block
                onPress={() => setVisible(true)}
                bW={1}
                rounded="xl"
                bC="white"
                align="center"
                pV="xl">
                <Typography variation="descriptionRegular">{date.toDateString()}</Typography>
              </Block>
            )}
            {visible && (
              <DatePicker
                value={date || new Date()}
                mode="date"
                display="spinner"
                minimumDate={minDate}
                maximumDate={maxDate}
                onChange={handleDateChange}
                style={{ position: 'relative' }}
              />
            )}
          </Block>
        )}
        {Platform.OS === 'ios' && (
          <DatePicker
            value={date || new Date()}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            minimumDate={minDate}
            maximumDate={maxDate}
            style={{ position: 'relative' }}
          />
        )}
      </Block>
    </Block>
  )
}

export default InlineDatePicker
