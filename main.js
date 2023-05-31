const Koa = require("koa")
const app = new Koa()

app.use(async ctx =>{
    ctx.body = 'Hello'
})

const PORT = 5000
app.listen(process.env.PORT || 5000,console.log("Run: "+PORT ))