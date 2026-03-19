import { useState, useCallback } from 'react'
import { AxiosError } from 'axios'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiReturn<T> extends ApiState<T> {
  execute: (...args: unknown[]) => Promise<T | null>
  reset: () => void
}

export const useApi = <T>(
  apiFunc: (...args: unknown[]) => Promise<T>
): UseApiReturn<T> => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (...args: unknown[]): Promise<T | null> => {
      setState({ data: null, loading: true, error: null })
      try {
        const result = await apiFunc(...args)
        setState({ data: result, loading: false, error: null })
        return result
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        const message =
          error.response?.data?.message ?? error.message ?? 'Errore sconosciuto'
        setState({ data: null, loading: false, error: message })
        return null
      }
    },
    [apiFunc]
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return { ...state, execute, reset }
}
