import React, { useEffect, DependencyList } from 'react'
import { render, waitWithAct } from 'test-helpers'

import useComputedState from '../use-computed-state'

const Foo = ({
  value,
  newValue,
  deps,
}: {
  value: any
  newValue?: any
  deps: DependencyList
}) => {
  const [state, setState] = useComputedState(() => value, deps)
  useEffect(() => newValue && setState(newValue), [newValue])
  return <div>{JSON.stringify(state)}</div>
}

describe('Computed state hook', () => {
  it('renders initial value', async () => {
    const renderer = render(<Foo value={1} deps={[]} />)
    await waitWithAct()
    expect(renderer.toJSON()).toMatchInlineSnapshot(`
      <div>
        1
      </div>
    `)
  })

  it('sets state to a new value', async () => {
    const renderer = render(<Foo value={1} deps={[]} />)
    await waitWithAct()
    expect(renderer.toJSON()).toMatchInlineSnapshot(`
      <div>
        1
      </div>
    `)

    renderer.update(<Foo value={1} newValue={2} deps={[]} />)
    await waitWithAct()
    expect(renderer.toJSON()).toMatchInlineSnapshot(`
      <div>
        2
      </div>
    `)
  })

  it('resets state when dependency list changes', async () => {
    let deps = [0]
    const renderer = render(<Foo value={1} deps={deps} />)
    await waitWithAct()
    expect(renderer.toJSON()).toMatchInlineSnapshot(`
      <div>
        1
      </div>
    `)

    renderer.update(<Foo value={1} newValue={2} deps={deps} />)
    await waitWithAct()
    expect(renderer.toJSON()).toMatchInlineSnapshot(`
      <div>
        2
      </div>
    `)

    deps = [1]
    renderer.update(<Foo value={1} newValue={2} deps={deps} />)
    await waitWithAct()
    expect(renderer.toJSON()).toMatchInlineSnapshot(`
      <div>
        1
      </div>
    `)
  })
})
