import axios from 'axios'
import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
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
  const { id } = useParams()

  useEffect(() => {
    axios.get(`/api/collection/${id}`)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }, [id])

  return (
    <Container fluid>

      {matches.length ? <Row className="justify-content-between m-2">{matches.map(x => <Button key={x} variant="dark" onClick={() => setMatch(x)}>Match: {x}</Button>)}</Row> : null}
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
