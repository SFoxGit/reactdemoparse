import React from 'react'
import { Table } from 'react-bootstrap'

export default function SupportMain(props) {
  const summaryStats = props.summaryStats
  const blueTeam = {
    color: 'cyan',
    textAlign: 'center'
  };

  const redTeam = {
    color: 'indianred',
    textAlign: 'center'
  };
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr style={{ textAlign: 'center' }}>
          <th>player</th>
          <th>Heal Before Phase</th>
          <th>HO b4 Kill</th>
          <th>AP b4 Kill</th>
          <th>Heal After Death</th>
          <th>Heal After Phase</th>
        </tr>
      </thead>
      <tbody>
        {summaryStats.length ? summaryStats.map(data => {
          let teamStyle;
          if (data.team === "BLU") { teamStyle = blueTeam }
          if (data.team === "RED") { teamStyle = redTeam }
          if (data.ohp) {
            return (
              <tr style={teamStyle} key={data.player}>
                <td>{data.player}</td>
                <td>{data.ohp ? data.healsBeforePS : null}</td>
                <td>{data.ohp ? data.hoBeforeDeath : null}</td>
                <td>{data.ohp ? data.apBeforeDeath : null}</td>
                <td>{data.ohp ? data.healsAfterDeath : null}</td>
                <td>{data.ohp ? data.healsAfterPS : null}</td>
              </tr>
            )
          } else return null
        }) : null}
      </tbody>
    </Table>
  )
}
