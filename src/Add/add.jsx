import React from 'react'
import { Container } from 'react-bootstrap'
import { readString } from 'react-papaparse';
import { useHistory } from "react-router";

export default function Add(props) {
  const history = useHistory();
  const setMatchData = props.setMatchData;
  const setSummaryStats = props.setSummaryStats;
  const setSummary = props.setSummary;
  const setMatches = props.setMatches;

  const formatData = (data) => {
    const summaryStatsArr = [{ match: "match", player: "player", team: "team", powerset: "powerset", deaths: "deaths", targets: "targets", survival: "survival", otp: "otp", heal: "heal", atks: "atks" }]
    const summaryArr = []
    const matchesArr = []
    data.forEach(row => {
      if (row[2] === "summary_stats") {
        summaryStatsArr.push({
          match: row[0],
          player: row[3],
          team: row[4],
          powerset: row[8],
          deaths: row[14],
          targets: row[15],
          survival: (row[16] * 100).toFixed(2) + '%',
          otp: (row[17] * 100).toFixed(2) + '%',
          heal: (row[18] * 100).toFixed(2) + '%',
          atks: row[19]
        })
      }
      if (row[2] === "summary") {
        if (!(matchesArr.includes(row[0]))) {
          matchesArr.push(row[0])
        }
        summaryArr.push({
          match: row[0],
          title: row[8],
          blue: row[14],
          red: row[15]
        })
      }
    })
    setMatches(matchesArr)
    setSummaryStats(summaryStatsArr)
    setSummary(summaryArr)
    history.push('/results')
  }


  return (
    <Container>
      {/* <Form ref={myForm}>
        <input type="file" ref={csvFile} accept=".csv" />
        <Button onClick={(e) => submit(e)} type="submit" value="Submit" />
      </Form> */}

      <div className="App">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => {
            const files = e.target.files;
            console.log(files);
            if (files) {
              console.log(files[0]);
              readString(files[0], {
                complete: function (results) {
                  setMatchData(results.data);
                  formatData(results.data);
                }
              }
              )
            }
          }}
        />
      </div>


    </Container>
  )
}

