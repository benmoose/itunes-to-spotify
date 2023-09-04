import { Position, Toaster } from '@blueprintjs/core'

let singleton = null

export const getAppToaster = () => {
  if (singleton !== null) {
    return singleton
  }

  singleton = getToaster()
  return getToaster()
}

const getToaster = () => Toaster.create({
  position: Position.TOP_RIGHT
})
