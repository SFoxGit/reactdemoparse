import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function SummaryStats(props) {
  const summaryStats = props.summaryStats
  const match = props.match

  return (
    <>
      {summaryStats.length ? summaryStats.map(data => {
        if (data.match === match || data.match === "match") {
          return (<Row key={data.player + "." + data.match}>
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
    </>
  )
}
