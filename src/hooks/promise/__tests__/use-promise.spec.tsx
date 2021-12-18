import React from 'react'
import {render, waitWithAct} from 'test-helpers'
import usePromise from '../use-promise'

const Foo = ({ data, error }: { data?: object; error?: Error }) => {
  const result = usePromise(async () => {
    if (data) return data
    if (error) throw error
    return undefined
  }, [data, error])
  return <div>{JSON.stringify(result)}</div>
}

describe('Promise Hook', () => {
  it('should render default state', async () => {
    const renderer = render(<Foo />)
    expect(renderer.toJSON()).toMatchInlineSnapshot(`
      <div>
        {"loading":false}
      </div>
    `)
  })

  it('should run promise function and shifts through state', async () => {
    // Idle
    const idle = render(<Foo />)
    expect(idle.toJSON()).toMatchInlineSnapshot(`
      <div>
        {"loading":true}
      </div>
    `)

    // Success
    const success = render(<Foo data={{ new: 'val' }} />)
    expect(success.toJSON()).toMatchInlineSnapshot(`
      <div>
        {"loading":false}
      </div>
    `)

    await waitWithAct()
    expect(success.toJSON()).toMatchInlineSnapshot(`
      <div>
        {"loading":false,"data":{"new":"val"}}
      </div>
    `)

    // Error
    const error = render(<Foo error={new Error('meh!')} />)
    expect(error.toJSON()).toMatchInlineSnapshot(`
      <div>
        {"loading":false}
      </div>
    `)

    await waitWithAct()
    expect(error.toJSON()).toMatchInlineSnapshot(`
      <div>
        {"loading":false,"error":{}}
      </div>
    `)
  })
})
