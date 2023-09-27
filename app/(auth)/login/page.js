'use client'

import { ReduxProvider } from 'store'
import Login from './login'

export default () => (
  <ReduxProvider>
    <Login />
  </ReduxProvider>
)
