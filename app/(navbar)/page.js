'use client'

import { Section, HTMLTable, Elevation, Intent, FormGroup, FileInput, SectionCard, ProgressBar } from '@blueprintjs/core'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from 'slices'
import styles from './styles.module.css'

export default function HomePage () {
  const authenticated = useSelector(selectors.auth.authenticated)

  if (!authenticated) {
    return null
  }

  const dispatch = useDispatch()

  const handlePlaylistChange = useCallback((event) => {
    if (event.currentTarget.files.length === 1) {
      const file = event.currentTarget.files.item(0)
      dispatch(actions.itunes.setPlaylistName(file.name))
      console.log({ message: `Reading ${file.name}.`, intent: Intent.PRIMARY })
    } else {
      console.log({ message: 'Choose a single file.', intent: Intent.DANGER })
    }
  }, [])

  const playlistName = useSelector(selectors.itunes.playlistName) || ''
  const sourceTracks = useSelector(selectors.itunes.tracksOrdered)

  if (sourceTracks.length === 0) {
    return (
      <>
        <section className={styles.sectionContainer}>
          <ItunesPlaylistSelect
            onPlaylistChange={handlePlaylistChange}
            playlistName={playlistName}
            trackCount={sourceTracks.length}
            progress={0}
          />

          <Section
            collapsible
            collapseProps={{ defaultIsOpen: false, isOpen: false }}
            icon='manually-entered-data'
            title='Edit Spotify playlist'
            rightElement={<ProgressBar animate={false} stripes={false} value={0.45} />}
            elevation={Elevation.ZERO}
            className={styles.section}
          >
            <SectionCard>
              <HTMLTable compact bordered={false}>
                <thead>
                  <tr>
                    <td>One</td>
                    <td>Two</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Aaa</td>
                    <td>Bbb</td>
                  </tr>
                </tbody>
              </HTMLTable>
            </SectionCard>
          </Section>
        </section>
      </>
    )
  }

  return (
    <pre>
      Papaparse...
    </pre>
  )
}

const ItunesPlaylistSelect = ({ playlistName, trackCount, progress, onPlaylistChange }) => {
  return (
    <Section
      collapsible
      collapseProps={{ defaultIsOpen: true }}
      icon='import'
      title='Import your iTunes playlist'
      rightElement={`${trackCount} tracks`}
      elevation={Elevation.ONE}
      className={styles.section}
    >
      <SectionCard>
        <ProgressBar intent={Intent.NONE} value={progress} className={styles.progress} />
        <FormGroup intent={Intent.PRIMARY} label='Select iTunes playlist'>
          <FileInput fill text={playlistName} onInputChange={onPlaylistChange} />
        </FormGroup>
      </SectionCard>
    </Section>
  )
}
