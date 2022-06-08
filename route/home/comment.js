//导入评论规则
const { Comment } = require('../../model/comment')
module.exports = (req, res) => { 
  let { content,uid, aid } = req.body
  //将评论添加到数据库中
  Comment.create({
    content:content,
    uid:uid,
    aid: aid,
    date:new Date()
  })
  //重定向回刚刚的详情页
  res.redirect('/home/article?id='+aid)
}
