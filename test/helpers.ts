import {ReactElement} from 'react'
import ReactTestRenderer from 'react-test-renderer'

export const wait = async () => {
  await new Promise((resolve) => resolve(null))
}

export const waitWithAct = async () => {
  await ReactTestRenderer.act(async () => {
    await new Promise((resolve) => resolve(null))
  })
}

export const render = (element: ReactElement) =>
  ReactTestRenderer.create(element)
