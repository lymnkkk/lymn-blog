import Koa from 'koa';
import middleware from './middleware'
import api from './api';

const app = new Koa();

app.use(middleware())
app.use(api());
app.listen(3000);

console.log('server start at 3000')

export default app;
//初始化数据库，自动创建数据表
 //model.sync();
/*
(async()=>{

    var article=await Article.create({
        title:'test',
        excerpt:'摘要',
        content:'内容',
        // visits:0,
        // status:'published'
    })
})();
*/





