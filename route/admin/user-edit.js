const { User } = require('../../model/user')
module.exports = async (req, res) => { 
  //设置标识到模板全局(currentLink)，判断当前为用户管理还是文章管理
  req.app.locals.currentLink = 'user'
  //接收错误信息参数
  const { message, id } = req.query
  //通过是否存在id来判断是新增用户操作还是修改用户操作
  //有id为修改，无id为新增
  if (id) {
    let user = await User.findOne({_id:id})
    res.render('admin/user-edit', {
      msg: message,
      user: user,
      btn: '修改',
      link:'/admin/user-modify?id='+id
    })
  } else { 
    res.render('admin/user-edit', {
      msg: message,
      btn: '添加',
      link:'/admin/user-edit'
    })
  }
}
