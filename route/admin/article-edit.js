module.exports = (req, res) => { 
  //设置标识到模板全局(currentLink)，判断当前为用户管理还是文章管理
  req.app.locals.currentLink = 'article'
  res.render('admin/article-edit.art')
}
