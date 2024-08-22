import { QueryCache, QueryClient } from '@tanstack/react-query'
import { logError } from '~/core/utils/logger'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      logError(error)
    },
  }),
})
