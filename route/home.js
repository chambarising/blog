const express = require("express");
//创建首页路由
const home = express.Router();
//首页展示页面
home.get("/", require('./home/index'));
//首页详情页面
home.get("/article", require('./home/article'))
//设置登录
home.get('/login', require('./home/loginPage'))
//判断登录
home.post('/login', require('./home/login'))
//创建退出功能路由
home.get('/logout', require('./home/logout'))
//创建评论添加路由
home.post('/comment',require('./home/comment'))
module.exports = home;
