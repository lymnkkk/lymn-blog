//初始化数据库，自动创建数据表
const model=require('./model');
model.sync();

console.log('init db');