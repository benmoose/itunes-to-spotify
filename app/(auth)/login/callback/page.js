'use client'

import {
  Navbar,
  NavbarHeading,
  NavbarGroup,
  Alignment,
  AnchorButton, NavbarDivider
} from '@blueprintjs/core'
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

  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading className='bp5-skeleton'>iTunes to Spotify</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <AnchorButton minimal className='bp5-skeleton' icon='code' text='View Code' />
        <NavbarDivider className='bp5-skeleton' />
        <AnchorButton minimal className='bp5-skeleton' icon='user' rightIcon='chevron-down' text='Loading' />
      </NavbarGroup>
    </Navbar>
  )
}
