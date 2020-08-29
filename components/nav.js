import {
  Alignment,
  Button,
  Classes,
  FileInput,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Text,
} from '@blueprintjs/core'
import Logo from '../public/img/music.svg'

export default ({ username, onFileSelect, onLoginClick }) => {
  return (
    <Navbar>
      <NavbarGroup>
        <img style={{width: "30px", marginRight: "10px"}} src={Logo} />
        <NavbarHeading>iTunes to Spotify</NavbarHeading>
        <NavbarDivider />
        {
          username
            ? (
              <form encType="multipart/form-data">
                <FileInput buttonText="Upload" onInputChange={onFileSelect} />
              </form>
            )
            : <Text>Login to convert a playlist</Text>
        }

      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <NavbarDivider />
        {username
          ? <Button className={Classes.MINIMAL} icon="user" text={username}/>
          : <Button className={Classes.MINIMAL} icon="user" text="Login" onClick={onLoginClick} />
        }
      </NavbarGroup>
    </Navbar>
  )
}
