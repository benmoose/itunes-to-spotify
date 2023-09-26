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
import { redirect } from 'next/navigation'

import Logo from '../../public/img/music.svg'
import { authSelectors, profileSelectors } from '../../slices'
import { Provider, select, useDispatch } from '../../store'

function Nav () {
  const authenticated = select(authSelectors.userAuthenticated)
  const username = select(profileSelectors.displayName)
  console.log(`!! username = ${username}`)

  const handleLogin = () => {
    redirect('/auth/login', 'push')
  }
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
                href='/auth/login'
                className='bp5-button'
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
