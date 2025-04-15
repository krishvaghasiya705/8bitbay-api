const express = require("express");
const router = express.Router();
const {
  getAllGames,
  addGame,
  updateGame,
} = require("../controllers/gamesController");

router.get("/", getAllGames);
router.post("/", addGame);
router.put("/:id", updateGame);

module.exports = router;
