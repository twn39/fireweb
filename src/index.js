const dotenv = require('dotenv');
dotenv.config({
    path: `src/.env.${process.env.NODE_ENV}`,
});

const Koa = require('koa');
const router = require('./routers');
const pino = require('pino');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.context.logger = pino();

app.use(bodyParser());
app.use(router.routes());

console.log('server listen at port 3000 ...');
app.listen(3000);
