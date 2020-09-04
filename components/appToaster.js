import { Position, Toaster } from '@blueprintjs/core'

let toaster = null

export const getAppToaster = () => {
  if (toaster) {
    return toaster
  }
  toaster = getToaster()
  return toaster
}

const getToaster = () => Toaster.create({
  position: Position.TOP,
})
