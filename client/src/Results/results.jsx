import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Summary from '../Summary/summary'
import SummaryStats from '../SummaryStats/summary.stats'
// import csvToJson from 'convert-csv-to-json'

export default function Results(props) {
  const matchData = props.matchData
  const summaryStats = props.summaryStats
  const setSummaryStats = props.setSummaryStats
  const match = props.match
  const setMatch = props.setMatch
  const matches = props.matches
  const summary = props.summary
  const spikeLog = props.spikeLog

  // useEffect(() => {
  //   console.log(spikeLog)
  // }, [spikeLog])

  return (
    <Container fluid>

      {matches.length ? <Row className="justify-content-between m-2">{matches.map(x => <Button variant="dark" onClick={() => setMatch(x)}>Match: {x}</Button>)}</Row> : null}
      <SummaryStats 
      summaryStats={summaryStats} 
      match={match} 
      />
      <Summary 
      summary={summary} 
      match={match}
      />
    </Container>
  )
}
