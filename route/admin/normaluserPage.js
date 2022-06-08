const {User} = require('../../model/user')

module.exports = async (req, res) => {
  //设置标识到模板全局(currentLink)，判断当前为用户管理还是文章管理
  req.app.locals.currentLink = 'user'
  //获取当前页码，||为或者
  let page = req.query.page || 1
  //设置每一页显示的个数
  const pagesize = 5
  //查询用户的总数量，使用user集合下的countDocuments方法
  let count = await User.countDocuments({})
  //总页数，向上取整
  let total = Math.ceil(count/pagesize)
  //查询所有用户
  //使用limit()方法限制查询结果的数量，每页显示多少条数据就限制多少条
  //skip()方法设置开始查询的数量，例如第一页查询1-5，第二页查询6-10，数量=（当前页-1）*每页显示页数
  let Users = await User.find({}).limit(pagesize).skip((page-1)*pagesize)
  res.render("admin/normaluser", {
    Users: Users,
    page: page,
    total: total,
    count:count
  });
}
