import {connect} from 'react-redux'
import Papa from 'papaparse'
import { sha256 } from 'js-sha256'
import Nav from '../components/nav'
// import PlaylistDisplay from '../components/playlistDisplay'
import { trackSearch } from '../actions/searchActions'

const displayHeaders = ["Name", "Artist", "Year", "Time"]

class IndexPage extends React.Component {
  state = {
    uploadText: "",
    uploadData: null,
    uploadTrackIDs: null,
    uploadError: null,
    spotifySearchStatus: null,
  }

  render () {
    const { auth } = this.props
    const {uploadData, uploadTrackIDs, spotifySearchStatus} = this.state
    return (
      <>
        <Nav username={auth.username} onInputChange={this.readTextFileToState} />
        {this.state.uploadData && this.state.uploadData.length > 0
          // ? <PlaylistDisplay headerRow={uploadData[uploadTrackIDs[0]]} trackIDs={uploadTrackIDs.slice(1)} tracks={uploadData} rowStatus={spotifySearchStatus} />
          ? <p>:)</p>
          : <p>Upload a file</p>
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
      const uploadText = event.target.result
      this.setState({
        uploadText: uploadText,
        uploadError: null,
      }, () => this.parseCSVToState(this.state.uploadText))
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
    const data = parseResult.data.map(row => {
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
    this.setState({
      uploadData: dataByTrackID,
      uploadError: null,
      uploadTrackIDs: trackIDs,
    }, this.performSpotifySearchOnPLaylistData)
  }

  performSpotifySearchOnPLaylistData = () => {
    const {uploadData, uploadTrackIDs} = this.state
    if (!uploadData) {
      return
    }

    uploadTrackIDs.map((tID) => {
      const row = uploadData[tID]
      const trackID = trackIDFromRow(row)
      this.props.trackSearch(trackID, `${row[0]} ${row[1]}`)
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

const mapStateToProps = ({auth}) => {
  return { auth }
}

const trackIDFromRow = (row) => {
  return sha256(
    row.reduce((acc, el) => {
      return acc === "" ? el : acc + `.${el}`
    }, "")
  )
}

const mapDispatchToProps = { trackSearch }

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
