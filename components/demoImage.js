import { Callout, Intent } from '@blueprintjs/core'
import DemoImage from '../public/img/export-playlist.png'
import styles from './demoImage.module.css'

export default () => {
  return (
    <div className={styles.container}>
      <Callout intent={Intent.PRIMARY}>
        Get the playlist file to upload by exporting the playlist from iTunes/Music.
      </Callout>
      <div className={styles.imgContainer}>
        <img src={DemoImage} className={styles.img} />
      </div>
    </div>
  )
}
