const express = require('express');
const utils = require('utility')

const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');

const _filter = {pwd:0,_v:0} ; //控制返回的数剧不反回密码

Router.get('/list',function(req,res){
    const {type} = req.query; // get的参数通过query获取

    User.find({type:type},function(err,doc){
        return res.json(doc)
    })

});
Router.post('/readmsg',function(req,res){
    const userid = req.cookies.userid;
    const {from} = req.body;
    // console.log(user,from)
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        function(err,doc){
            console.log(doc)
            if (!err) {
                return res.json({code:0,num:doc.nModified})
            }
            return res.json({code:1,msg:'修改失败'})
        })
})

Router.get('/getmsglist',function(req,res){
    const user = req.cookies.userid;

    User.find({},function(e,userdoc){
        let users = {}
        userdoc.forEach(v=>{
            users[v.id] = {name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(!err){
             return res.json({code:0,msgs:doc,users:users})
            }
        })
    })


    // User.find({},function(e,){
    //
    // })
})

Router.post('/login',function(req,res){
    const {user,pwd} = req.body;
    User.findOne({user},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或密码不对'});
        }

        console.log(doc);
        const {user,type,_id} = res;
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc});
    })
})
Router.post('/register',function(req,res){

    const {user,pwd,type} = req.body;
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'});
        }
        const userModel = new User({user,type,pwd:md5Pwd(pwd)});

        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错'})
            }
            const {user,type,_id} = d;
            res.cookie('userid',_id);
            return res.json({code:0,data:{user,type,_id}});
        });

        // User.create({user,pwd:md5Pwd(pwd),type},function(e,d){
        //     if(e){
        //         return res.json({code:1,msg:'后端出错'})
        //     }
        //     return res.json({code:0,msg:'注册成功'})
        // })
    })
});
Router.get('/info',function(req,res){
    const userid = req.cookies.userid;

    if(!userid){
       return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'});
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })

});

function md5Pwd(pwd){
    const salt = 'react_is_good_3957x8yza6!@#IUHJh~~'
    return utils.md5(utils.md5(pwd+salt))
}

// User.update({
//     'user':'liu1'
// },{
//     '$set':{
//         // age:26,
//         desc:'熟练使用VUE，对前端开发有自己的一些见解',
//         title:'大佬',
//         'company':'阿里巴巴',
//         'money':'30k'
//     }
// },function(err,doc){
//     if(!err){
//         console.log('update success');
//     }
// });
//

module.exports = Router;
