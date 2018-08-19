const db=require('../db/db');

module.exports=db.defineModel('tag',{
    tag:db.STRING(100),
    // visitis:{
    //     type:db.INTEGER(50),
    //     default:0,
    //     allowNull:true
    // },
    // status:{
    //     type:db.STRING(50),
    //     default:'published',
    //     allowNull:true
    // },
})