const express = require("express");

//创建首页路由
const admin = express.Router();

//创建登录页面路由
admin.get("/login", require('./admin/loginPage'));

//创建表单提交验证路由
admin.post('/login',require('./admin/login'))

//创建超级用户页面路由
admin.get("/superuser", require('./admin/superuserPage'));
//创建总管页面路由
admin.get("/normaluser",require('./admin/normaluserPage'))

//创建用户编辑路由
admin.get('/user-edit', require('./admin/user-edit'))

//创建实现用户添加路由
admin.post('/user-edit', require('./admin/user-edit-fn'))

//创建实现用户修改路由
admin.post('/user-modify', require('./admin/user-modify'))

//创建实现用户删除路由
admin.get('/delete', require('./admin/delete'))

//创建文章列表页面路由
admin.get('/article', require('./admin/article'))

//创建文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'))

//创建文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'))

//创建退出功能路由
admin.get('/logout',require('./admin/logoout'))

//创建错误处理中间件
admin.use((err, req, res, next) => {
  //将传递过来的字符串再转换为对象形式
  const result = JSON.parse(err)
  //动态创建参数
  let params = []
  for (let attr in result) { 
    //attr为属性名，result[attr]为属性值
    if (attr != 'path') { 
      //将拼接好的字符串添加到创建的数组中
      params.push(attr + '=' + result[attr])
    }
  }
  //使用数组下的join方法将每个参数之间用&连接
  res.redirect(`${result.path}?${params.join('&')}`)
})

module.exports = admin;
