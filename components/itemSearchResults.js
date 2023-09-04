import { AnchorButton, Button, PopoverPosition, Text, MenuItem, Intent } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import styles from './itemSearchResults.module.css'

export default ({ searchResults, searchDB, onSearchResultClick }) => {
  if (!searchResults) {
    return null
  }

  const resultIDs = searchResults.searchResultIDs
  if (!Array.isArray(resultIDs) || resultIDs.length === 0) {
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
        resultIDs && resultIDs.length > 1
          ? (
            <Select
              activeItem={selectedResult}
              filterable={resultIDs.length > 5}
              items={resultIDs.map(id => searchDB[id])}
              itemsEqual='id'
              itemRenderer={(item, props) => <SelectItem key={item.id} {...item} {...props} />}
              itemPredicate={(query, item) => {
                return item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
                  item.album.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
              }}
              noResults={<MenuItem disabled text='No matches' />}
              onItemSelect={item => onSearchResultClick(item.id)}
            >
              <Button minimal position={PopoverPosition.BOTTOM_RIGHT} rightIcon='chevron-down'>{resultIDs.length} other tracks</Button>
            </Select>
            )
          : <Button disabled minimal position={PopoverPosition.BOTTOM_RIGHT} rightIcon='chevron-down'>No other tracks</Button>
      }
    </>
  )
}

const SelectItem = ({ id, name, album, external_urls, handleClick, modifiers }) => {
  const albumArt = getSmallestAlbumImage(album.images)

  return (
    <div className={styles.menuItem}>
      <img src={albumArt} style={{ height: '30px', width: '30px', marginRight: '5px' }} />
      <MenuItem
        key={id}
        intent={modifiers.active ? Intent.PRIMARY : Intent.NONE}
        disabled={modifiers.active}
        tagName='button'
        text={name}
        label={album.name}
        onClick={handleClick}
      />
      <AnchorButton minimal icon='link' href={external_urls.spotify} target='_blank' />
    </div>
  )
}

const getSmallestAlbumImage = images => {
  if (images?.length <= 0) {
    return null
  }

  return images.reduce((acc, item) => {
    return !acc || acc.height > item.height ? item : acc
  }).url
}

function getResultElement (result) {
  if (!result?.external_urls?.spotify) {
    return <Text ellipsize tagName='span'>{result.name}</Text>
  }

  return (
    <Text ellipsize tagName='span'>
      <a href={result.external_urls.spotify} rel='nofollow noreferrer' target='_blank'>{result.name}</a>
    </Text>
  )
}
