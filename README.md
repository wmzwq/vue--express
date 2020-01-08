

### 本项目文件是以下所有流程完成后的产物
 

```
下载本项目后 
npm install

运行vue项目 
npm run dev 

开启express服务器
node server/bin/www 
```
### 用express+mongoDB建立与前端通信的数据库

### 1.生成一个vue

```
vue init webpack demoFolder
```
### 2.express 框架 
[创建服务器文件夹](http://www.expressjs.com.cn/4x/api.html)

```
安装express
npm install express-generator

生成express框架文件夹  
express server                  
```
### 3.安装依赖

```
cd server
npm install
```
### 4.express安装默认是使用 jade 模板语言，修改成 html 的方法：

```
安装 ejs  
npm install ejs --save

server > app.js 引入 ejs 模块
var ejs = require('ejs');

server > app.js 设置语言类型 
app.engine('.html',ejs.__express);
app.set('view engine','html');

新建路由
var eg= require('path/eg');
app.use('/eg',eg);
```
### 5.pm2插件启动服务器

```
安装 ejs  
npm install ejs --save

安装pm2
npm install pm2 -g

启动pm2
pm2 start name

关闭pm2
pm2 stop name(all)
```
### 6.MongoDB数据库安装

- [mongo 数据库安装](http://www.runoob.com/mongodb/mongodb-window-install.html)
- [mongoose 安装依赖](http://www.nodeclass.com/api/mongoose.html)   

```
npm install mongoose --save
```

### 7.开启数据库

```
mongo
```
### 8.mongo数据库操作

 **术语** 
```
数据库           database
集合             collection  表
记录行文档       document
域 键值对        field
索引             index
主键 生成 _id    primary key
```
### 9.操作

```
创建数据库并插入
  db.demo.insert({  
    "userId":101,
    "name":" jack",
    "class":{ num:30 } 
  })
删除数据库
  db.dropDatabase()
删除集合
  db.user.drop()
查找集合  格式美化
  db.demo.find().pretty()
查找第一条数据
  db.demo.findOne()
查找条件
  大于
     db.demo.find({age:{$gt:20}})
  大于等于
     db.demo.find({age:{$gte:20}})
  小于
     db.demo.find({age:{$lt:20}})
  小于等于
     db.demo.find({age:{$lte:20}})
  等于
     db.demo.find({age:{$eq:20}})
     
数据更新   显示查找条件，然后$set修改 (子文档用class.num)
  db.demo.update({“name”:"jack"},{$set:{"class.num":25}
数据删除
  db.demo.remove({“name”:"zxy"})
```

### 10. server > model > egs.js

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

With Mongoose, everything is derived from a Schema.
模板定义
var egSchema = new Schema({
  "name":String
});
以下输出会自动在数据库查找 egs 数据表
module.exports = mongoose.model('Eg',egSchema)
```
### 11. server > router > egs.js

```
var express = require('express')
var router = express.Router()
var mongoose = requier('mongoose')

获取到数据表egs的数据
var Egs= require('../models/egs')

链接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/mydemo')

返回数据
router.get('/',(req,res,next)=>{
  Egs.find({},(err, doc) => {
       if (err) {  
            res.json({
                status: 1,
                msg: err.msg
            })
        } else {
            res.json({
                status: 0,
                msg: "",
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})
module.exports = router
```


### 12.跨域

target是跨域的接口的链接地址
```
代理跨域 config > index.js
proxyTable: {
    '/egs': {
        target: 'http://localhost:3000'
    }
},
```
### 13.页面调用服务器接口

```
axios.get('/egs',{
  param:params
}).then(res=>{
  获取到数据
}).catch(err=>{
  错误
})
```
### vue小技巧，父组件手动刷新整个页面
```
在template里包裹所有子组件的外层div加 v-if="shouldComponentUpdate",手动刷新时，执行
this.shouldComponentUpdate = false
this.$nextTick(() => {
  this.shouldComponentUpdate = true;
});       
```



