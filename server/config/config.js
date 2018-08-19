// 数据库连接数据
const testConfig = './config-test.js';
const defaultConfig = './config-default';

var config = null;

if(process.env.NODE_ENV === 'test'){
    config = require(testConfig);
}else{
    config = require(defaultConfig);
}

module.exports=config;