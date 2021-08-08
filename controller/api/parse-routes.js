const router = require('express').Router();
const {spawn} = require('child_process');
const pythonDir = (__dirname + "/parsedemo.py")

router.post("/", async (req, res) => {
  console.log("route hit")
  try {
    const testData = JSON.stringify(req.body.file)
    var dataToSend;
    const python = spawn('python', [pythonDir, testData])
    python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      dataToSend = data.toString();
     });
     // in close event we are sure that stream from child process is closed
     python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
     res.send(dataToSend)
     });
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;