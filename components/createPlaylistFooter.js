import {Button, Intent} from '@blueprintjs/core'

export default ({ itemCount, createPlaylistAction }) => {
  const heightPx = 70
  return (
    <>
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: '100%',
        height: `${heightPx}px`,
        backgroundColor: "#fbfbfd",
        borderTop: "2px solid black"
      }}>
        <Button intent={Intent.PRIMARY} onClick={() => createPlaylistAction({name: "test playlist"})}>
          Create new playlist with {itemCount} tracks
        </Button>
      </div>
      <div style={{height: `${heightPx}px`}} />
    </>
  )
}
