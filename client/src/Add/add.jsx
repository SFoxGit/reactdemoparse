import React from 'react'
import { Container } from 'react-bootstrap'
import { useHistory } from "react-router";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function Add(props) {
  const { id } = useParams()
  const history = useHistory();
  // const setMatchData = props.setMatchData;
  const setSummaryStats = props.setSummaryStats;
  const setSummary = props.setSummary;
  const setMatches = props.setMatches;
  const setSpikeLog = props.setSpikeLog;

  const formatData = async (data) => {
    await data.sort((a, b) => {
      if (a.createdAt < b.createdAt) { return -1 }
      if (a.createdAt > b.createdAt) { return 1 }
      return null
    })
    const objIndex = (data.length - 1)
    const summaryStatsArr = data[objIndex].summary_stats
    const supportExtras = data[objIndex].support_extras
    const summaryArr = []
    const matchesArr = []
    const spikeLogArr = data[objIndex].spike_log
    await summaryStatsArr.forEach(y => {
      y.atksOnDeath = 0
      y.atksBeforePS = 0
      y.atksAfterDeath = 0
      y.atksIntoPS = 0
      y.hoBeforeDeath = 0
      y.apBeforeDeath = 0
      y.healsAfterDeath = 0
      y.healsBeforePS = 0
      y.healsAfterPS = 0
      y.cms = 0
    })

    await spikeLogArr.forEach(x => {
      if (x.death !== "0") {
        const deathIndex = x.atkLog.findIndex((obj => obj.atk === "death"))
        x.atkLog.forEach(e => {
          if (x.team === e.team && e.distance > 0) {
            if (e.hitTime < (x.atkLog[deathIndex].hitTime - 0.05)) {
              if (e.atk === "heal other" || e.atk === "soothe" || e.atk === "rejuvenating circuit") {
                const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
                summaryStatsArr[playerIndex].hoBeforeDeath = summaryStatsArr[playerIndex].hoBeforeDeath + 1;
                summaryStatsArr[playerIndex].healsBeforePS = summaryStatsArr[playerIndex].healsBeforePS + 1;
              }
              if (e.atk === "absorb pain" || e.atk === "share pain" || e.atk === "insulating circuit") {
                const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
                summaryStatsArr[playerIndex].apBeforeDeath = summaryStatsArr[playerIndex].apBeforeDeath + 1;
                summaryStatsArr[playerIndex].healsBeforePS = summaryStatsArr[playerIndex].healsBeforePS + 1;
              }
            } else {
              if (e.atk === "heal other" || e.atk === "soothe" || e.atk === "rejuvenating circuit" || e.atk === "absorb pain" || e.atk === "share pain" || e.atk === "insulating circuit") {
                const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
                summaryStatsArr[playerIndex].healsAfterDeath = summaryStatsArr[playerIndex].healsAfterDeath + 1;
              }
            }
          } else if (e.hitTime < (x.atkLog[deathIndex].hitTime + 0.12) && e.distance > 0) {
            const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
            summaryStatsArr[playerIndex].atksOnDeath = (summaryStatsArr[playerIndex].atksOnDeath + 1);
            summaryStatsArr[playerIndex].atksBeforePS = (summaryStatsArr[playerIndex].atksBeforePS + 1);
          } else if (e.distance > 0) {
            const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
            summaryStatsArr[playerIndex].atksAfterDeath = (summaryStatsArr[playerIndex].atksAfterDeath + 1);
          }
        })
      } else if (x.atkLog.some(e => e.atk === "phase shift" || e.atk === "hibernate")) {
        const phaseIndex = x.atkLog.findIndex((obj => obj.atk === "phase shift" || obj.atk === "hibernate"))
        x.atkLog.forEach(e => {
          if (x.team === e.team && e.distance > 0) {
            if (e.time < (x.atkLog[phaseIndex].hitTime)) {
              if (e.atk === "heal other" || e.atk === "soothe" || e.atk === "rejuvenating circuit") {
                const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
                summaryStatsArr[playerIndex].healsBeforePS = summaryStatsArr[playerIndex].healsBeforePS + 1;
              }
              if (e.atk === "absorb pain" || e.atk === "share pain" || e.atk === "insulating circuit") {
                const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
                summaryStatsArr[playerIndex].healsBeforePS = summaryStatsArr[playerIndex].healsBeforePS + 1;
              }
            } else {
              if (e.atk === "heal other" || e.atk === "soothe" || e.atk === "rejuvenating circuit" || e.atk === "absorb pain" || e.atk === "share pain" || e.atk === "insulating circuit") {
                const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
                summaryStatsArr[playerIndex].healsAfterPS = summaryStatsArr[playerIndex].healsAfterPS + 1;
              }
            }
          } else if (e.time < (x.atkLog[phaseIndex].hitTime) && e.distance > 0) {
            const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
            summaryStatsArr[playerIndex].atksBeforePS = (summaryStatsArr[playerIndex].atksBeforePS + 1);
          } else if (e.distance > 0) {
            const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
            summaryStatsArr[playerIndex].atksIntoPS = (summaryStatsArr[playerIndex].atksIntoPS + 1);
          }
        })
      } else {
        x.atkLog.forEach(e => {
          if (x.team === e.team && e.distance > 0) {
            if (e.atk === "heal other" || e.atk === "soothe" || e.atk === "rejuvenating circuit" || e.atk === "absorb pain" || e.atk === "share pain" || e.atk === "insulating circuit") {
              const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
              summaryStatsArr[playerIndex].healsBeforePS = summaryStatsArr[playerIndex].healsBeforePS + 1;
            }
          } else if (e.distance > 0) {
            const playerIndex = summaryStatsArr.findIndex((obj => obj.player === e.caster));
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
    await supportExtras.forEach(y => {
      const playerIndex = summaryStatsArr.findIndex((obj => obj.player === y.player))
      const cmIndex = y.actions.findIndex((obj => obj.name === "clear mind"))
      summaryStatsArr[playerIndex].cms = y.actions[cmIndex].count
    })

    console.log(summaryStatsArr)

    await axios.put(`/api/match/${data[objIndex].id}`, { summaryStats: summaryStatsArr })
      .then(res => {
        console.log("updated data: " + res.data[0])
      })
      .catch(err => console.log(err))

    setMatches(matchesArr)
    setSummaryStats(summaryStatsArr)
    setSummary(summaryArr)
    setSpikeLog(spikeLogArr)
    history.push('/collections')
  }


  return (
    <Container>
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
              axios.post(`/api/parse/${id}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
                .then(res => {
                  console.log(JSON.parse(JSON.stringify(res.data)));
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

