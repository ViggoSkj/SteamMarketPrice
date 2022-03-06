require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000

const csgoRouter = require("./src/routers/csgoRouter")
const generalRouter = require("./src/routers/marketRouter")

app.use(express.json())

app.use("/csgo", csgoRouter)
app.use("/market", generalRouter)

app.get("/", (req, res) => {
    res.send("Steam Market Prices API")
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})