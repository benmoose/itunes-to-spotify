import { useSelector, useDispatch } from 'react-redux'

export { default as store } from './store'
export { default as Provider } from './redux-provider'
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
