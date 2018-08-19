const Router = require('koa-router');

import importDir from 'import-dir';

import generateRouter from './router';
import generateAction from './action';

import Admin from './admin';

import Article from '../models/article.js';

const prefix='/api'
const models=importDir('../models');

module.exports = ()=>{
    // console.log(models);
    const router=new Router({ prefix })
    Object.keys(models).forEach(key=>generateRouter(key,router,Admin.permission,generateAction(models[key])));
    router
        .post('/admin/login',Admin.login)
    return router.routes();

}

