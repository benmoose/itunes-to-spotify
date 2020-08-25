import {HTMLTable} from '@blueprintjs/core'

export default ({ headerRow, tracks }) => {
  console.log("--", headerRow, tracks)
  return (
    <HTMLTable condensed>
      <thead>
        <tr>
          {headerRow.map((el, i) => <th key={`${i}-${el}`}>{el}</th>)}
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((row, i) => (
          <tr key={i}>
            {row.map((el, i) => <td key={`${i}-${el}`}>{el}</td>)}
            <td>Searching...</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  )
}
