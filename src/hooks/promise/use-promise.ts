/**
 * @packageDocumentation
 * @module Hooks
 */
import { DependencyList, useEffect, useState } from 'react'

interface State<T> {
  data?: T
  error?: Error
  loading: boolean
}

export const usePromiseEffect: <T>(
  promissory: () => Promise<T>,
  callback: (error: Error | undefined, data: T | undefined) => void,
  dependecies: DependencyList,
) => void = (promissory, callback, dependecies) => {
  useEffect(() => {
    let cancelled = false
    promissory()
      .then((data) => !cancelled && callback(undefined, data))
      .catch((error) => !cancelled && callback(error, undefined))
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependecies)
}

/**
 * React hook to simplify the use of asynchronous operations.
 * @param promissory A function that returns a promise.
 * @example
 * ```js
 * import {usePromise} from 'react-hooks'
 *
 * const Component = () => {
 *   const {data} = usePromise(async () => 1, [])
 *
 *   return <>{data.toString()}</>
 * }
 * ```
 */
const usePromise = <T>(
  promissory: () => Promise<T>,
  dependecies: DependencyList,
): State<T> => {
  const [state, setState] = useState<State<T>>({ loading: false })

  usePromiseEffect(
    () => {
      setState((val) => ({ ...val, loading: true }))
      return promissory()
    },
    (error, data) =>
      setState((val) => ({
        ...val,
        error,
        data,
        loading: false,
      })),
    dependecies,
  )

  return state
}

export default usePromise
