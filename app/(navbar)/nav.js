'use client'

import {
  Alignment,
  AnchorButton,
  FileInput,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Text
} from '@blueprintjs/core'
import Image from 'next/image'
import Link from 'next/link'

import Logo from 'public/img/music.svg'
import { auth, profile } from 'slices'
import { Provider, select } from 'store'

function Nav () {
  const authenticated = select(auth.selectors.userAuthenticated)
  const username = select(profile.selectors.displayName)

  const handleInputChange = (e) => {
    e.preventDefault()
    console.log('upload', e.target.files)
  }

  return (
    <Navbar>
      <NavbarGroup>
        <Image priority width={30} height={30} style={{ marginRight: '10px' }} src={Logo} alt='Site logo' />
        <NavbarHeading>iTunes to Spotify</NavbarHeading>
        <NavbarDivider />
        {
          authenticated
            ? (
              <form encType='multipart/form-data'>
                <FileInput buttonText='Upload' onInputChange={handleInputChange} />
              </form>
              )
            : <Text>Login to convert a playlist</Text>
        }

      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <AnchorButton
          minimal
          icon='code'
          text='View Code'
          target='_blank'
          href='https://github.com/benmoose/itunes-to-spotify'
        />
        <NavbarDivider />
        {
          authenticated
            ? <AnchorButton minimal icon='user' text={username} />
            : <Link
                prefetch={false}
                replace={false}
                href='/login'
                className='bp5-button bp5-minimal'
                role='button'
              >Login
            </Link>
        }
      </NavbarGroup>
    </Navbar>
  )
}

export default function () {
  return (
    <Provider>
      <Nav />
    </Provider>
  )
}
