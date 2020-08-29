import {AnchorButton, Button, PopoverPosition, Text, MenuItem} from '@blueprintjs/core'
import { Select } from "@blueprintjs/select"
import styles from './itemSearchResults.module.css'

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
    <>
      {getResultElement(selectedResult)}
      {
        searchResultIDs && searchResultIDs.length > 1
          ? (
            <Select
              minimal
              items={searchResultIDs.map(id => searchDB[id])}
              noResults={<Text>No results</Text>}
              itemRenderer={item => <SelectItem {...item} onClick={onSearchResultClick} />}
              itemPredicate={(query, item) => {
                return item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
                  || item.album.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
              }}
              filterable={searchResultIDs.length > 6}
            >
              <Button minimal={true} position={PopoverPosition.BOTTOM_RIGHT} rightIcon="chevron-down">{searchResultIDs.length} other results</Button>
            </Select>
          )
          : <Button disabled minimal={true} position={PopoverPosition.BOTTOM_RIGHT} rightIcon="chevron-down">No other results</Button>
      }

    </>
  )
}

const SelectItem = ({ id, name, album, external_urls, onClick }) => {
  return (
    <div className={styles.menuItem}>
      <img src={getSmallestAlbumImage(album.images)} style={{height: "30px", height: "30px", marginRight: "5px"}} />
      <MenuItem
        tagName="button"
        key={id}
        text={name}
        label={album.name}
        onClick={() => onClick(id)}
      />
      <AnchorButton minimal icon="link" href={external_urls["spotify"]} target="_blank" />
    </div>
  )
}

function getSmallestAlbumImage (images) {
  if (images.length === 0) {
    return null
  }
  return images.reduce((acc, item) => {
    return !acc || acc.height > item.height ? item : acc
  })["url"]
}

function getResultElement(result) {
  const hasSpotifyLink = result.external_urls && result.external_urls["spotify"]
  if (!hasSpotifyLink) {
    return <span>{result.name}</span>
  }
  return <Text ellipsize><a href={result.external_urls["spotify"]} rel="nofollow" target="_blank">{result.name}</a></Text>
}
