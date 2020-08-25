import {HTMLTable, Spinner} from '@blueprintjs/core'
import ItemSearchResults from './itemSearchResults'

export default ({ headerRow, tracks, trackOrder, searchResults, searchDB, onSearchResultClick }) => {
  return (
    <HTMLTable condensed>
      <thead>
        <tr>
          {headerRow.map((el, i) => <th key={`${i}-${el}`}>{el}</th>)}
          <th>Spotify</th>
        </tr>
      </thead>
      <tbody>
        {trackOrder.map(id => (
          <tr key={id}>
            {tracks[id].map(el => <td key={`${id}-${el}`}>{el}</td>)}
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
