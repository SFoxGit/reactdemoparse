import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Button, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import MyResponsiveBar from '../Offense/offense.timing'
import Summary from '../Summary/summary'
import SummaryStats from '../SummaryStats/summary.stats'
import SupportMain from '../Support/support.main'
// import csvToJson from 'convert-csv-to-json'

export default function Results(props) {
  const matchData = props.matchData
  const summaryStats = props.summaryStats
  const setSummaryStats = props.setSummaryStats
  const match = props.match
  const setMatch = props.setMatch
  const matches = props.matches
  const summary = props.summary
  const setSummary = props.setSummary
  const setMatches = props.setMatches;
  const { id } = useParams()
  const setMatchData = props.setMatchData;
  const [supportExtras, setSupportExtras] = useState([])

  const viewMatch = (matchID) => {
    setMatch(matchID)
    const objIndex = matchData.findIndex((obj => obj.id === matchID))
    setSummaryStats(matchData[objIndex].summary_stats)
    setSupportExtras(matchData[objIndex].support_extras)
  }

  useEffect(() => {
    const matchArr = []
    setMatch()
    axios.get(`/api/match/${id}`)
      .then(res => {
        console.log(res.data)
        res.data.forEach(x => {
          matchArr.push({ id: x.id, map: x.map })
        })
        setMatchData(res.data)
        setMatches(matchArr)
        setMatch(matchArr[0].id)
      })
      .catch(err => console.log(err))
  }, [setMatches, setMatchData, id, setMatch])

  return (
    <Container fluid>
      {matches.length ? <Row className="justify-content-between m-2">{matches.map(x => <Button key={x.id} variant="dark" onClick={() => viewMatch(x.id)}>Match: {x.map}</Button>)}</Row> : null}
      {match ?
        <Container fluid>
          <Row>
            <Col xs={8}>
              <SummaryStats
                setSummaryStats={setSummaryStats}
                summaryStats={summaryStats}
                match={match}
                matchData={matchData}
              />
            </Col>
            <Col xs={4}>
              <Summary
                summary={summary}
                match={match}
                setSummary={setSummary}
                matchData={matchData}
              />
              <SupportMain summaryStats={summaryStats} supportExtras={supportExtras} />
            </Col>
          </Row>
          <Row>
            {/* <Col xs={12} style={{"height": "400px"}}>
              <MyResponsiveBar
                summaryStats={summaryStats}
              />
            </Col> */}
          </Row>
        </Container>
        :
        null
      }
    </Container>
  )
}
