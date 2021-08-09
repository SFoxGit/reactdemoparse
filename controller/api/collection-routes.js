const router = require('express').Router();
const { Collection } = require("../../models");
const withAuth = require('../../utils/auth');

router.get("/", function (req, res, next) {
  res.status(200).send("test");
});
router.get("/:id", async (req, res, next) => {
  try {
    const collectionData = await Collection.findByPk(req.params.id)
    const formatData = await JSON.parse(JSON.stringify(collectionData))
    res.status(200).json(formatData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post("/", async (req, res) => {
  try {
    await Collection.create({
      name: req.body.colName,
      team1: req.body.teamOne,
      team2: req.body.teamTwo,
      owner: req.body.userId,
    })
    const collections = await Collection.findAll({
      where: {
        owner: req.body.userId
      }
    });
    const formatCollections = await JSON.parse(JSON.stringify(collections));
    res.status(200).json(formatCollections)
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;