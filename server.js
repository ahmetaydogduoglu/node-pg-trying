const express = require("express");
const app = express();
const client = require("./helpers/pgConnect");
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    client.query('SELECT * FROM deneme').then(result => {
        res.json(result.rows);
    }).catch(err => res.send(err).status(500));
})

app.post("/", (req, res, next) => {
    client.query(`INSERT INTO deneme (name) VALUES ($1)`, [req.body.name]).then(result => {
        res.json(result.rows);
    }).catch(err => res.send(err).status(500));
})

app.listen(8080, () => {
    console.log("Liston To 8080 port.");
})
