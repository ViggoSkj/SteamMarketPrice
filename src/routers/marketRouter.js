const express = require("express")
const router = express.Router()
const marketController = require("./../controllers/marketController")

router.get("/:game/:itemName", marketController.getItemIdByNameAndGame)

module.exports = router