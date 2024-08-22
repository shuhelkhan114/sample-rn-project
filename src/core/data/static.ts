import { GenderLabel, GenderValue } from '~/typings/common'

export const genderOptions = [
  {
    label: GenderLabel.Man,
    value: GenderValue.Male,
  },
  {
    label: GenderLabel.Women,
    value: GenderValue.Female,
  },
  {
    label: GenderLabel.Other,
    value: GenderValue.Other,
  },
]

export const addictionsOptions = [
  {
    name: 'Alcohol',
    subAddiction: ['Beer', 'Whisk', 'Rum', 'Wine', 'vodka'],
  },
  {
    name: 'Marijuana',
    subAddiction: [
      'Sour Diesel',
      'Haze',
      'Purple Haze',
      'Blue Dream',
      'Northern Lights',
      "Charlotte's Web",
      'Acapulco Golden',
    ],
  },
  {
    name: 'Nicotine',
    subAddiction: ['Smoking', 'Vaping'],
  },
  {
    name: 'Gambling',
    subAddiction: ['Sports Betting', 'Stock Market & Options', 'Casino', 'Online Casino'],
  },
  {
    name: 'Opioids',
    subAddiction: ['Sports-Betting', 'Stock-Market & Options', 'Casinos', 'Online-Casino'],
  },
]
