// 导入文章集合用于查询文章列表
const { Article } = require('../../model/article')
//导入mongoose-sex-page模块用于分页
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => { 
  //接收当前页码
  const page = req.query.page || 1
  //设置标识到模板全局(currentLink)，判断当前为用户管理还是文章管理
  req.app.locals.currentLink = 'article'
  //查询所有文章数据,使用populate进行联合查询它会根据之前定义的关联（在定义规则时，对作者进行了id关联）对括号内想要查询的内容进行查询，这里想要关联的作者名就填作者名，结尾要加.lean()不然会报错
  //let articles = await Article.find().populate('author').lean()

  //使用集合下的countDocuments方法查询总文章数
  let count = await Article.countDocuments({})

  //page指定当前页，size指定每页显示的数据条数，display指定客户端底下要显示的页码数，exec向数据库发送请求数据
  let articles = await pagination(Article).find().page(page).size(4).display(3).populate('author').exec()
  //当集合联合查询和渲染页面模板同时进行时会导致两者冲突，从而导致无法渲染页面。所以报错,需进行格式转换
  let str = JSON.stringify(articles)
  let json = JSON.parse(str)

  res.render('admin/article.art', {
    articles: json,
    count:count
  })
}
