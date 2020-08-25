import {
  Alignment,
  Button,
  Classes,
  FileInput,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core'
import Logo from '../public/img/music.svg'

export default ({ username, onInputChange }) => {
  return (
    <Navbar>
      <NavbarGroup>
        <img style={{width: "30px", marginRight: "10px"}} src={Logo} />
        <NavbarHeading>iTunes to Spotify</NavbarHeading>
        <NavbarDivider />
        <form encType="multipart/form-data">
          <FileInput buttonText="Upload" onInputChange={onInputChange} />
        </form>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="user" text={username}/>
      </NavbarGroup>
    </Navbar>
  )
}
