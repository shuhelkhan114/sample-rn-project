import { UserRole } from '~/context/AuthContext'
import { StreamUser } from '~/typings/stream'

export const getFormattedNumber = (num: number, digits: number = 2) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: ' K' },
    { value: 1e6, symbol: ' M' },
    { value: 1e9, symbol: ' B' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0'
}

export const capitalizeFirstLetter = (str = '') => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getParsedMessage = (html = '') => {
  return html.replace(/<\/?[^>]+(>|$)/g, '').replace('\n', '')
}

export const revealedToUser = (revealedTo: string[], myUserId?: string) => {
  if (revealedTo && myUserId) {
    if (revealedTo?.includes(myUserId)) {
      return true
    }
  }
  return false
}

export const getImageUrl = (params = {} as unknown as StreamUser, myUserId?: string) => {
  const { yumeRole, yumeAvatar, yumeRevealedUser, yumeImage, yumeRevealedCommunity } = params

  if (yumeRevealedUser && myUserId) {
    if (yumeRevealedUser?.includes(myUserId)) {
      return yumeImage || yumeAvatar
    }
  }

  if (yumeRole === UserRole.RecoveryCoach || yumeRole === UserRole.FinancialManager) {
    return yumeImage || yumeAvatar
  } else if (yumeRole === UserRole.User) {
    return yumeRevealedCommunity ? yumeImage || yumeAvatar : yumeAvatar
  }

  return yumeAvatar
}

export const getName = (
  params = {} as unknown as StreamUser,
  /**  used to check if the other party has revealed to me or not */
  myUserId?: string
) => {
  const { yumeRole, yumeName, yumeRevealedUser, yumeUserName, yumeRevealedCommunity } = params

  // User is reveald
  if (yumeRevealedUser && myUserId) {
    if (yumeRevealedUser?.includes(myUserId)) {
      return yumeName
    }
  }

  // User is not reveald
  if (yumeRole === UserRole.RecoveryCoach || yumeRole === UserRole.FinancialManager) {
    return yumeName
  } else if (yumeRole === UserRole.User) {
    return yumeRevealedCommunity ? yumeName : yumeUserName
  }

  return yumeUserName
}

export const getGenderText = (gender: string) => {
  if (gender === 'male') {
    return 'him'
  } else if (gender === 'female') {
    return 'her'
  } else {
    return 'them'
  }
}

export const getRandomInt = (min = 1, max = Number.MAX_SAFE_INTEGER) => {
  // The Math.floor() function rounds down to the nearest integer
  // The Math.random() function returns a random decimal between 0 (inclusive) and 1 (exclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const constructFeedName = (category: string) => {
  return category.replaceAll(' ', '').replaceAll('&', '_').toLowerCase()
}

export function roundToNearest(number: number, nearest: number) {
  return Math.ceil(number / nearest) * nearest
}
