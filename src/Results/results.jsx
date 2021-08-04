import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import SummaryStats from '../SummaryStats/summary.stats'
// import csvToJson from 'convert-csv-to-json'

export default function Results(props) {
  const matchData = props.matchData
  const summaryStats = props.summaryStats
  const setSummaryStats = props.setSummaryStats
  const match = props.match
  const setMatch = props.setMatch
  const matches = props.matches

  useEffect(() => {
    console.log(matches)
  }, [matches])

  return (
    <Container fluid>

      {matches.length ? <Row>{matches.map(x => <Button onClick={() => setMatch(x)}>Match: {x}</Button>)}</Row> : null}
      <SummaryStats summaryStats={summaryStats} match={match} />
    </Container>
  )
}
