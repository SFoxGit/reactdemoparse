import React, { useEffect } from 'react'
import { Col, Row, Table } from 'react-bootstrap'

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
        <tr style={{ textAlign: 'center' }}>
          <th></th>
          <th>Blue</th>
          <th>Red</th>
        </tr>
      </thead>
      <tbody>
        {summary.length ? summary.map(data => {
          let redStyle;
          let blueStyle;
          if (data.blue > data.red) {
            blueStyle = {color: 'cyan', border: '2px dotted gold'}
            redStyle = {color: 'indianred'}
          } else if (data.blue < data.red) {
            blueStyle = {color: 'cyan'}
            redStyle = {color: 'indianred',  border: '2px dotted gold' }
          } else {
            blueStyle = {color: 'cyan'}
            redStyle = {color: 'indianred'}
          }
          return (
            <tr key={data.title} style={{ textAlign: 'center' }}>
              <td>{data.title}</td>
              <td><div style={blueStyle}>{data.blue}</div></td>
              <td><div style={redStyle}>{data.red}</div></td>
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
