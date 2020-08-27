import {Button, Intent} from '@blueprintjs/core'

export default ({ itemCount }) => {
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
        <Button intent={Intent.PRIMARY}>Create new playlist with {itemCount} items</Button>
      </div>
      <div style={{height: `${heightPx}px`}} />
    </>
  )
}
