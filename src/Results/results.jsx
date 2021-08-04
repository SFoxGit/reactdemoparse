import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
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
      {summaryStats.length ? summaryStats.map(data => {
        if (data.match === match || data.match === "match") {
          return (<Row>
            <Col>{data.player}</Col>
            <Col>{data.team}</Col>
            <Col>{data.powerset}</Col>
            <Col>{data.deaths}</Col>
            <Col>{data.targets}</Col>
            <Col>{data.survival}</Col>
            <Col>{data.otp}</Col>
            <Col>{data.heal}</Col>
            <Col>{data.atks}</Col>
          </Row>)
        } else {
          return (null)
        }
      }
      )
        :
        null}
    </Container>
  )
}
