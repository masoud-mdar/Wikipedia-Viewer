const fetch = require("node-fetch")
require("dotenv").config()


module.exports = function(app) {

    app.post("/api/list", (req, res) => {

        let url = `https://${req.body[0]}.wikipedia.org/w/api.php`
        url += "?origin=*"
        Object.keys(req.body[1]).forEach(key => {
            url += `&${key}=${req.body[1][key]}`
        })

        fetch(url)
            .then(response => response.json())
            .then(data => res.json(data))
            .catch(error => console.log(error))

    })

}