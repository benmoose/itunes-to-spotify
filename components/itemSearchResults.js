import {AnchorButton, Button, Popover, PopoverPosition} from '@blueprintjs/core'

export default ({ searchResults, searchDB, onSearchResultClick }) => {
  if (!searchResults) {
    return null
  }
  const searchResultIDs = searchResults.searchResultIDs
  if (!searchResultIDs || searchResultIDs.length === 0) {
    return <span>No results</span>
  }

  const selectedResult = searchDB[searchResults.selectedSearchResultID]
  if (!selectedResult) {
    return <span>No results</span>
  }

  return (
    <div>
      {getResultElement(selectedResult)}
      <Popover>
        <Button minimal={true} position={PopoverPosition.BOTTOM_RIGHT}>Other results</Button>
        <ul>
          {searchResultIDs.map(id => {
            const result = searchDB[id]
            const hasSpotifyURL = result.external_urls && result.external_urls["spotify"]
            if (!hasSpotifyURL) {
              return <li><p>{result.name}</p></li>
            }
            return <li><Button onClick={() => onSearchResultClick(id)} text={result.name} /></li>
          })}
        </ul>
      </Popover>
    </div>
  )
}

function getResultElement(result) {
  const hasSpotifyLink = result.external_urls && result.external_urls["spotify"]
  if (!hasSpotifyLink) {
    return <span>{result.name}</span>
  }
  return <a href={result.external_urls["spotify"]} rel="nofollow" target="_blank">{result.name}</a>
}
