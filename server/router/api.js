require("dotenv").config()

module.exports = function(app) {

    app.post("/api/list", (req, res) => {
        res.send("list works")
    })

    app.post("/api/article", (req, res) => {
        res.send("article works")
    })
}