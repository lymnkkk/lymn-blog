import api from '../api';

import Koa from 'koa';

import chai from 'chai';
// import request from 'supertest';
import bodyParser from 'koa-bodyparser';
const request = require('supertest');
const app=new Koa();

app.use(bodyParser());
app.use(api());
let server=app.listen(3000);
//chai.should();

/**
 * 用户测试
 */
let user={
    name:'test',
    password:'test'
}

let createArti={
      
    title:'新添加的',
    excerpt:'## 新添加的摘要',
    content:`* 安装依赖包
    *           "sequelize": "3.24.1",
          "mysql": "2.11.1"
* config.js
    *           var config = {
            database: 'test', // 使用哪个数据库
            username: 'www', // 用户名
            password: 'www', // 口令
            host: 'localhost', // 主机名
            port: 3306 // 端口号，MySQL默认3306
          };`,         
   
}
let tokenSend={
    token:'',
//     title:'新添加的',
//     excerpt:'## 新添加的摘要',
//     content:`* 安装依赖包
//     *           "sequelize": "3.24.1",
//           "mysql": "2.11.1"
// * config.js
//     *           var config = {
//             database: 'test', // 使用哪个数据库
//             username: 'www', // 用户名
//             password: 'www', // 口令
//             host: 'localhost', // 主机名
//             port: 3306 // 端口号，MySQL默认3306
//           };`,      
}
describe('admin',()=>{
    
    it('login',async()=>{
        const res=await request(server)
                .post('/admin/login')
                .send(user)
                .expect(200)
        tokenSend.token=res.body.token;
        
        
        const res2=await request(server)
            .post('/articles')
            .send(tokenSend)
        console.log(res2.body);
        
        //let id=res2.body.id;
        //console.log('results'+res2);
        
    })
    
    /*
    it('login create',async()=>{
        
            const res=await request(server)
                    .post('/articles')
                    .send(createArti)
                    
            let id=res.body.id;
            console.log('results'+res);
        
    })
    */
})

/**
 * 文章测试
 */
/*
let articles={
            
    where:{
        id:1
    }           
   
}

let createArti={
      
    title:'新添加的',
    excerpt:'## 新添加的摘要',
    content:`* 安装依赖包
    *           "sequelize": "3.24.1",
          "mysql": "2.11.1"
* config.js
    *           var config = {
            database: 'test', // 使用哪个数据库
            username: 'www', // 用户名
            password: 'www', // 口令
            host: 'localhost', // 主机名
            port: 3306 // 端口号，MySQL默认3306
          };`,         
   
}


let updateArti={
    title:'更新',
    excerpt:'## 更新的摘要',
    content:'## 更新的内容',    
}

describe('Routers',()=>{
    
    it('find',async()=>{
        
        const res=await request(server)
                    .get('/articles')  
                    .send(articles)      
                    .expect(200)
                    .expect('Content-Type', /json/);
        // console.log('res:'+res.body);
       for(let item of res.body){
           console.log(item);
       }
       // Object.keys(res.body).should.have.length(7);

    }),
   
    it('create',async()=>{
        const res=await request(server)
                .post('/articles')
                .send(createArti)
                .expect(200);
        let id=res.body.id;
        console.log(res.body);
    })
    
  
    it('findById',async()=>{
        let find_id=2;
        const res=await request(server)
                .get(`/articles/${find_id}`)
               
                
        console.log(res.body);
       
    }),
    
    
    it('updateById',async()=>{
        let update_id=1;
        const res=await request(server)
                .put(`/articles/${update_id}`)
                .send(updateArti)

       // console.log(res.body.status);
    })
    
   
    it('deleteById',async()=>{
        let update_id=14;
        const res=await request(server)
                  .delete(`/articles/${update_id}`)
        
    })
    
})
*/

