'use client'

import { Alignment, AnchorButton, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from '@blueprintjs/core'

export default function AppSkeleton ({ children }) {
  return (
    <>
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
      {children}
    </>
  )
}
