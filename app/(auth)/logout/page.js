'use client'

import { useDispatch, useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import { actions, selectors } from 'slices'

export default function LogoutPage () {
  const dispatch = useDispatch()
  const auth = useSelector(selectors.auth.auth)

  if (auth) {
    dispatch(actions.auth.destroy())
    dispatch(actions.profile.destroy())
  }

  redirect('/', 'replace')
}
