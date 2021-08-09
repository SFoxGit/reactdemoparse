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
    const csvArray = fs.readFileSync(`${newpath}${filename}.csv`)
      .toString() 
      .split('\n') 
      .map(e => e.trim()) 
      .map(e => e.split(',').map(e => e.trim())); 

    res.status(200).json(csvArray)
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;