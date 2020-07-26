import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core'

export default ({ username }) => {
  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>iTunes to Spotify</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="upload" text="Upload"/>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="user" text={username}/>
      </NavbarGroup>
    </Navbar>
  )
}
