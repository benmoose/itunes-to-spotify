import { HTMLTable, Spinner, Text, Colors } from '@blueprintjs/core'
import ItemSearchResults from './itemSearchResults'

export default ({ tracks, trackOrder, searchResults, searchDB, onSearchResultClick }) => {
  return (
    <HTMLTable condensed striped style={{ width: '100%' }}>
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Artist</th>
          <th>Year</th>
          <th>Spotify</th>
        </tr>
      </thead>
      <tbody>
        {
          trackOrder.map((id, i) => {
            const { Name, Artist, Year } = tracks[id]

            return (
              <tr key={`${id}-${Name}`}>
                <td style={{ color: Colors.GRAY1 }}>{i + 1}</td>
                <td><Text ellipsize>{Name}</Text></td>
                <td><Text ellipsize>{Artist}</Text></td>
                <td><Text ellipsize>{Year}</Text></td>
                <td>
                  {
                    searchResults[id]?.isFetching
                      ? <Spinner size={15}/>
                      : <ItemSearchResults
                        onSearchResultClick={onSearchResultClick(id)}
                        searchResults={searchResults[id]}
                        searchDB={searchDB}
                      />
                  }
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </HTMLTable>
  )
}
