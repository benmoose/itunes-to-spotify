import {HTMLTable, Spinner, Text, Colors} from '@blueprintjs/core'
import ItemSearchResults from './itemSearchResults'

export default ({ headerRow, tracks, trackOrder, searchResults, searchDB, onSearchResultClick }) => {
  return (
    <HTMLTable condensed striped style={{width: "100%"}}>
      <thead>
        <tr>
          <th></th>
          {headerRow.map((el, i) => <th key={`${i}-${el}`}>{el}</th>)}
          <th>Spotify</th>
        </tr>
      </thead>
      <tbody>
        {trackOrder.map((id, i) => (
          <tr key={id}>
            <td key={`${i}-${id}`} style={{color: Colors.GRAY1}}>{i+1}</td>
            {tracks[id] && tracks[id].map(el => <td key={`${id}-${el}`}><Text ellipsize>{el}</Text></td>)}
            <td>{
            isTrackFetching(searchResults[id])
              ? <Spinner size={15} />
              : <ItemSearchResults onSearchResultClick={onSearchResultClick(id)} searchResults={searchResults[id]} searchDB={searchDB} />
            }</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  )
}

function isTrackFetching(searchItem) {
  if (!searchItem) {
    return false
  }
  return !!searchItem.isFetching
}
