'use client'

import { Section, HTMLTable, Elevation, Intent, FormGroup, FileInput, SectionCard, ProgressBar } from '@blueprintjs/core'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from 'slices'
import styles from './styles.module.css'

export default function HomePage () {
  const auth = useSelector(selectors.auth.auth)

  if (!auth) {
    return null
  }

  const dispatch = useDispatch()

  const handlePlaylistChange = useCallback((event) => {
    if (event.currentTarget.files.length === 1) {
      const file = event.currentTarget.files.item(0)
      dispatch(actions.sources.setSources([{ name: file.name }]))
    }
  }, [])

  const sources = useSelector(selectors.sources.sources)

  if (sources.length === 0) {
    return (
      <section className={styles.sectionContainer}>
        <ItunesPlaylistSelect
          onPlaylistChange={handlePlaylistChange}
          playlistName={sources.map(s => s.name).join(', ')}
          sourceCount={sources.length}
          progress={0}
        />
        <Section
          // collapsible
          collapseProps={{ isOpen: sources.length > 0 }}
          icon='manually-entered-data'
          title='Confirm conversion'
          rightElement={<ProgressBar animate={false} stripes={false} value={0.45} />}
          elevation={sources.length === 0 ? Elevation.ZERO : Elevation.ONE}
          className={styles.section}
        >
          {sources.map(source => (
            <SectionCard key={source.id} title={source.name || `source ${source.id}`}>
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
          ))}
        </Section>
      </section>
    )
  }

  return (
    <pre>
      Papaparse...
    </pre>
  )
}

const ItunesPlaylistSelect = ({ playlistName, sourceCount, progress, onPlaylistChange }) => {
  return (
    <Section
      icon='import'
      title='Import your iTunes playlist'
      rightElement={sourceCount > 0 && `${sourceCount} ${sourceCount === 1 ? 'playlist' : 'playlists'} selected`}
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
