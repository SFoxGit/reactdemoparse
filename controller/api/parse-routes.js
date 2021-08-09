const router = require('express').Router();
const { spawn } = require('child_process');
const pythonDir = ("C:/Users/16073/Desktop/Code/reactdemoparse/parsedemo.py")
const fs = require('fs')

router.post("/", async (req, res) => {
  console.log(pythonDir)
  try {
    const testData = req.body
    console.log("File: " + testData)
    const newpath = "C:/Users/16073/Desktop/Code/reactdemoparse/"
    const file = req.files.file
    const filename = file.name
    await file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
    });
    await spawn('python', [pythonDir, `${newpath}${filename}`])
    // await python.stdout.on('data', function (data) {
    //   const dataToSend = data.toString();
    //   console.log(dataToSend)
    // });
    // in close event we are sure that stream from child process is closed
    // python.on('close', (code) => {
    //   console.log(`child process close all stdio with code ${code}`);
    //   // send data to browser
    const csvArray = fs.readFileSync(`${newpath}${filename}.csv`)
      .toString() // convert Buffer to string
      .split('\n') // split string to lines
      .map(e => e.trim()) // remove white spaces for each line
      .map(e => e.split(',').map(e => e.trim())); // split each line to array
    const test = JSON.parse(JSON.stringify(csvArray))

    res.status(200).json(csvArray)

    // })

  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;