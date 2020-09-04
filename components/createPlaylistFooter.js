import {Button, Intent, InputGroup, ControlGroup} from '@blueprintjs/core'

export default ({ itemCount, playlistName, loading, createPlaylistAction, onPlaylistNameChange }) => {

  return (
    <div style={{padding: "20px"}}>
      <div style={{maxWidth: "600px", margin: "0 auto"}}>
        <ControlGroup vertical={false} disabled={loading}>
          <InputGroup fill id="playlist-name" value={playlistName} onChange={e => onPlaylistNameChange(e.target.value)} />
          <Button intent={Intent.PRIMARY} onClick={createPlaylistAction} disabled={!playlistName || loading}>
            Create playlist ({itemCount} tracks)
          </Button>
        </ControlGroup>
      </div>
    </div>
  )
}
