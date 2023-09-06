import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

import { Provider } from 'react-redux'
import { store } from './index'
import { persistStore } from 'redux-persist'

persistStore(store)

export default function ReduxProvider ({ children }) {
  return <Provider store={store}>{children}</Provider>
}
