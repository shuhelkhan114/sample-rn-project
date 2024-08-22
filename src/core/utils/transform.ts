import { Addiction } from '~/typings/addiction'
import { RootAddiction } from '~/typings/config'

export const getRootAddictions = (addictions: Addiction[]) => {
  const rootAddictionsMap: Record<string, RootAddiction> = {}

  addictions.forEach((addiction) => {
    if (!rootAddictionsMap[addiction.description]) {
      rootAddictionsMap[addiction.description] = {
        id: addiction.id,
        name: addiction.description,
        sober_days: addiction.sober_days as number,
      }
    }
  })

  return Object.values(rootAddictionsMap)
}
