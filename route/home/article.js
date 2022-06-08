//导入文章集合
const { Article } = require('../../model/article')
//导入评论集合
const { Comment } = require('../../model/comment')
module.exports = async (req, res) => { 
  //接收id参数用于查询对应的文章
  const id = req.query.id

  //根据id对评论进行查找,同时联合查询评论的用户
  let comment = await Comment.findOne({ aid: id }).populate('uid')
  //当集合联合查询和渲染页面模板同时进行时会导致两者冲突，从而导致无法渲染页面,,所以报错,需进行格式转换
  let com = JSON.stringify(comment)
  let comments = JSON.parse(com)

  let result = await Article.findById({ _id: id }).populate('author')
  //当集合联合查询和渲染页面模板同时进行时会导致两者冲突，从而导致无法渲染页面,,所以报错,需进行格式转换
  let str = JSON.stringify(result)
  let json = JSON.parse(str)
  res.render('home/article.art', {
    result: json,
    comment:comments
  })
}
