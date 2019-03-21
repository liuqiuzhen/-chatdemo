const mongoose = require('mongoose');

//链接monggo 并且使用imooc这个集合

const DB_URL = 'mongodb://localhost:27017/imooc-react';
mongoose.connect(DB_URL);

const models = {
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        'avatar':{type:String},
        'desc':{type:String},
        //职位名
        'title':{type:String},
    //    如果是boss
        'company':{type:String},
        'money':{type:String}
    },
    chat:{
        'chatid':{type:String,require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'read':{type:Boolean,default:false},
        'content':{type:String,require:true,default:''},
        create_time:{type:Number,default: Date.now}

    }
}

for(let m in  models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name);
    }
}
mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
});
