import React, { createContext, useMemo, type PropsWithChildren } from 'react'

import {
  baseTypography,
  colors,
  fonts,
  gradientColors,
  rounded,
  shadow,
  spacing,
  typographyItems,
} from '../core/styles/theme'

export type TypographyVariations =
  // Light
  | 'title1Light'
  | 'title2Light'
  | 'title3Light'
  | 'title4Light'
  | 'title5Light'
  | 'title6Light'
  | 'paragraphLight'
  | 'descriptionLight'
  | 'smallLight'
  // Regular
  | 'title1Regular'
  | 'title2Regular'
  | 'title3Regular'
  | 'title4Regular'
  | 'title5Regular'
  | 'title6Regular'
  | 'paragraphRegular'
  | 'descriptionRegular'
  | 'smallRegular'
  // SemiBold
  | 'title1SemiBold'
  | 'title2SemiBold'
  | 'title3SemiBold'
  | 'title4SemiBold'
  | 'title5SemiBold'
  | 'title6SemiBold'
  | 'paragraphSemiBold'
  | 'descriptionSemiBold'
  | 'smallSemiBold'
  // Bold
  | 'title1Bold'
  | 'title2Bold'
  | 'title3Bold'
  | 'title4Bold'
  | 'title5Bold'
  | 'title6Bold'
  | 'paragraphBold'
  | 'descriptionBold'
  | 'smallBold'

// const typographyItems: TypographyVariations[] = [
//   // Light
//    'title1Light',
//    'title2Light',
//    'title3Light',
//    'title4Light',
//    'title5Light',
//    'title6Light',
//    'paragraphLight',
//    'descriptionLight',
//    'smallLight',
//   // Regular
//    'title1Regular',
//    'title2Regular',
//    'title3Regular',
//    'title4Regular',
//    'title5Regular',
//    'title6Regular',
//    'paragraphRegular',
//    'descriptionRegular',
//    'smallRegular',
//   // SemiBold
//    'title1SemiBold',
//    'title2SemiBold',
//    'title3SemiBold',
//    'title4SemiBold',
//    'title5SemiBold',
//    'title6SemiBold',
//    'paragraphSemiBold',
//    'descriptionSemiBold',
//    'smallSemiBold',
// ]

type Typography = Record<TypographyVariations, any>

export const ThemeContext = createContext({
  colors,
  fonts,
  spacing,
  shadow,
  rounded,
  typography: {} as unknown as Typography,
  gradientColors,
})

interface ThemeContextProviderProps extends PropsWithChildren {}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = (props) => {
  const { children } = props
  const value = useMemo(() => {
    let typography: Typography = {} as unknown as Typography
    typographyItems.forEach((item) => {
      typography = {
        ...typography,
        [`${item}Light`]: {
          ...baseTypography[item],
          ...fonts.light,
        },
        [`${item}Regular`]: {
          ...baseTypography[item],
          ...fonts.regular,
        },
        [`${item}SemiBold`]: {
          ...baseTypography[item],
          ...fonts.semiBold,
        },
        [`${item}Bold`]: {
          ...baseTypography[item],
          ...fonts.bold,
        },
      } as unknown as Typography
    })
    return {
      colors,
      fonts,
      spacing,
      shadow,
      rounded,
      typography,
      gradientColors,
    }
  }, [])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContextProvider
