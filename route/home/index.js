//导入文章集合，对文章进行查询
const { Article } = require('../../model/article')
//导入分页模块
const pagination = require('mongoose-sex-page')
module.exports = async (req, res) => {
  //接收页码
  let page = req.query.page || 1
  //查询数据
  let result = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec()
    //当集合联合查询和渲染页面模板同时进行时会导致两者冲突，从而导致无法渲染页面,,所以报错,需进行格式转换
    let str = JSON.stringify(result)
    let json = JSON.parse(str)
  res.render('home/default', {
    result:json
  })
}
