import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'

export default function Summary(props) {
  const summary = props.summary
  const setSummary = props.setSummary
  const match = props.match
  const matchData = props.matchData

  const title = {
    textShadow: "4px 4px 0 black",
    fontWeight: "bolder",
    fontSize: "24px",
  }

  useEffect(() => {
    const objIndex = matchData.findIndex((obj => obj.id === match));
    setSummary(matchData[objIndex].summary)
  }, [setSummary, match, matchData])
  return (
    <Table striped bordered hover variant="dark" className="sortable" style={{boxShadow: "7px 7px 5px black"}}>
      <thead>
        <tr style={{ textAlign: 'center', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black", }}>
          <th></th>
          <th>Blue</th>
          <th>Red</th>
        </tr>
      </thead>
      <tbody>
        {summary.length ? summary.map(data => {
          let redStyle;
          let blueStyle;
          if (parseFloat(data.blue) > parseFloat(data.red)) {
            blueStyle = {color: 'cyan', border: '2px dotted gold', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black",}
            redStyle = {color: 'indianred', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black",}
          } else if (data.blue < data.red) {
            blueStyle = {color: 'cyan', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black",}
            redStyle = {color: 'indianred',  border: '2px dotted gold', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black", }
          } else {
            blueStyle = {color: 'cyan', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black",}
            redStyle = {color: 'indianred', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black",}
          }
          return (
            <tr key={data.title} style={{ textAlign: 'center' }}>
              <td style={title}>{data.title}</td>
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
