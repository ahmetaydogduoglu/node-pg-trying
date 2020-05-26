const express = require("express");
const router = express.Router();
//pg client
const client = require("../helpers/pgConnect");

router.get("/", (req, res, next) => {
    client.query("SELECT * FROM books ORDER BY name ASC").then(result => {
        res.send(result.rows)
    }).catch(err => {
        next(err);
    })
})

router.post("/", (req, res, next) => {
    client.query("INSERT INTO books (name,type,year,author_id) VALUES ($1,$2,$3,$4)",
        [req.body.name, req.body.type, parseInt(req.body.year), parseInt(req.body.author_id)]).then(result => {
            res.json({
                status:1,
                message:"Book Added"
            })
        }).catch(err => {
            next(err);
        })
})

router.put("/:id", (req, res, next) => {
    client.query(`UPDATE books SET 
        name = $1,
        type = $2,
        year= $3,
        author_id=$4
        WHERE id = $5`,
        [req.body.name, req.body.type, parseInt(req.body.year), parseInt(req.body.author_id), parseInt(req.params.id)]).then(result => {
            console.log(result)
            res.send(result.rows);
        }).catch(err => {
            next(err);
        })
})

module.exports = router;