const Koa = require("koa")
const app = new Koa()
const express = require('express')
// const app = express()
const cors = require('cors')
const mysql = require('mysql');
const dotenv = require('dotenv');
// app.use(cors())
// app.get("/binance",(req, res)=>{
//   res.send("Hello world2")
// })
// dotenv.config()

// var con = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// });

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM agency", function (err, result, fields) {
//     if (err) throw err;
//     app.get("/binance2",(req, res)=>{
//       res.send(result)
//     })
//     console.log(result);
//   });
// });
app.use(async ctx =>{
    ctx.body = 'Hello'
})

const PORT = 5000
app.listen(process.env.PORT || 5000,console.log("Run: "+PORT ))