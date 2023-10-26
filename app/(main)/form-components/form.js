'use client'

import {
  Elevation,
  FileInput,
  FormGroup,
  HTMLTable,
  Intent,
  ProgressBar,
  Section,
  SectionCard
} from '@blueprintjs/core'
import styles from './form.module.css'

export default function FormPage ({ sources, handleUpload }) {
  return (
    <section>
      <ItunesPlaylistSelect
        onPlaylistChange={handleUpload}
        sourceCount={sources.length}
        progress={0}
      />
      <PlaylistTables sources={sources} />
    </section>
  )
}

function ItunesPlaylistSelect ({ sourceCount, onPlaylistChange }) {
  const playlistCount = sourceCount === 1 ? '1 playlist' : `${sourceCount} playlists`
  const playlistCountString = sourceCount > 0 && `${playlistCount} selected`

  return (
    <Section
      icon='import'
      title='Import your iTunes playlist'
      rightElement={playlistCountString}
      elevation={Elevation.ONE}
      className={styles.section}
    >
      <SectionCard>
        <FormGroup intent={Intent.PRIMARY} label='Select iTunes playlist'>
          <FileInput fill text={playlistCount} onInputChange={onPlaylistChange} />
        </FormGroup>
      </SectionCard>
    </Section>
  )
}

function PlaylistTables ({ sources }) {
  console.log(sources)
  const hasSources = sources.length > 0

  return sources.map(source => (
    <Section
      key={source.id}
      icon='music'
      title={source.name}
      className={styles.section}
    >
      <SectionCard key={source.id} content={source.name} title={source.name}>
        <ProgressBar intent={Intent.NONE} value={0.23} className={styles.progress} />
        <HTMLTable compact bordered={false}>
          <thead>
            <tr>
              <td>Title</td>
              <td>Release</td>
              <td>Year</td>
            </tr>
          </thead>
          <tbody>
            {source.order.filter(id => source.tracks.hasOwnProperty(id)).map(id => source.tracks[id]).map(track => (
              <tr>
                <td>{track.name}</td>
                <td>{track.album}</td>
                <td>{track.year}</td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      </SectionCard>
    </Section>
  ))
}
