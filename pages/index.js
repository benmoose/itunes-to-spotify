import {connect} from 'react-redux'
import Papa from 'papaparse'
import { sha256 } from 'js-sha256'
import Nav from '../components/nav'
import PlaylistDisplay from '../components/playlistDisplay'
import { trackSearch } from '../actions/searchActions'
import {
  setTrackOrder,
  setTracks
} from '../actions/uploadActions'

const displayHeaders = ["Name", "Artist", "Year", "Time"]

class IndexPage extends React.Component {
  render () {
    const { auth, upload } = this.props
    const rowData = upload.trackOrder.map(id => upload.tracks[id])
    const hasRowData = rowData.filter(r => !!r).length > 0
    return (
      <>
        <Nav username={auth.username} onInputChange={this.readTextFileToState} />
        {hasRowData
          && <PlaylistDisplay
            headerRow={displayHeaders}
            tracks={upload.trackOrder.map(id => upload.tracks[id])}
          />
        }
      </>
    )
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

    upload.trackOrder.map(tID => this.props.trackSearch(tID, `${upload.tracks[tID][0]} ${upload.tracks[tID][1]}`))
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

const mapStateToProps = ({auth, search, upload}) => {
  return { auth, search, upload }
}

const mapDispatchToProps = { trackSearch, setTrackOrder, setTrackOrder, setTracks }

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
