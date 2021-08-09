const router = require('express').Router();
const { spawn } = require('child_process');
const pythonDir = ("C:/Users/16073/Desktop/Code/reactdemoparse/parsedemo.py")
const fs = require('fs')
const { Match } = require("../../models");


router.post("/", async (req, res) => {
  console.log(pythonDir)
  try {
    const newpath = "C:/Users/16073/Desktop/Code/reactdemoparse/"
    const file = req.files.file
    const filename = file.name

    const atk_chains = []
    const defence_stats = []
    const gathers = []
    const greens_log = []
    const hp_log = []
    const log = []
    const offence_stats = []
    const offence_timing = []
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
    const support_stats = []
    await file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
    });
    await spawn('python', [pythonDir, `${newpath}${filename}`])
    const csvArray = fs.readFileSync(`${newpath}${filename}.csv`)
      .toString()
      .split('\n')
      .map(e => e.trim())
      .map(e => e.split(',').map(e => e.trim()));
    await csvArray.forEach(row => {
      switch (row[2]) {
        case "atk_chains":
          if (atk_chains.some(e => e.player === row[3])) {
            const objIndex = atk_chains.findIndex((obj => obj.player === row[3]))
            atk_chains[objIndex].chains.push({atks: row[8], count: row[12]})
          } else {
            atk_chains.push({player: row[3], team: row[4], chains: [{atks: row[8], count: row[12]}]})
          }
          break;
        case "defence_stats":
          defence_stats.push({player: row[3], team: row[4], deaths: row[14], targets: row[15], spikeDam: row[16], healsOnSpike: row[17], healsTaken: row[18], avgJaunt: row[24], avgPhase: [25], avgDeath: row[26]})
          break;
        case "gathers":
            gathers.push({team: row[4], time: row[5]})
          break;
        case "greens_log":
          if (greens_log.some(e => e.player === row[3])) {
            const objIndex = greens_log.findIndex((obj => obj.player === row[3]))
            greens_log[objIndex].greens.push({time: row[5], count: row[14]})
          } else {
            greens_log.push({player: row[3], greens: [{time: row[5], count: row[14]}]})
          }
          break;
        case "hp_log":

          break;
        case "log":

          break;
        case "offence_stats":

          break;
        case "offence_timing":

          break;
        case "rogue_log":

          break;
        case "score_log":

          break;
        case "spike_hp":

          break;
        case "spike_log":

          break;
        case "spike_stats":

          break;
        case "spike_summary":

          break;
        case "summary":

          break;
        case "summary_stats":

          break;
        case "support_breakdown":

          break;
        case "support_extras":

          break;
        case "support_powers":

          break;
        case "support_stats":

          break;
        
      }
    })
    await Match.create({
      atk_chains: atk_chains,
      defence_stats: defence_stats,
      gathers: gathers,
      greens_log: greens_log
    })
    res.status(200).json(csvArray)
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;