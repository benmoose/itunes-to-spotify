import { useSelector, useDispatch } from 'react-redux'

export { default as ReduxProvider } from './redux-provider'
export const dispatch = () => useDispatch()
export const select = useSelector
