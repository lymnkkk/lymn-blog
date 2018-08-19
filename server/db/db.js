const Sequelize = require('sequelize');

const config = require('../config/config');

const uuid = require('node-uuid');

function generateId(){
    return uuid.v1();
}

var sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:config.dialect,
    pool:{
        max:5,
        min:0,
        idle:1000
    }
});

//const ID_TYPE=Sequelize.STRING(50);

function defineModel(name,attributes){
    var attrs={};
    for(let key in attributes){
        let value = attributes[key];
        if(typeof value === 'Object' && value['type']){
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        }else{
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id={
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement:true
    };
    attrs.createdAt={
        type : Sequelize.BIGINT,
        allowNull : false
    };
    attrs.updatedAt={
        type : Sequelize.BIGINT,
        allowNull : false
    };
    attrs.version={
        type : Sequelize.BIGINT,
        allowNull : false
    };
    /**
     * 我们传入{ timestamps: false }是为了关闭Sequelize的自动添加timestamp的功能
     **/
    return sequelize.define(name,attrs,{
        tableName:name,
        timestamps:false,
        hooks:{
            beforeValidate:function(obj){
                let now=Date.now();
                if(obj.isNewRecord){
                    /*
                    if(!obj.id){
                        obj.id=generateId();
                    }
                    */
                    obj.createdAt=now;
                    obj.updatedAt=now;
                    obj.version=0;
                }else{
                    obj.updatedAt=now;
                    obj.version++;
                }
            }
        }
    })
}

const TYPES = ['STRING','INTEGER','BIGINT','TEXT','DOUBLE','DATEONLY','BOOLEAN'];

//用sync()方法自动创建出表结构
var exp = {
    defineModel:defineModel,
    sync:()=>{
        if(process.env.NODE_ENV!=='production'){
            // sync配置{force:true}时，查看数据库是否有该表，如果有则删除，再重建。
            console.log('sequelize sync');
            sequelize.sync({force:true})
        }else{
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
}

for(let type of TYPES){
    exp[type]=Sequelize[type];
}
/*
exp.ID = ID_TYPE;
exp.generateId = generateId;
*/
module.exports=exp;