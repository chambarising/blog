//引入User用于删除用户
const {User} = require('../../model/user')
module.exports = async(req, res) => { 
  //根据传递过来的id删除用户
  await User.findOneAndDelete({ _id: req.query.id })
  //当删除完成后重定向到用户列表页面
  if (req.session.role == '总管') { 
    return res.redirect('/admin/normaluser')
  }
  res.redirect('/admin/superuser')
}
