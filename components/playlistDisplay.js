import {HTMLTable} from '@blueprintjs/core'

export default ({ dataHeader, dataRows, rowStatus }) => {
  return (
    <HTMLTable condensed>
      <thead>
        <tr>
          {dataHeader.map((el, i) => <th key={`${i}-${el}`}>{el}</th>)}
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {dataRows.map((row, i) => (
          <tr key={i}>
            {row.map((el, i) => <td key={`${i}-${el}`}>{el}</td>)}
            {rowStatus && rowStatus[i]
              ? <td>{rowStatus[i].isFetching ? "Searching..." : "Done"}</td>
              : <td></td>
            }
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  )
}
