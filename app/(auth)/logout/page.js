'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { actions, selectors } from 'slices'

export default function LogoutPage () {
  const dispatch = useDispatch()
  const router = useRouter()
  const authenticated = useSelector(selectors.auth.authenticated)

  if (authenticated) {
    dispatch(actions.auth.destroy())
    dispatch(actions.profile.destroy())
  }

  router.push('/')

  return null
}
