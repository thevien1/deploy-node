const Koa = require("koa");
const app = new Koa();
const cors = require('koa-cors');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());

app.use(async (ctx, next) => {
  if (ctx.path === "/binance") {
    ctx.body = "Hello world2";
  } else if (ctx.path === "/binance2") {
    const con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    const queryResult = await new Promise((resolve, reject) => {
      con.query("SELECT * FROM agency", function (err, result, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
        con.end(); // Close the database connection
      });
    });

    ctx.body = queryResult;
    console.log(queryResult);
  } else {
    ctx.body = 'Hello';
  }

  await next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
