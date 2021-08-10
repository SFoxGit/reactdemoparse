const router = require('express').Router();
const { Match } = require("../../models");
const withAuth = require('../../utils/auth');

router.get("/:id", async (req, res) => {
  try {
    const matches = await Match.findAll({
      where: {
        collection_id: req.params.id
      }
    });
    const formatMatches = await JSON.parse(JSON.stringify(matches));
    res.status(200).json(formatMatches)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;