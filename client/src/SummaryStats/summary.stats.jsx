import React, { useEffect } from 'react'
import {  Table, } from 'react-bootstrap'

export default function SummaryStats(props) {
  const summaryStats = props.summaryStats
  const setSummaryStats = props.setSummaryStats
  const match = props.match
  const matchData = props.matchData

  const blueTeam = {
    color: 'cyan',
    textAlign: 'center'
  };

  const redTeam = {
    color: 'indianred',
    textAlign: 'center'
  };

  useEffect(() => {
    const objIndex = matchData.findIndex((obj => obj.id === match))
    setSummaryStats(matchData[objIndex].summary_stats)
  }, [match, matchData, setSummaryStats])

  return (
    <Table striped bordered hover variant="dark" className="sortable" key={match} style={{boxShadow: "7px 7px 5px black",  fontWeight: "bolder", fontSize: "18px", textShadow: "3px 3px 0 black",}}>
      <thead>
        <tr style={{ textAlign: 'center' }}>
          <th>player</th>
          <th>team</th>
          <th>powerset</th>
          <th>deaths</th>
          <th>targets</th>
          <th>survival</th>
          <th>otp</th>
          <th>heal</th>
          <th>atks</th>
          <th>KP</th>
          <th>Atks on Kill</th>
          <th>Atks b4 PS</th>
          <th>Atk after Kill</th>
          <th>Atks in2 PS</th>
        </tr>
      </thead>
      <tbody>
        {summaryStats.length ? summaryStats.map(data => {
          let teamStyle;
          if (data.team === "BLU") { teamStyle = blueTeam }
          if (data.team === "RED") { teamStyle = redTeam }
          return (
            <tr style={teamStyle} key={data.player}>
              <td>{data.player}</td>
              <td>{data.team}</td>
              <td>{data.powersets}</td>
              <td>{data.deaths}</td>
              <td>{data.targets}</td>
              <td>{(data.survival * 100).toFixed(2) + '%'}</td>
              <td>{data.otp > 0.01 ? (data.otp * 100).toFixed(2) + '%' : null}</td>
              <td>{data.ohp ? (data.ohp * 100).toFixed(2) + '%' : null}</td>
              <td>{data.atks}</td>
              <td>{data.kPart > 0.01 ? (data.kPart * 100).toFixed(2) + '%' : null}</td>
              <td>{data.atksOnDeath}</td>
              <td>{data.atksBeforePS}</td>
              <td>{data.atksAfterDeath}</td>
              <td>{data.atksIntoPS}</td>
            </tr>
          )

        })
          :
          null}
      </tbody>
    </Table>
  )
}
