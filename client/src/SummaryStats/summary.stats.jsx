import React from 'react'
import { Table } from 'react-bootstrap'

export default function SummaryStats(props) {
  const summaryStats = props.summaryStats
  const match = props.match

  return (
    <>
      <Table striped bordered hover variant="dark" className="sortable" key={match}>
        <thead>
          <tr>
            <th>player</th>
            <th>team</th>
            <th>powerset</th>
            <th>deaths</th>
            <th>targets</th>
            <th>survival</th>
            <th>otp</th>
            <th>heal</th>
            <th>atks</th>
            <th>Atks on Kill</th>
            <th>Atks b4 PS</th>
            <th>Atk after Kill</th>
            <th>Atks in2 PS</th>
          </tr>
        </thead>
        <tbody>
          {summaryStats.length ? summaryStats.map(data => {
            if (data.match === match || data.match === "match") {
              return (
                <tr key={data.player}>
                  <td>{data.player}</td>
                  <td>{data.team}</td>
                  <td>{data.powerset}</td>
                  <td>{data.deaths}</td>
                  <td>{data.targets}</td>
                  <td>{data.survival}</td>
                  <td>{data.otp}</td>
                  <td>{data.heal}</td>
                  <td>{data.atks}</td>
                  <td>{data.atksOnDeath}</td>
                  <td>{data.atksBeforePS}</td>
                  <td>{data.atksAfterDeath}</td>
                  <td>{data.atksIntoPS}</td>
                </tr>
              )
            } else {
              return (null)
            }
          })
            :
            null}
        </tbody>
      </Table>
    </>
  )
}
