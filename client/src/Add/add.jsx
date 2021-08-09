import React from 'react'
import { Container } from 'react-bootstrap'
import { readString } from 'react-papaparse';
import { useHistory } from "react-router";
import axios from "axios";

export default function Add(props) {
  const history = useHistory();
  const setMatchData = props.setMatchData;
  const setSummaryStats = props.setSummaryStats;
  const setSummary = props.setSummary;
  const setMatches = props.setMatches;
  const setSpikeLog = props.setSpikeLog;

  const formatData = async (data) => {
    const summaryStatsArr = []
    const summaryArr = []
    const matchesArr = []
    const spikeLogArr = []

    await data.forEach(row => {
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
          atks: row[19],
          atksOnDeath: 0,
          atksBeforePS: 0,
          atksAfterDeath: 0,
          atksIntoPS: 0
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
      if (row[2] === "spike_log") {
        if (spikeLogArr.some(e => e.id === row[13] && e.match === row[0])) {
          const objectIndex = spikeLogArr.findIndex((obj => obj.id === row[13] && obj.match === row[0]))
          spikeLogArr[objectIndex].actions.push({
            time: row[5],
            player: row[9],
            action: row[8],
            playerTeam: row[10],
            distance: row[14],
            hitTime: row[15]
          })
        } else {
          spikeLogArr.push({
            match: row[0],
            id: row[13],
            target: row[3],
            team: row[4],
            actions: [{
              time: row[5],
              player: row[9],
              action: row[8],
              playerTeam: row[10],
              distance: row[14],
              hitTime: row[15]
            }]
          })
        }
      }
    })
    await spikeLogArr.forEach(x => {
      if (x.actions.some(e => e.action === "death")) {
        const deathIndex = x.actions.findIndex((obj => obj.action === "death"))
        x.actions.forEach(e => {
          if (e.hitTime < (x.actions[deathIndex].hitTime + 0.12) && e.distance > 0) {
            const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.player && obj.match === x.match));
            summaryStatsArr[playerIndex].atksOnDeath = (summaryStatsArr[playerIndex].atksOnDeath + 1);
            summaryStatsArr[playerIndex].atksBeforePS = (summaryStatsArr[playerIndex].atksBeforePS + 1);
          } else if (e.distance > 0) {
            const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.player && obj.match === x.match));
            summaryStatsArr[playerIndex].atksAfterDeath = (summaryStatsArr[playerIndex].atksAfterDeath + 1);
          }
        })
      } else if (x.actions.some(e => e.action === "phase shift" || e.action === "hibernate")) {
        const phaseIndex = x.actions.findIndex((obj => obj.action === "phase shift" || obj.action === "hibernate"))
        x.actions.forEach(e => {
          if (e.time < (x.actions[phaseIndex].hitTime + 0.12) && e.distance > 0) {
            const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.player && obj.match === x.match));
            summaryStatsArr[playerIndex].atksBeforePS = (summaryStatsArr[playerIndex].atksBeforePS + 1);
          } else if (e.distance > 0) {
            const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.player && obj.match === x.match));
            summaryStatsArr[playerIndex].atksIntoPS = (summaryStatsArr[playerIndex].atksIntoPS + 1);
          }
        })
      } else {
        x.actions.forEach(e => {
          if (e.distance > 0) {
            const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.player && obj.match === x.match));
            summaryStatsArr[playerIndex].atksBeforePS = (summaryStatsArr[playerIndex].atksBeforePS + 1);
          }
        })
      }
    })
    summaryStatsArr.sort((a, b) => {
      if (a.otp < b.otp) {
        return 1
      }
      if (a.otp > b.otp) {
        return -1
      }
      return null
    })
    summaryStatsArr.sort((a, b) => {
      if (a.team < b.team) {
        return -1
      }
      if (a.team > b.team) {
        return 1
      }
      return null
    })
    setMatches(matchesArr)
    setSummaryStats(summaryStatsArr)
    setSummary(summaryArr)
    setSpikeLog(spikeLogArr)
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
          accept=".cohdemo"
          onChange={(e) => {
            const files = e.target.files;
            const formData = new FormData();
            console.log(files);
            if (files) {
              formData.append("file", files[0])
              console.log(files[0]);
              axios.post('/api/parse', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
                .then(res => {
                  console.log(res.data);
                  formatData(res.data)
                })
                .catch(err => console.log(err))
            }
          }}

        // readString(files[0], {
        //   complete: function (results) {
        //     setMatchData(results.data);
        //     formatData(results.data);
        //   }
        // }
        // )
        />
      </div>
    </Container>
  )
}

