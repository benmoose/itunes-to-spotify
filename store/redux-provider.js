'use client'

import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import 'normalize.css/normalize.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import makeStore from './store'

const { store, persistor } = makeStore()

export default function ReduxProvider ({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
