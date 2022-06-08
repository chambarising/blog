//引入用户集合用于验证
const {User,validateUser} = require('../../model/user')


module.exports = async (req, res,next)=>{
  try { 
    //调用验证规则
    await validateUser(req.body)
  } catch (error) {
    //验证没有通过，将错误信息通过参数的方式重定向到修改页面
    //通过next方法触发错误处理中间键，在错误处理中间件中重定向
    //next方法只接收字符串所以需要用JSON.stringify来转换为字符串
    //retrun res.redirect(`/admin/user-edit?message=${error.message}`)
    return next(JSON.stringify({path:'/admin/user-edit',message:error.message}))
  }
  //通过findone方法进行查询，若有返回值则说明用户存在
  const user = await User.findOne({ emil: req.body.emil })
  if (user) {
    //return res.redirect('/admin/user-edit?message=登录邮箱已存在')
    return next(JSON.stringify({path:'/admin/user-edit',message:'登录邮箱已存在'}))
  } else { 
    User.create(req.body)
    if (req.session.role == '总管') {
      res.redirect('/admin/normaluser')
    } else { 
      res.redirect('/admin/superuser')
    }
  }
 }
