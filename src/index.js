const dotenv = require('dotenv');
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const Koa = require('koa');
const router = require('./routers');
const pino = require('pino');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.context.logger = pino();

app.use(bodyParser());
app.use(router.routes());

console.log('server listen at port 4000 ...');
app.listen(4000);
