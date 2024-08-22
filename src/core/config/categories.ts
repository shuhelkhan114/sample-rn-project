import { PostCategory } from '~/typings/post'

export const categoryOptions: PostCategory[] = [
  {
    id: '1',
    name: 'Alcohol',
  },
  {
    id: '2',
    name: 'Tobacco',
  },
  {
    id: '3',
    name: 'Gambling',
  },
  {
    id: '4',
    name: 'Cocaine',
  },
]

export const postTypeOptions = [
  {
    label: 'Story',
    value: 'story',
  },
  {
    label: 'Prayer',
    value: 'prayer',
  },
  {
    label: 'Celebration',
    value: 'celebration',
  },
]

export const getOptionsForSecondSelect = (selectedValue: string) => {
  switch (selectedValue) {
    case 'alcohol':
    case 'marijuana':
    case 'porn':
    case 'vaping':
    case 'stimulants':
    case 'tobacco':
      return [
        {
          label: 'General',
          value: 'general',
        },
        {
          label: 'Off My Chest',
          value: 'off my chest',
        },
        {
          label: 'Need Advice',
          value: 'need advice',
        },
        {
          label: 'Journal',
          value: 'journal',
        },
        {
          label: 'Relapse',
          value: 'relapse',
        },
        {
          label: 'Urge',
          value: 'urge',
        },
      ]
    case 'gambling':
      return [
        {
          label: 'General',
          value: 'general',
        },
        {
          label: 'Off My Chest',
          value: 'off my chest',
        },
        {
          label: 'Need Advice',
          value: 'need advice',
        },
        {
          label: 'Journal',
          value: 'journal',
        },
        {
          label: 'Relapse',
          value: 'relapse',
        },
        {
          label: 'Urge',
          value: 'urge',
        },
        {
          label: 'Financial Help',
          value: 'financial help',
        },
      ]
    case 'anxiety & depression':
      return [
        {
          label: 'General',
          value: 'general',
        },
        {
          label: 'Off My Chest',
          value: 'off my chest',
        },
        {
          label: 'Need Advice',
          value: 'need advice',
        },
        {
          label: 'Journal',
          value: 'journal',
        },
        {
          label: 'Mindfulness',
          value: 'mindfulness',
        },
      ]
    default:
      return []
  }
}
