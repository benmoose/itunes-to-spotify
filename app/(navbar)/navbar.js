'use client'

import {
  Alignment,
  AnchorButton,
  FileInput,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from '@blueprintjs/core'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import Logo from 'public/img/music.svg'
import { actions, selectors } from 'slices'

export default function NavbarComponent ({ handleFormSubmit }) {
  const dispatch = useDispatch()
  const authenticated = useSelector(selectors.auth.authenticated)
  const displayName = useSelector(selectors.profile.displayName)
  const playlistName = useSelector(selectors.itunes.playlistName)
  const fetching = useSelector(selectors.profile.isFetching)

  const setPlaylistName = (event) => {
    if (event.currentTarget.files.length === 1) {
      const file = event.currentTarget.files[0]
      dispatch(actions.itunes.setPlaylistName(file.name))
    }
  }

  return (
    <Navbar>
      <NavbarGroup>
        <Image priority width={30} height={30} style={{ marginRight: '10px' }} src={Logo} alt='Site logo' />
        <NavbarHeading>iTunes to Spotify</NavbarHeading>
        <NavbarDivider />
        {authenticated && (
          <form action={handleFormSubmit}>
            <FileInput fill text={playlistName || 'Choose iTunes playlist'} onInputChange={setPlaylistName} buttonText='Upload' />
          </form>
        )}
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
          ? <AnchorButton disabled={fetching} minimal icon='user' text={displayName} />
          : <Link href='/login' prefetch={false} className='bp5-button bp5-minimal' role='button'>Login</Link>}
      </NavbarGroup>
    </Navbar>
  )
}
