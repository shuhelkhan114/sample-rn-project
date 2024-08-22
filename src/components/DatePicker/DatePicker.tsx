import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { Button, StyleSheet } from 'react-native'
import Block from '~/components/Block/Block'

const DatePicker = () => {
  const [selectedDay, setSelectedDay] = useState('5')
  const [selectedMonth, setSelectedMonth] = useState('Apr')
  const [selectedYear, setSelectedYear] = useState('2000')

  const currentYear = new Date().getFullYear()

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const handleAgeVerification = () => {
    const birthYear = parseInt(selectedYear)
    const age = currentYear - birthYear

    if (age >= 18) {
      // navigation.navigate('NextPage') // Redirect to the next page
    } else {
      // Handle underage user (e.g., show a message)
    }
  }

  return (
    <Block align="center">
      <Block flex1 flexDirection="row" align="center">
        <Picker
          style={styles.picker}
          selectedValue={selectedDay}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}>
          {Array.from({ length: 31 }, (_, i) => (
            <Picker.Item key={String(i + 1)} label={String(i + 1)} value={String(i + 1)} />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}>
          {months.map((month) => (
            <Picker.Item key={month} label={month} value={month} />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}>
          {/* Create year options */}
          {Array.from({ length: currentYear - 1900 }, (_, i) => (
            <Picker.Item
              key={String(currentYear - i)}
              label={String(currentYear - i)}
              value={String(currentYear - i)}
            />
          ))}
        </Picker>
      </Block>
      <Button title="Next" onPress={handleAgeVerification} />
    </Block>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: 120,
  },
})

export default DatePicker
