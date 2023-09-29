'use client'

import { Spinner, SpinnerSize, Intent } from '@blueprintjs/core'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { actions, selectors } from 'slices'

export default function LoginCallbackPage ({ searchParams }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const authenticated = useSelector(selectors.auth.authenticated)
  const { code } = searchParams

  useEffect(() => {
    console.log(code, authenticated)
    if (authenticated) {
      router.replace('/')
    } else {
      dispatch(actions.auth.fetchAuthTokens({ code })).unwrap()
        .then(() => dispatch(actions.profile.fetchProfile()).unwrap())
        // todo: update UI with error
        .catch(() => {})
        .finally(() => router.replace('/'))
    }
  }, [code])

  return <Spinner size={SpinnerSize.LARGE} intent={Intent.PRIMARY} />
}
