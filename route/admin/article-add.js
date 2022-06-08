//导入formidable模块
const formidable = require('formidable')
const path = require('path')
const { Article } = require('../../model/article')

module.exports = (req, res) => {
  //1. 创建表单解析对象,multiples配置是否可以进行多个文件上传，uoloadDir配置上传文件的存放位置,KeepExtensions配置保留上传文件的后缀
  const form = formidable({ multiples: true, uploadDir: path.join(__dirname, '../', '../', 'public', 'uploads'), keepExtensions: true })
  //4. 解析表单,fields保存了普通表单数据，files保存了和上传相关的表单数据
  form.parse(req, async(err, fields, files) => {
    //在files中存储了cover的属性，在cover属性中path属性用于存储图片的路径，直接调用path访问的是本机路径而不是服务器电脑路径，所以需要切割
    // \代表服务器端的绝对路径，即需要的是public之后路径
    //files.cover.path.split('public')[1]
    await Article.create({
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.filepath.split('public')[1],
      content: fields.content
    })
    res.redirect('/admin/article')
  })
}
