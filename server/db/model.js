/*
const fs=require('fs');
const db=require('./db');

let files=fs.readdirSync(__dirname+'/models');

//第二个参数：对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
let js_files=files.filter((f)=>{
    return f.endsWith('.js');
},files);

module.exports={};

for(let f of js_files){
    console.log(`import file from ${f}`);
    let name=f.substring(0,f.length-3);
    module.exports[name]=require(__dirname+'/models/'+f);
}

module.exports.sync= () => {
    db.sync();
}
*/


const fs=require('fs')
const db=require('./db')

let files=fs.readdirSync(__dirname+'/../'+'/models')

// 第二个参数：执行 callback 时的用于 this 的值。
let js_files=files.filter((f)=>{
    return f.endsWith('.js')
},files)

module.exports={}

for(let f of js_files){
    let name=f.substring(0,f.length-3)
    module.exports[name]=require(__dirname+'/../'+'/models/'+f)
}

////Sequelize提供了一个sync()方法，可以自动创建数据库。
module.exports.sync=()=>{
    db.sync()
}