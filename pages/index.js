import { withRouter } from 'next/router'
import { Intent } from '@blueprintjs/core'
import {connect} from 'react-redux'
import Papa from 'papaparse'
import { sha256 } from 'js-sha256'
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

const displayHeaders = ["Name", "Artist", "Year"]

class IndexPage extends React.Component {
  render () {
    const { auth, upload, search, db, playlist, setSelectedSearchResultTrack, setPlaylistName } = this.props
    const isLoggedIn = auth.accessToken
    const rowData = upload.trackOrder.map(id => upload.tracks[id]).filter(r => !!r)
    const searchResults = upload.trackOrder.map(id => search[id]).filter(r => !!r)
    const trackWithSearchResults = searchResults.map(r => r.searchResultIDs && r.searchResultIDs.length > 0).filter(r => !!r)
    return (
      <>
        <Nav username={auth.username} onFileSelect={this.readTextFileToState} onLoginClick={this.redirectToLoginPage} />
        {rowData.length > 0
          ? <PlaylistDisplay
            onSearchResultClick={trackID => searchResultID => setSelectedSearchResultTrack(trackID, searchResultID)}
            headerRow={displayHeaders}
            trackOrder={upload.trackOrder}
            tracks={upload.tracks}
            searchResults={search}
            searchDB={db.tracks}
          />
          : (isLoggedIn && <DemoImage />)
        }
        {searchResults.length > 0
          && <CreatePlaylistFooter
            loading={playlist.isFetching}
            playlistName={playlist.playlistName}
            onPlaylistNameChange={setPlaylistName}
            itemCount={trackWithSearchResults.length}
            createPlaylistAction={this.createPlaylistFromState}
          />
        }
      </>
    )
  }

  redirectToLoginPage = () => {
    this.props.router.push("/api/login")
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
      name: playlist.playlistName || "New Playlist",
      trackURIs: spotifyURIs,
    })
      .then(() => playlist.playlistData)
      .then(data => getAppToaster().show({
        intent: Intent.SUCCESS,
        message: `Playlist '${data.name}' created!`,
        action: {
          href: data.external_urls.spotify,
          target: "_blank",
          text: <strong>Open</strong>,
        },
      }))
  }

  readTextFileToState = (event) => {
    const files = event.target.files

    if (files.length !== 1) {
      this.setError("Too many files selected")
      return
    }

    if (files[0].type && files[0].type !== "text/plain") {
      this.setError('Expected to receive a .txt file')
      return
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      this.parseCSVToState(event.target.result)
      if (!this.props.playlist.playlistName) {
        this.props.setPlaylistName(cleanNameForPlaylist(files[0].name))
      }
    });
    reader.readAsText(files[0]);
  }

  parseCSVToState = (csvString) => {
    const parseResult = Papa.parse(csvString, {delimiter: "\t"})
    if (parseResult.data.length === 0) {
      this.setError("Empty playlist")
      return
    }
    const headerRow = parseResult.data[0]
    const indices = getRowIndexes(displayHeaders, headerRow)
    const trackIDs = []
    const data = parseResult.data.slice(1).map(row => {
      const rowEmpty = !row.reduce((acc, el) => acc || !!el, false)
      if (!rowEmpty) {
        trackIDs.push(trackIDFromRow(row))
      }
      return rowEmpty ? null : indices.map(i => row[i])
    }).filter(row => row !== null)
    const dataByTrackID = data.reduce((acc, track, i) => {
      acc[trackIDs[i]] = track
      return acc
    }, {})
    this.props.setTrackOrder(trackIDs)
    this.props.setTracks(dataByTrackID)
    this.performSpotifySearchOnPlaylistData()
  }

  performSpotifySearchOnPlaylistData = () => {
    const {upload} = this.props
    if (!upload.trackOrder) {
      return
    }

    upload.trackOrder.map(tID => {
      const cleanName = cleanNameForSpotifySearch(upload.tracks[tID][0])
      const artistName = cleanNameForSpotifySearch(upload.tracks[tID][1])
      this.props.trackSearch(tID, cleanName, artistName)
    })
  }

  setError (uploadError) {
    this.setState({ uploadError, uploadData: null })
  }
}

const getRowIndexes = (headerNames, headerRow) => {
  return headerNames.reduce((acc, headerName) => {
    const rowIndex = headerRow.indexOf(headerName)
    return rowIndex === -1 ? acc : [...acc, rowIndex]
  }, [])
}

const trackIDFromRow = (row) => {
  return sha256(
    row.reduce((acc, el) => {
      return acc === "" ? el : acc + `.${el}`
    }, "")
  )
}

const cleanNameForSpotifySearch = (name) => {
  const bracketMatch = /\(([^)]+)\)/
  return name
    .replace(bracketMatch, " ")
    .replace("&", " ")
    .trim()
}

const cleanNameForPlaylist = (name) => {
  const nameTrimmed = name.trim()
  if (!nameTrimmed) {
    return ""
  }
  const split = nameTrimmed.split(".")
  if (split.length == 1) {
    return nameTrimmed
  }
  return split.slice(0,-1).join(".").trim()
}

const mapStateToProps = ({auth, search, upload, db, playlist}) => {
  return { auth, search, upload, db, playlist }
}

const mapDispatchToProps = {
  trackSearch,
  setTrackOrder,
  setTrackOrder,
  setTracks,
  setSelectedSearchResultTrack,
  createPlaylist,
  setPlaylistName,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IndexPage))
