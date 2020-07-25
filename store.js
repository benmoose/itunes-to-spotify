import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers/rootReducer'

const loggerMiddleware = createLogger()

const middleware = process.env.NODE_ENV === "production" ? [thunkMiddleware] : [thunkMiddleware, loggerMiddleware]

export default createStore(rootReducer, applyMiddleware(...middleware))
