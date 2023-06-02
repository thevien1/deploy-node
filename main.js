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
      con.query("SELECT * FROM test", function (err, result, fields) {
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
const crypto = require('crypto');
const axios = require('axios');

const getDepositHistory = () => {
  const apiKey = 'ehZHLTqpe5AyBCOIR73wnXtf4g7RZ0uYHOtak47RYT4OYnkLQsdueKmdNMI6abIc';
  const apiSecret = '8irmwfRrD7At6W91ny2rjIOqEVxDWUOJHPi0JiulE6oh0yg47AqXBo6bjQivYYih';

  const timestamp = Date.now();
  const queryString = `timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');

  const headers = { 'X-MBX-APIKEY': apiKey };
  const params = { timestamp, signature };

  return axios.get('https://api.binance.com/sapi/v1/capital/deposit/hisrec', { headers, params })
    .then(response => response.data)
    .catch(error => {
      console.error('Yêu cầu không thành công:', error.response.status, error.response.data);
      throw error;
    });
};

getDepositHistory()
  .then(depositHistory => {
    ctx.body = depositHistory
    console.log(depositHistory);
  })
  .catch(error => {
    // Xử lý lỗi nếu cần
  });
