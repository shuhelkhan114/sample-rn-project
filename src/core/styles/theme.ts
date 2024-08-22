import { type TextStyle } from 'react-native'

import { getSize } from '../utils/responsive'

export type Size =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'
  | 'auto'

export const spacing = {
  xxs: getSize(1),
  xs: getSize(2),
  sm: getSize(4),
  md: getSize(8),
  lg: getSize(12),
  xl: getSize(16),
  xxl: getSize(20),
  xxxl: getSize(24),
  '4xl': getSize(32),
  '5xl': getSize(40),
  '6xl': getSize(48),
  '7xl': getSize(58),
  '8xl': getSize(72),
  '9xl': getSize(76),
  auto: 'auto',
}

export const rounded = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8,
  xxl: 16,
  xxxl: 20,
  '4xl': 24,
  '5xl': 32,
  '6xl': 40,
}

export const shadow = {
  sm: {
    shadowColor: 'rgba(169, 169, 169, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  md: {
    shadowColor: 'rgba(169, 169, 169, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
}

export const colors = {
  primary: '#8001FF',
  backgroundPrimary: '#e5d2f7',
  secondary: '#6880D8',
  white: '#FFFFFF',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D2D5DA',
  gray400: '#9DA3AE',
  gray500: '#6C727F',
  gray600: '#4D5562',
  gray700: '#394150',
  gray800: '#212936',
  gray900: '#121826',
  blue100: '#DBEAFE',
  blue800: '#1E40AF',
  green100: '#D1FAE5',
  green400: '#04CE00',
  green800: '#065F46',
  pink100: '#FCE7F3',
  pink800: '#9D174D',
  black: '#000000',
  positive: '#0DA60D',
  warning: '#FFA500',
  neutral: '#22A2FF',
  negative: '#C52A1A',
  headerGray: '#1B1D28',
  background: '#F0FAFF',
  yellow100: '#FEF3C7',
  yellow800: '#92400E',
  red100: '#FEE2E2',
  red800: '#991B1B',
  lightprpl: '#BAE4FC',
}

export type ThemeColor = keyof typeof colors

export const fonts = {
  light: {
    fontFamily: 'RedditSans-Light',
    fontWeight: '300' as TextStyle['fontWeight'],
  },
  regular: {
    fontFamily: 'RedditSans-Regular',
    fontWeight: '400' as TextStyle['fontWeight'],
  },
  semiBold: {
    fontFamily: 'RedditSans-SemiBold',
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  bold: {
    fontFamily: 'RedditSans-Bold',
    fontWeight: '700' as TextStyle['fontWeight'],
  },
}

export type BaseTypography =
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'title5'
  | 'title6'
  | 'paragraph'
  | 'description'
  | 'small'

export const typographyItems: BaseTypography[] = [
  'title1',
  'title2',
  'title3',
  'title4',
  'title5',
  'title6',
  'paragraph',
  'description',
  'small',
]

const lineHeightMultiplier = 1.3

export const baseTypography: Record<BaseTypography, any> = {
  title1: {
    color: colors.black,
    fontSize: getSize(48),
    lineHeight: getSize(38 * lineHeightMultiplier),
  },
  title2: {
    color: colors.black,
    fontSize: getSize(32),
    lineHeight: getSize(34),
  },
  title3: {
    color: colors.black,
    fontSize: getSize(24),
    lineHeight: getSize(34),
  },
  title4: {
    color: colors.black,
    fontSize: getSize(22),
    lineHeight: getSize(28),
  },
  title5: {
    color: colors.black,
    fontSize: getSize(20),
    lineHeight: getSize(25),
  },
  title6: {
    color: colors.black,
    fontSize: getSize(18),
    lineHeight: getSize(25),
  },
  paragraph: {
    color: colors.black,
    fontSize: getSize(16),
    lineHeight: getSize(20 * 1.2),
  },
  description: {
    color: colors.black,
    fontSize: getSize(14),
    lineHeight: getSize(20),
  },
  small: {
    color: colors.black,
    fontSize: getSize(12),
    lineHeight: getSize(20),
  },
}

export const gradientColors = ['#ee7a7a', '#d45898']
