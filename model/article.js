//1.引入mongoose模块
const date = require('joi/lib/types/date')
const string = require('joi/lib/types/string')
const mongoose = require('mongoose')
//2.创建文章集合的规则
const articleSchema = new mongoose.Schema({
  //标题
  title: {
    type: String,
    maxlength: 20,
    minlength: 1,
    required:[true,'请填写文章标题']
  },
  //用户/作者,需要关联用户
  author: {
    //这个为关联的类型
    type: mongoose.Schema.Types.ObjectId,
    //ref为需要关联的集合的名称
    ref: 'User',
    required:[true,'请填写作者']
  },
  //发布时间
  publishDate: {
    type: Date,
    default:Date.now
  },
  //文章封面，存储的时封面路径
  cover: {
    type: String,
    default:null
  },
  //文章内容
  content: {
    type: String,
    required:true
  }
})
//3.根据规则创建集合
const Article = mongoose.model('Article',articleSchema)
//4.将集合规则做为成员进行导出
module.exports = {
  Article
}
