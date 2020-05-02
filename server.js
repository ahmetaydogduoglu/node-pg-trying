const express = require("express");
const app = express();
//pg client
const bodyParser = require('body-parser');
//router
const booksRouter = require("./routers/books");
const authorsRouter = require("./routers/authors");

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/books",booksRouter);
app.use("/api/authors",authorsRouter);

app.use((req,res,next)=>{
    const error= new Error("Not Found");
    error.status=404
    next(error);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message:err.message
    });
})

app.listen(8080, () => {
    console.log("Liston To 8080 port.");
})
