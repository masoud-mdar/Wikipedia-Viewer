const express = require("express")
const cors = require("cors")
require("dotenv").config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors({origin: "*"}))

app.get("/", (req, res) => {
    res.send("Hello !")
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})