const res = require("express/lib/response")

module.exports = (req,res) => { 
  //删除session 
  req.session.destroy(() => { 
    //删除cookie
    res.clearCookie('connect.sid')
   //清楚模板中的用户信息
   res.app.locals.userInfo = null 
    //重定向到登录页面
    res.redirect('/home')
  })
}
