require('dotenv').config()
const config = require("./common/config/env.config.js");

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AuthorizationRouter = require('./authorization/routes.config');
const UserRouter = require('./users/routes.config');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type,  X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
})

app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
UserRouter.routesConfig(app);

app.listen(config.port, ()=>{
    console.log('app listening at port %s', config.port)
});