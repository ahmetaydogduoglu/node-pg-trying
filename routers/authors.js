const express = require("express");
const router = express.Router();
//pg client
const client = require("../helpers/pgConnect");

router.get("/", (req, res, next) => {
    client.query(`
    SELECT a.id as author_id,a.first_name,a.last_name,
    jsonb_agg(jsonb_build_object('book_id',b.id,'name', b.name, 'type', b.type,'year',b.year)) 
    as books        
    FROM authors a
    LEFT JOIN books b ON b.author_id = a.id
    GROUP BY a.id
    `).then(result => {
        res.json({
            authors: result.rows
        })
    })
})

router.post("/", (req, res, next) => {
    const { firstName, lastName } = req.body;
    client.query("INSERT INTO authors (first_name,last_name) VALUES ($1,$2)", [firstName, lastName]).then(result => {
        res.json({
            status: 1,
            message: "Author Added"
        })
    }).catch(err => {
        next(err);
    })
})

router.put("/:id", (req, res, next) => {
    const { firstName, lastName } = req.body;
    client.query(`UPDATE authors SET 
    first_name = $1,
    last_name = $2
    WHERE id = $3`, [firstName, lastName, req.params.id]).then(result => {
        res.json({
            status: 1,
            message: "Author Updated"
        })
    }).catch(err => {
        next(err);
    })
})

module.exports = router;