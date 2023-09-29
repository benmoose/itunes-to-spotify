'use client'

import { ReduxProvider } from 'store'
import Login from './login'

export default function Page () {
  return (
    <ReduxProvider>
      <Login />
    </ReduxProvider>
  )
}
