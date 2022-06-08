//引入joi模块，joi模块用户验证信息是否按规范填写
const joi = require('joi')

//定义验证规则
const schema = {
  //joi.string为指定为字符串型
  username: joi.string().min(2).max(10).required().error(new error('用户名填写有误')),
  emil: joi.string().email().error(new error('邮箱格式有误')),
  passwords: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new error('密码格式有误')),
  //joi.valid为设置合法值
  role: joi.string().requird().valid('普通用户','超级管理员').required().error(new error('没有选中用户类型')),
  state:joi.boolean().required().error(new error('状态没有选定'))
}

//实施验证，第一个参数为需要验证的对象，第二个为验证的规则
joi.validate({username:'ab0'},schema)
