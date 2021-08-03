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
    <Container>
      {matchData.map(data => <Row>{data.map(el => <Col>{el}</Col>)}</Row>)}
    </Container>
  )
}
