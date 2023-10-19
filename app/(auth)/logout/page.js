'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { actions, selectors } from 'slices'

export default function LogoutPage () {
  const dispatch = useDispatch()
  const router = useRouter()
  const auth = useSelector(selectors.auth.auth)

  if (auth) {
    dispatch(actions.auth.destroy())
    dispatch(actions.profile.destroy())
  }

  router.push('/')

  return null
}
