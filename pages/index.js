import {connect} from 'react-redux'
import Papa from 'papaparse'
import Nav from '../components/nav'
import PlaylistDisplay from '../components/playlistDisplay'

const displayHeaders = ["Name", "Artist", "Year", "Time"]

class IndexPage extends React.Component {
  state = {
    uploadText: "",
    uploadData: null,
    uploadError: null,
    spotifySearchStatus: null,
  }

  render () {
    const { auth } = this.props
    const {uploadData, spotifySearchStatus} = this.state
    return (
      <>
        <Nav username={auth.username} onInputChange={this.readTextFileToState} />
        {this.state.uploadData && this.state.uploadData.length > 0
          ? <PlaylistDisplay dataHeader={uploadData[0]} dataRows={uploadData.slice(1)} rowStatus={spotifySearchStatus} />
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
    const data = parseResult.data.map(row => {
      const rowEmpty = !row.reduce((acc, el) => acc || !!el, false)
      return rowEmpty ? null : indices.map(i => row[i])
    }).filter(row => row !== null)
    this.setState({uploadData: data, uploadError: null}, this.performSpotifySearchOnPLaylistData)
  }

  performSpotifySearchOnPLaylistData = () => {
    if (!this.state.uploadData) {
      return
    }
    const spotifySearchStatus = this.state.uploadData.map(row => ({isFetching: true}))
    this.setState({ spotifySearchStatus })
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

export default connect(mapStateToProps)(IndexPage)
