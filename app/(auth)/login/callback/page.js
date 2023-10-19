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

  const auth = useSelector(selectors.auth.auth)
  const { code } = searchParams

  useEffect(() => {
    if (auth) {
      dispatch(actions.auth.fetchTokens(code))
        .then(() => dispatch(actions.profile.fetchProfile()))
        .then(res => console.log('>>', typeof res, res))
        .finally(() => router.replace('/'))
    } else {
      router.replace('/')
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

export const dynamic = 'force-dynamic'
