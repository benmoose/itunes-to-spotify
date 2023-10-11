'use client'

import {
  Alignment,
  AnchorButton,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from '@blueprintjs/core'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import Logo from 'public/img/music.svg'
import { selectors } from 'slices'

export default function NavbarComponent () {
  const authenticated = useSelector(selectors.auth.authenticated)
  const displayName = useSelector(selectors.profile.displayName)
  const fetching = useSelector(selectors.profile.isFetching)

  return (
    <Navbar>
      <NavbarGroup>
        <Image priority width={30} height={30} style={{ marginRight: '10px' }} src={Logo} alt='Site logo' />
        <NavbarHeading>iTunes to Spotify</NavbarHeading>
      </NavbarGroup>

      <NavbarGroup align={Alignment.RIGHT}>
        <AnchorButton
          minimal
          icon='code'
          text='View Code'
          target='_blank'
          rel='external nofollow'
          href='https://github.com/benmoose/itunes-to-spotify'
        />
        <NavbarDivider />
        {authenticated
          ? <AnchorButton loading={fetching} minimal icon='user' rightIcon='chevron-down'>{displayName}</AnchorButton>
          : <Link href='/login' prefetch={false} className='bp5-button bp5-minimal' role='button'>Login</Link>}
      </NavbarGroup>
    </Navbar>
  )
}
