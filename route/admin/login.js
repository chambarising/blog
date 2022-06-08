//导入用户集合构造函数
const { User } = require("../../model/user")

module.exports = async (req, res) => {
  const { emil, passwords } = req.body
  //调用数据库查询功能,如存在返回对象，不存在返回空
  let user = await User.findOne({ emil: emil })
  if (user) {
    //判断用户状态是否被禁用
    if (user.state == true) {
      //判断用户密码是否正确
      if (passwords == user.passwords) {
        if (user.role == "普通用户") {
          return res.render('admin/login', { msg: '用户名或密码错误或用户被禁用，请重新尝试' })
        }
        //将登录的用户名存储到session中
        req.session.username = user.username
        //将登录的用户的权限存储到session中供添加用户后判断返回的主页使用
        req.session.role = user.role
        //将查询到的用户开放到模板中
        req.app.locals.userInfo = user
        if (user.role == '总管') {
          return res.redirect("/admin/normaluser")
        }
        res.redirect("/admin/superuser")
      } else {
        res.render('admin/login', { msg: '用户名或密码错误或用户被禁用，请重新尝试' })
      }
    } else {
      res.render('admin/login', { msg: '用户名或密码错误或用户被禁用，请重新尝试' })
    }
  } else { 
    res.render('admin/login', { msg: '用户名或密码错误或用户被禁用，请重新尝试' })
  }
}
