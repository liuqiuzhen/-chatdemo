const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const model = require('./model');

const app = express();

//我work with express
const server = require('http').Server(app);

const io = require('socket.io')(server)

const Chat = model.getModel('chat')

io.on('connection',function(socket){
    // console.log('user login')
    socket.on('sendmsg',function(data){
        console.log(data);
        const {from,to,msg} = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            console.log(err,doc,'===返回的信息==')
            io.emit('recvmsg',Object.assign({},doc._doc));
        })
    })

});

// Chat.remove({},function(err,doc){
//     console.log(doc,err,'清空聊天数据')
// })

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user',userRouter);

//类似于mysql的文档，字段的概念

// const User = mongoose.model('user',new mongoose.Schema({
//     user:{
//         type:String,
//         require:true
//     },
//     age:{
//         type:Number,
//         require: true
//     },
//     sex:{
//         type:String,
//         require:false
//     }
// }));

// User.create({
//     user: 'zhen',
//     age:21,
//     sex:'女'
// },function(err,doc){
//     if(!err){
//         console.log(doc);
//     }else{
//         console.log(err);
//     }
// });


// User.update({
//     'user':'xiaoming'
// },{
//     '$set':{
//         age:26
//     }
// },function(err,doc){
//     if(!err){
//         console.log('update success');
//     }
// });
//




//新建app  需要重新启动


//设置根目录
app.get('/',function(req,res){
    res.send('<h1>Hello Word node服务</h1>')

});
app.get('/data',function(req,res){
    //    查找
    // User.find({},function(err,doc){
    //     return res.json(doc)
    // })

    // User.findOne({user:'xiaoming'},function(err,doc){   //查到一条就返回
    //     return res.json(doc)
    // })

    // res.json({
    //     name:'zhenzhen',
    //     type:'web'
    // })
});

//监听
server.listen(9000,function(){
    console.log('Node app start 9093')
});

