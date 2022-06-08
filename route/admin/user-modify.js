const {User,validateUser} = require('../../model/user')
module.exports = async (req, res, next) => { 
  //接收表单传递过来的参数,即表单内容
  const {username,emil,passwords,state,role } = req.body
  //id时通过get参数传递所以通过query接收
  const id = req.query.id
  //验证修改的用户信息是否正确
  try {
    await validateUser(req.body)
  } catch(error){ 
    //验证没有通过，将错误信息通过参数的方式重定向到修改页面
    //通过next方法触发错误处理中间键，在错误处理中间件中重定向
    //next方法只接收字符串所以需要用JSON.stringify来转换为字符串
    //retrun res.redirect(`/admin/user-edit?message=${error.message}`)
    return next(JSON.stringify({path:'/admin/user-edit',message:error.message,id:id}))
  }
  //通过邮箱比对用户
  let user = await User.findOne({emil:emil})
  if (emil == user.emil) {
    if (id == user.id) {
      //将用户信息更新到数据库中
      await User.updateOne({ _id: id }, {
        username: username,
        emil: emil,
        passwords: passwords,
        role: role,
        state: state
      })
      if (req.session.role == '总管') {
        return res.redirect('/admin/normaluser')
      } else {
        return res.redirect('/admin/superuser')
      }
    } else {
      return next(JSON.stringify({ path: '/admin/user-edit', message: '登录邮箱已存在', id: id }))
    }
  } else { 
    await User.updateOne({ _id: id }, {
      username: username,
      emil: emil,
      passwords: passwords,
      role: role,
      state: state
    })
    if (req.session.role == '总管') {
      return res.redirect('/admin/normaluser')
    } else {
      return res.redirect('/admin/superuser')
    }
  }
}
