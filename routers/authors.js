const express= require("express");
const router= express.Router();
//pg client
const client = require("../helpers/pgConnect");

router.get("/",(req,res,next)=>{
    let error= new Error("No Request");
    next(error)
})

module.exports=router;