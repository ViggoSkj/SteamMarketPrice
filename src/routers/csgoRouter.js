const express = require("express")
const router = express.Router()
const csgoController = require("./../controllers/csgoController")

router.get("/:weapon/:skinName/:wear", (req, res) => {
    csgoController.getSkinData(req, res)
})

module.exports = router

