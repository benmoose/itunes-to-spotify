import { Intent } from '@blueprintjs/core'
import { sha256 } from 'js-sha256'
import { withRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import Papa from 'papaparse'

import { getAppToaster } from '../components/appToaster'
import Nav from '../components/nav'
import DemoImage from '../components/demoImage'
import PlaylistDisplay from '../components/playlistDisplay'
import CreatePlaylistFooter from '../components/createPlaylistFooter'
import { trackSearch, setSelectedSearchResultTrack } from '../actions/searchActions'
import { createPlaylist, setPlaylistName } from '../actions/playlistActions'
import {
  setTrackOrder,
  setTracks
} from '../actions/uploadActions'

class IndexPage extends React.Component {
  render () {
    const { auth, upload, search, db, playlist, setSelectedSearchResultTrack, setPlaylistName } = this.props
    const isLoggedIn = auth.accessToken
    const rowData = upload.trackOrder.map(id => upload.tracks[id])
    const searchResults = upload.trackOrder.map(id => search[id])
    const trackWithSearchResults = searchResults.map(r => r.searchResultIDs && r.searchResultIDs.length > 0).filter(r => !!r)

    return [
      <Nav username={auth.username} onFileSelect={this.readTextFileToState} onLoginClick={this.redirectToLoginPage} />,
      rowData.length > 0
        ? <PlaylistDisplay
            onSearchResultClick={trackID => searchResultID => setSelectedSearchResultTrack(trackID, searchResultID)}
            trackOrder={upload.trackOrder}
            tracks={upload.tracks}
            searchResults={search}
            searchDB={db.tracks}
          />
        : (isLoggedIn && <DemoImage />),
      searchResults.length > 0 &&
        <CreatePlaylistFooter
          loading={playlist.isFetching}
          playlistName={playlist.playlistName}
          onPlaylistNameChange={setPlaylistName}
          itemCount={trackWithSearchResults.length}
          createPlaylistAction={this.createPlaylistFromState}
        />
    ]
  }

  redirectToLoginPage = () => {
    this.props.router.push('/api/login')
  }

  createPlaylistFromState = () => {
    const { upload, search, db, playlist, createPlaylist } = this.props
    const uploadedTrackIDs = upload.trackOrder
    const spotifySelectedTrackIDs = uploadedTrackIDs.map(id => search[id] && search[id].selectedSearchResultID).filter(r => !!r)
    const spotifyURIs = spotifySelectedTrackIDs.map(spotifyID => db.tracks[spotifyID] && db.tracks[spotifyID].uri).filter(r => !!r)
    if (spotifyURIs.length === 0) {
      return
    }
    return createPlaylist({
      name: playlist.playlistName || 'New Playlist',
      trackURIs: spotifyURIs
    })
      .then(data => getAppToaster().show({
        intent: Intent.SUCCESS,
        message: <>Your Spotify playlist <strong>{data.name}</strong> has been created!</>,
        action: {
          href: data.external_urls.spotify,
          target: '_blank',
          text: <strong>Open</strong>
        }
      }))
  }

  readTextFileToState = (event) => {
    const files = event.target.files

    if (files.length !== 1) {
      this.setError('Too many files selected')
      return
    }

    if (files[0].type && files[0].type !== 'text/plain') {
      this.setError('Expected to receive a .txt file')
      return
    }

    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      this.parseCSVToState(event.target.result)
      if (!this.props.playlist.playlistName) {
        this.props.setPlaylistName(cleanNameForPlaylist(files[0].name))
      }
    })
    reader.readAsText(files[0])
  }

  parseCSVToState = (csvString) => {
    const result = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true
    })

    console.log('result', result)

    if (!result?.data || result.data.length === 0) {
      this.setError('Empty playlist')
      return
    }

    const trackIDs = result.data.map(hashRow)
    const dataByTrackID = result.data.reduce((acc, track, i) => {
      acc[trackIDs[i]] = Object.create({ ...track, i })
      return acc
    }, {})

    this.props.setTracks(dataByTrackID)
    this.props.setTrackOrder(trackIDs)
    this.performSpotifySearchOnPlaylistData()
  }

  performSpotifySearchOnPlaylistData = () => {
    const { upload } = this.props

    upload.trackOrder.forEach(trackID => {
      const cleanName = cleanNameForSpotifySearch(upload.tracks[trackID].Name)
      const artistName = cleanNameForSpotifySearch(upload.tracks[trackID].Artist)
      this.props.trackSearch(trackID, cleanName, artistName)
    })
  }

  setError (uploadError) {
    this.setState({ uploadError, uploadData: null })
  }
}

const hashRow = (row) => {
  return sha256(row.values.join('.'))
}

const cleanNameForSpotifySearch = (name) => {
  const bracketMatch = /\(([^)]+)\)/
  return name
    .replace(bracketMatch, ' ')
    .replace('&', ' ')
    .trim()
}

const cleanNameForPlaylist = (name) => {
  const nameTrimmed = name.trim()
  if (!nameTrimmed) {
    return ''
  }
  const split = nameTrimmed.split('.')
  if (split.length === 1) {
    return nameTrimmed
  }
  return split.slice(0, -1).join('.').trim()
}

const mapStateToProps = ({ auth, search, upload, db, playlist }) => {
  return { auth, search, upload, db, playlist }
}

const mapDispatchToProps = {
  trackSearch,
  setTrackOrder,
  setTracks,
  setSelectedSearchResultTrack,
  createPlaylist,
  setPlaylistName
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IndexPage))
