import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers/rootReducer'

const middleware = process.env.NODE_ENV === 'production' ? [thunkMiddleware] : [thunkMiddleware, createLogger()]

export default createStore(rootReducer, applyMiddleware(...middleware))
