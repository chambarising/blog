const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")
const session = require('express-session')
const dateFormat = require('dateformat')
const template = require('art-template')

//引入home首页路由
const home = require("./route/home");
//引入admin管理员页面路由
const admin = require("./route/admin");
//引入conncet文件，连接数据库
require("./model/connect");

const app = express();

//process对象是一个全局对象，可以在任何地方都能访问到他，通过这个对象提供的属性和方法，使我们可以对当前运行的程序的进程进行访问和控制
//process.env可以获取电脑操作系统中的环境变量，返回值是一个对象
//通过判断自己添加的NODE_ENV环境变量来判断是否为开发环境
/*if (process.env.NODE_ENV == 'development') {
  //当前为开发环境
  
} else { 
  //当前为生产环境
}*/

//配置express-session实现session功能
//saveUninitialized:false为只有登录后才存储cookie
//cookie可以对时效进行设置
app.use(session({
  secret: 'secret key',
  saveUninitialized: false,
  cookie: {
    maxAge:24*60*60*1000
  }
}))

//配置bodyparser，用于获取post请求参数
app.use(bodyParser.urlencoded({extended:false}))

//配置模板的默认路径
app.set("views", path.join(__dirname, "./views"));

//配置模板的默认后缀
app.set("view engine", "art");

//配置当渲染后缀名为art的模板的时候默认的模板引擎
app.engine("art", require("express-art-template"));

//向模板内部导入dateformat方法
template.defaults.imports.dateformat = dateFormat

//开放静态资源文件(默认文件路径)
app.use(express.static(path.join(__dirname, "./public")));


//拦截请求，判定用户是否直接登录后台页面
app.use('/admin', (req, res, next) => { 
  //判断用户是否访问登录页面
  //判断用户的登录状态
  //如果用户是登录状态的就放行，反之跳转到登录页面
  if (req.url != '/login' && !req.session.username) {
    res.redirect('/admin/login')
  } else { 
    next()
  }
})

//拦截请求，判断是否直接访问superuser页面，如果是判断是否登录为超级管理员
app.use('/admin/superuser', (req, res, next) => { 
  if (req.session.role != '超级管理员') {
    res.render('admin/login', { msg: '用户名或密码错误或用户被禁用，请重新尝试' })
  } else { 
    next()
  }
})
//拦截请求，判断是否直接访问normaluser页面，如果是判断是否登录为超级管理员
app.use('/admin/normaluser', (req, res, next) => { 
  if (req.session.role != '总管') {
    res.render('admin/login', { msg: '用户名或密码错误或用户被禁用，请重新尝试' })
  } else { 
    next()
  }
})

//为路由匹配请求路径
app.use("/home", home);
app.use("/admin", admin);
app.use((req, res) => {
  if (req.url === "/") {
    res.redirect("/home");
  }
});

app.listen(3000);
console.log("启动");
