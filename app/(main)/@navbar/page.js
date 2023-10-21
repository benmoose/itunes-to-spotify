'use client'

import {
  Alignment,
  AnchorButton,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from '@blueprintjs/core'
import Image from 'next/image'
import Link from 'next/link'
import Logo from 'public/img/music.svg'
import { useSelector } from 'react-redux'
import { selectors } from 'slices'

export default function NavbarPage () {
  const profile = useSelector(selectors.profile.profile)
  const loading = useSelector(selectors.auth.isFetching) ||
    useSelector(selectors.profile.isFetching)

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
        <ProfileMenu loading={loading} profile={profile} />
      </NavbarGroup>
    </Navbar>
  )
}

function ProfileMenu ({ profile, loading }) {
  return profile?.displayName
    ? <AnchorButton loading={loading} minimal icon='user' rightIcon='chevron-down'>{profile?.displayName}</AnchorButton>
    : <Link prefetch={false} href='/login' className='bp5-button bp5-minimal' role='button'>Login</Link>
}
