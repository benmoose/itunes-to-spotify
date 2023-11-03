'use client'

import {
  Button,
  Divider,
  Elevation,
  FileInput,
  FormGroup,
  HTMLTable,
  Intent,
  Icon,
  Text,
  ControlGroup,
  ProgressBar,
  Spinner,
  SpinnerSize,
  Section,
  SectionCard
} from '@blueprintjs/core'
import styles from './form.module.css'

export default function FormPage ({ sources, loading, handleUpload, handleReset }) {
  return (
    <section>
      <ItunesPlaylistSelect
        onReset={handleReset}
        onPlaylistChange={handleUpload}
        sourceCount={sources.length}
      />
      <PlaylistTables loading={loading} progress={33} sources={sources} />
    </section>
  )
}

function ItunesPlaylistSelect ({ sourceCount, onPlaylistChange, onReset }) {
  const playlistCountString = sourceCount === 1 ? '1 playlist' : `${sourceCount} playlists`
  const playlistCount = sourceCount > 0 && (
    <Text className='bp5-text-muted'>{playlistCountString}</Text>
  )

  return (
    <Section
      icon='import'
      title='Import your iTunes playlist'
      rightElement={playlistCount}
      elevation={Elevation.ONE}
      className={styles.section}
    >
      <SectionCard>
        <FormGroup intent={Intent.PRIMARY} label='Select iTunes playlist'>
          <ControlGroup>
            <FileInput fill text={playlistCountString} onInputChange={onPlaylistChange} />
            <Button outlined minimal type='reset' onClick={onReset}>Reset</Button>
          </ControlGroup>
        </FormGroup>
      </SectionCard>
    </Section>
  )
}

function PlaylistTables ({ loading, progress, sources }) {
  const progressEl = (
    <div className={styles.progressSection}>
      {loading ? <Spinner size={SpinnerSize.SMALL} intent={Intent.NONE} /> : <Icon icon='tick' intent={Intent.SUCCESS} />}
      <Divider />
      <ProgressBar animate={loading} intent={loading ? Intent.PRIMARY : Intent.SUCCESS} value={progress} />
    </div>
  )
  return sources.map(source => (
    <Section
      key={source.id}
      icon='music'
      title={source.name}
      className={styles.section}
      rightElement={progressEl}
    >
      <SectionCard key={source.id} content={source.name} title={source.name}>
        {source.order.length} tracks
        <HTMLTable compact bordered={false} title={source.name} className={styles.table}>
          <thead>
            <tr>
              <td />
              <td>Title</td>
              <td>Release</td>
              <td>Year</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {source.order
              .filter(id => source.tracks[id])
              .map(id => source.tracks[id])
              .map((track, i) => (
                <tr key={track.id}>
                  <td>{i + 1}</td>
                  <td>{track.name}</td>
                  <td>{track.album}</td>
                  <td>{track.year}</td>
                  <td><Spinner size={SpinnerSize.SMALL} /></td>
                </tr>
              ))}
          </tbody>
        </HTMLTable>
      </SectionCard>
    </Section>
  ))
}
