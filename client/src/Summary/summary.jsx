import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'

export default function Summary(props) {
  const summary = props.summary
  const setSummary = props.setSummary
  const match = props.match
  const matchData = props.matchData

  useEffect(() => {
    const objIndex = matchData.findIndex((obj => obj.id === match))
    setSummary(matchData[objIndex].summary)
  }, [setSummary, match, matchData])
  return (
    <Table striped bordered hover variant="dark" className="sortable">
      <thead>
        <tr>
          <th></th>
          <th>Blue</th>
          <th>Red</th>
        </tr>
      </thead>
      <tbody>
        {summary.length ? summary.map(data => {
          
            return (
              <tr key={data.title}>
                <td>{data.title}</td>
                <td>{data.blue}</td>
                <td>{data.red}</td>
              </tr>
            )
          
        }
        )
          :
          null
        }
      </tbody>
    </Table>
  )
}
