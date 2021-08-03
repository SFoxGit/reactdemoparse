import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import csvToJson from 'convert-csv-to-json'

export default function Results(props) {
  const matchData = props.matchData
  // const [matchData, setMatchData] = useState();

  // useEffect(() => {
  //   let json = csvToJson.getJsonFromCsv("./kb7204.cohdemo.csv");
  //   setMatchData(json)
  // }, [])
  return (
    <Container fluid>
      {/* {matchData.map(data => <Row>{data.map(el => <Col>{el}</Col>)}</Row>)} */}
      {matchData.map(data => <Row>{data[2] === "summary_stats" ?
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
      </Row>)}
    </Container>
  )
}
