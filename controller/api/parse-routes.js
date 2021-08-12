const router = require('express').Router();
// const { spawn } = require('child_process');
const spawn = require('await-spawn')
const pythonDir = ("C:/Users/16073/Desktop/Code/reactdemoparse/parsedemo.py")
const fs = require('fs')
const { Match } = require("../../models");


router.post("/:id", async (req, res) => {
  console.log(pythonDir)
  try {
    const newpath = "C:/Users/16073/Desktop/Code/reactdemoparse/"
    const file = req.files.file
    const filename = file.name

    let map;
    
    const gathers = []
    const greens_log = []
    const hp_log = []
    const log = []
    const rogue_log = []
    const score_log = []
    const spike_hp = []
    const spike_log = []
    const spike_stats = []
    const spike_summary = []
    const summary = []
    const summary_stats = []
    const support_breakdown = []
    const support_extras = []
    const support_powers = []
    const support_stats = [];

    await file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
    });
    await spawn('python', [pythonDir, `${newpath}${filename}`]);
    const csvArray = await fs.readFileSync(`${newpath}${filename}.csv`)
      .toString()
      .split('\n')
      .map(e => e.trim())
      .map(e => e.split(',').map(e => e.trim()));
    const processCSV = new Promise((resolve, reject) => {
      csvArray.forEach(row => {
        switch (row[2]) {
          case "atk_chains":
            if (summary_stats.some(e => e.player === row[3])) {
              const objIndex = summary_stats.findIndex((obj => obj.player === row[3]))
              summary_stats[objIndex].chains.push({ atks: row[8], count: row[12] })
            } else {
              summary_stats.push({ player: row[3], team: row[4], chains: [{ atks: row[8], count: row[12] }] })
            }
            break;
          case "defence_stats":
            if (summary_stats.some(e => e.player === row[3])) {
              const objIndex = summary_stats.findIndex((obj => obj.player === row[3]))
              summary_stats[objIndex].spikeDam = row[16]
              summary_stats[objIndex].healsOnSpike = row[17]
              summary_stats[objIndex].healsTaken = row[18]
              summary_stats[objIndex].avgJaunt = row[24]
              summary_stats[objIndex].avgPhase = row[25]
              summary_stats[objIndex].avgDeath = row[26]
            } else {
              summary_stats.push({ player: row[3], team: row[4], deaths: row[14], targets: row[15], spikeDam: row[16], healsOnSpike: row[17], healsTaken: row[18], avgJaunt: row[24], avgPhase: row[25], avgDeath: row[26] })

            }
            break;
          case "gathers":
            gathers.push({ team: row[4], time: row[5] })
            break;
          case "greens_log":
            if (greens_log.some(e => e.player === row[3])) {
              const objIndex = greens_log.findIndex((obj => obj.player === row[3]))
              greens_log[objIndex].greens.push({ time: row[5], count: row[14] })
            } else {
              greens_log.push({ player: row[3], greens: [{ time: row[5], count: row[14] }] })
            }
            break;
          case "hp_log":
            if (hp_log.some(e => e.player === row[3])) {
              const objIndex = hp_log.findIndex((obj => obj.player === row[3]))
              hp_log[objIndex].damage.push({ time: row[5], count: row[14] })
            } else {
              hp_log.push({ player: row[3], damage: [{ time: row[5], count: row[14] }] })
            }
            break;
          case "log":
            log.push(row)
            break;
          case "offence_stats":
            if (summary_stats.some(e => e.player === row[3])) {
              const objIndex = summary_stats.findIndex((obj => obj.player === row[3]));
              summary_stats[objIndex].targetsOn = row[16]
              summary_stats[objIndex].otp = row[17]
              summary_stats[objIndex].timing = row[18]
              summary_stats[objIndex].variance = row[27]
              summary_stats[objIndex].kPart = row[26]
              summary_stats[objIndex].atksOn = row[23]
              summary_stats[objIndex].atksOff = row[24]
            } else {
              summary_stats.push({ player: row[3], team: row[4], deaths: row[14], targeted: row[15], targetsOn: row[16], otp: row[17], timing: row[18], variance: row[27], kPart: row[26], atksOn: row[23], atksOff: row[24] })
            }
            break;
          case "offence_timing":
            if (summary_stats.some(e => e.player === row[3])) {
              const objIndex = summary_stats.findIndex((obj => obj.player === row[3]));
              summary_stats[objIndex].offTiming = { early: row[14], one: row[15], two: row[16], three: row[17], four: row[18], five: row[19], six: row[20] }
            } else {
              summary_stats.push({ player: row[3], team: row[4], offTiming: {blast: row[8], early: row[14], one: row[15], two: row[16], three: row[17], four: row[18], five: row[19], six: row[20] }})
            }
            break;
          case "rogue_log":
            rogue_log.push({ player: row[3], team: row[4], time: row[5], action: row[8], target: row[9], targetTeam: row[10] })
            break;
          case "score_log":
            if (score_log.some(e => e.time === row[5])) {
              const objIndex = score_log.findIndex((obj => obj.time === row[5]))
              if (row[4] === 'RED') {
                score_log[objIndex].red = row[7]
              } else {
                score_log[objIndex].blue = row[7]
              }
            } else {
              if (row[4] === 'RED') {
                score_log.push({ time: row[5], blue: 0, red: row[7] })
              } else {
                score_log.push({ time: row[5], blue: row[7], red: 0 })
              }
            }
            break;
          case "spike_hp":
            if (spike_hp.some(e => e.id === row[13])) {
              const objIndex = spike_hp.findIndex((obj => obj.id === row[13]))
              spike_hp[objIndex].hpLog.push({ time: row[5], hp: row[6] })
            } else {
              spike_hp.push({ player: row[3], id: row[13], team: row[4], death: row[7], hpLog: [{ time: row[5], hp: row[6] }] })
            }
            break;
          case "spike_log":
            if (spike_log.some(e => e.id === row[13])) {
              const objIndex = spike_log.findIndex((obj => obj.id === row[13]))
              spike_log[objIndex].atkLog.push({ time: row[5], atk: row[8], caster: row[9], team: row[10], distance: row[14], hitTime: row[15] })
            } else {
              spike_log.push({ player: row[3], id: row[13], team: row[4], death: row[7], atkLog: [{ time: row[5], atk: row[8], caster: row[9], team: row[10], distance: row[14], hitTime: row[15] }] })
            }
            break;
          case "spike_stats":
            if (spike_stats.some(e => e.id === row[13])) {
              const objIndex = spike_stats.findIndex((obj => obj.id === row[13]))
              if (row[8] === "attacks") { spike_stats[objIndex].attacks = row[12] }
              if (row[8] === "heals received") { spike_stats[objIndex].heals = row[12] }
              if (row[8] === "greens available") { spike_stats[objIndex].greensAvailable = row[12] }
              if (row[8] === "greens used") { spike_stats[objIndex].greensUsed = row[12] }
              if (row[8] === "spike duration") { spike_stats[objIndex].duration = row[12] }
              if (row[8] === "total hp lost") { spike_stats[objIndex].hpLost = row[12] }
              if (row[8] === "hp after spike") { spike_stats[objIndex].hpAfter = row[12] }
            } else {
              spike_stats.push({ player: row[3], id: row[13], team: row[4], death: row[7], attackers: row[12], attacks: '', heals: '', greensAvailable: '', greensUsed: '', duration: '', hpLost: '', hpAfter: '' })
            }
            break;
          case "spike_summary":
            spike_summary.push({ player: row[3], team: row[4], start: row[5], duration: row[6], death: row[7], attacks: row[11], attackers: row[12], id: row[13], hpLost: row[14], greensAvailable: row[15], greensUsed: row[16], hitWindow: row[17], spikeToSpike: row[18], healsReceived: row[19] })
            break;
          case "summary":
            map = row[1]
            summary.push({ title: row[8], blue: row[14], red: row[15] })
            break;
          case "summary_stats":
            if (summary_stats.some(e => e.player === row[3])) {
              const objIndex = summary_stats.findIndex((obj => obj.player === row[3]));
              summary_stats[objIndex].powersets = row[8]
              summary_stats[objIndex].deaths = row[14]
              summary_stats[objIndex].targets = row[15]
              summary_stats[objIndex].survival = row[16]
              summary_stats[objIndex].otp = row[17]
              summary_stats[objIndex].ohp = row[18] 
              summary_stats[objIndex].atks = row[19]
            } else {
              summary_stats.push({ player: row[3], team: row[4], powersets: row[8], deaths: row[14], targets: row[15], survival: row[16], otp: row[17], ohp: row[18] , atks: row[19]})
            }
            break;
          case "support_breakdown":
            support_breakdown.push({ player: row[3], team: row[4], type: row[8], zero: row[14], oneHundred: row[15], belowSeventeen: row[16], fourHundred: row[17], eightHundred: row[18], twelveHundred: row[19], fifteenHundred: row[20], twoHundred: row[21], aboveSeventeen: row[22], late: row[23], lateFast: row[24] })
            break;
          case "support_extras":
            if (support_extras.some(e => e.player === row[3])) {
              const objIndex = support_extras.findIndex((obj => obj.player === row[3]))
              support_extras[objIndex].actions.push({ name: row[9], count: row[14] })
            } else {
              support_extras.push({ player: row[3], team: row[4], actions: [{ name: row[9], count: row[14] }] })
            }
            break;
          case "support_powers":
            support_powers.push({ player: row[3], team: row[4], ap: row[14], ho: row[15] })
            break;
          case "support_stats":
            support_stats.push({ player: row[3], team: row[4], heals: row[6], deaths: row[7], targeted: row[11], onTarget: row[14], quick: row[15], slow: row[17], late: row[18], early: row[19], ff: row[22], avgSpeed: row[24], timing: row[25], median: row[30] })
            break;
        }
      });
      // spike_log.forEach(x => {
      //   if (x.death === 1) {
      //     const deathIndex = x.atkLog.findIndex((obj => obj.atk === "death"))
      //     x.atkLog.forEach(e => {
      //       if (e.hitTime < (x.atkLog[deathIndex].hitTime + 0.12) && e.distance > 0) {
      //         const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
      //         summary_stats[playerIndex].atksOnDeath = (summary_stats[playerIndex].atksOnDeath + 1);
      //         summary_stats[playerIndex].atksBeforePS = (summary_stats[playerIndex].atksBeforePS + 1);
      //       } else if (e.distance > 0) {
      //         const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
      //         summary_stats[playerIndex].atksAfterDeath = (summary_stats[playerIndex].atksAfterDeath + 1);
      //       }
      //     })
      //   } else if (x.atkLog.some(e => e.atk === "phase shift" || e.atk === "hibernate")) {
      //     const phaseIndex = x.atkLog.findIndex((obj => obj.atk === "phase shift" || obj.atk === "hibernate"))
      //     x.atkLog.forEach(e => {
      //       if (e.time < (x.atkLog[phaseIndex].hitTime + 0.12) && e.distance > 0) {
      //         const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
      //         summary_stats[playerIndex].atksBeforePS = (summary_stats[playerIndex].atksBeforePS + 1);
      //       } else if (e.distance > 0) {
      //         const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
      //         summary_stats[playerIndex].atksIntoPS = (summary_stats[playerIndex].atksIntoPS + 1);
      //       }
      //     })
      //   } else {
      //     x.atkLog.forEach(e => {
      //       if (e.distance > 0) {
      //         const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
      //         summary_stats[playerIndex].atksBeforePS = (summary_stats[playerIndex].atksBeforePS + 1);
      //       }
      //     })
      //   }
      // })
      resolve()
    })
    await processCSV
    await Match.create({
      map: map,
      gathers: gathers,
      greens_log: greens_log,
      hp_log: hp_log,
      log: log,
      rogue_log: rogue_log,
      score_log: score_log,
      spike_hp: spike_hp,
      spike_log: spike_log,
      spike_stats: spike_stats,
      spike_summary: spike_summary,
      summary: summary,
      summary_stats: summary_stats,
      support_breakdown: support_breakdown,
      support_extras: support_extras,
      support_powers: support_powers,
      support_stats: support_stats,
      collection_id: req.params.id
    });
    await fs.unlink(`${newpath}${filename}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File deletion failed", code: 200 });
      }
    });
    await fs.unlink(`${newpath}${filename}.csv`, (err) => {
      if (err) {
        res.status(500).send({ message: "File deletion failed", code: 200 });
      }
    });
    const matches = await Match.findAll({
      where: {
        collection_id: req.params.id
      }
    });
    const formatMatches = await JSON.parse(JSON.stringify(matches));
    res.status(200).json(formatMatches)
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

module.exports = router;