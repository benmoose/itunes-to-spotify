'use client'

import {
  Alignment,
  AnchorButton,
  Button,
  FileInput,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Text
} from '@blueprintjs/core'
import { redirect } from 'next/navigation'

import ReduxProvider from '../../store/redux-provider'
import { useAppSelector } from '../../store'
import { authSelector, profileSelector } from '../../slices'
import Logo from '../../public/img/music.svg'

function Nav () {
  const authenticated = useAppSelector(authSelector.authenticated)
  const username = useAppSelector(profileSelector.username)

  const handleLogin = () => redirect('/api/login', 'push')
  const handleInputChange = (e) => {
    e.preventDefault()
    console.log('upload', e.target.files)
  }

  return (
    <Navbar>
      <NavbarGroup>
        <img style={{ width: '30px', marginRight: '10px' }} src={Logo} />
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
            ? <Button minimal icon='user' text={username} />
            : <Button minimal icon='user' text='Login' onClick={handleLogin} />
        }
      </NavbarGroup>
    </Navbar>
  )
}

export default function () {
  return (
    <ReduxProvider>
      <Nav />
    </ReduxProvider>
  )
}
