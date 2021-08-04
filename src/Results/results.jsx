import React, {useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import csvToJson from 'convert-csv-to-json'

export default function Results(props) {
  const matchData = props.matchData
  const summaryStats = props.summaryStats
  const setSummaryStats = props.setSummaryStats
  // const [matchData, setMatchData] = useState();
  
  // useEffect(() => {
  //   const arr = [{player: "player", team: "team", powerset: "powerset", deaths: "deaths", targets: "targets", survival: "survival", otp: "otp", heal: "heal", atks: "atks"}]
  //   matchData.forEach(data => {
  //     if (data[2] === "summary_stats") {
  //       arr.push({
  //         player: data[3],
  //         team: data[4],
  //         powerset: data[8],
  //         deaths: data[14],
  //         targets: data[15],
  //         survival: (data[16] * 100).toFixed(2) + '%',
  //         otp: (data[17] * 100).toFixed(2) + '%',
  //         heal: (data[18] * 100).toFixed(2) + '%',
  //         atks: data[19]
  //       })}
  //   })
  //   setSummaryStats(arr)
  // }, [matchData, setSummaryStats])
  
  return (
    <Container fluid>
      {/* {matchData.map(data => <Row>{data.map(el => <Col>{el}</Col>)}</Row>)} */}
      {/* {matchData.map(data => <Row>{data[2] === "summary_stats" ?
        <>
          <Col xs={2}>{data[3]}</Col>
          <Col xs={1}>{data[4]}</Col>
          <Col xs={1}>{data[8]}</Col>
          <Col xs={1}>{data[14]}</Col>
          <Col xs={1}>{data[15]}</Col>
          <Col xs={1}>{(data[16] * 100).toFixed(2) + '%'}</Col>
          <Col xs={1}>{(data[17] * 100).toFixed(2) + '%'}</Col>
          <Col xs={1}>{(data[18] * 100).toFixed(2) + '%'}</Col>
          <Col xs={1}>{data[19]}</Col>
        </>
        :
        null
      }
      </Row>)} */}
      {summaryStats.length ? summaryStats.map(data => <Row>
        <Col>{data.player}</Col>
        <Col>{data.team}</Col>
        <Col>{data.powerset}</Col>
        <Col>{data.deaths}</Col>
        <Col>{data.targets}</Col>
        <Col>{data.survival}</Col>
        <Col>{data.otp}</Col>
        <Col>{data.heal}</Col>
        <Col>{data.atks}</Col>
      </Row>) : null}
    </Container>
  )
}
