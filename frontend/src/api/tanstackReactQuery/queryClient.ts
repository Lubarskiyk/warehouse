import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 3 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 0,
    },
  },
})