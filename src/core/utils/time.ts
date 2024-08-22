export type IntervalMapping = {
  label: string
  seconds: number
}

export const getTimeAgo = (date: Date, intervalMapping?: IntervalMapping[]) => {
  const intervals = intervalMapping || [
    { label: 'y', seconds: 31536000 },
    { label: 'm', seconds: 2592000 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
    { label: 's', seconds: 1 },
  ]
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const interval = intervals.find((i) => i.seconds <= seconds)
  const count = Math.floor(seconds / (interval?.seconds || 1))
  if (!interval) {
    return 'now'
  }
  return `${count}${interval?.label}${count !== 1 ? '' : ''}`
}

export const getDayTimeAgo = (value: string | Date) => {
  const now = new Date()
  const date = new Date(value)
  // @ts-ignore
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (days === 0) {
    return 'Today'
  } else if (days === 1) {
    return 'Yesterday'
  } else if (days < 7) {
    return `${days} days ago`
  } else if (weeks === 1) {
    return 'A week ago'
  } else if (weeks < 4) {
    return `${weeks} weeks ago`
  } else if (months === 1) {
    return '1 month ago'
  } else if (months < 12) {
    return `${months} months ago`
  } else if (years === 1) {
    return '1 year ago'
  } else if (years < 5) {
    return `${years} years ago`
  } else {
    return '5+ years ago'
  }
}
