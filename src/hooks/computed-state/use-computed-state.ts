import { DependencyList, Dispatch, useEffect, useState } from 'react'

/**
 * Returns a computable stateful value, and a function to update it.
 * useComputedState will only recompute the state when one of the `dependecies` has changed.
 * If no `dependecies` array is provided, a new value will be computed on every render.
 * @param factory A function that computes and returns the next state.
 * @param dependecies An optional array of dependecies that triggers the computation of the next state.
 * @example
 * ```js
 * import {useComputedState} from 'react-hooks'
 *
 * const Component = ({defaultName}: {defaultName: string}) => {
 *   const [name, setName] = useComputedState(() => defaultName, [defaultName])
 *
 *   const handleChange = (event) => setName(event.target.value)
 *
 *   return (
 *     <>
 *       {name}
 *       <input onChange={handleChange} value={name} />
 *     </>
 *   )
 * }
 * ```
 */
const useComputedState = <T>(
  factory: () => T,
  dependecies: DependencyList | undefined,
): [T, Dispatch<T>] => {
  const [state, setState] = useState(factory)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setState(factory()), dependecies)
  return [state, setState]
}

export default useComputedState
