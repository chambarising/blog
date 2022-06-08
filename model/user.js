const mongoose = require("mongoose");
//引入joi模块，joi模块用户验证信息是否按规范填写
const joi = require('joi')

//创建集合规则
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true,
  },
  emil: {
    type: String,
    //保证邮箱的唯一性
    unique: true,
    required: true,
    trim: true,
  },
  passwords: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    //规定只能为普通用户或管理员或总管
    enum: ["普通用户", "超级管理员","总管"],
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
});

//创建集合
const User = mongoose.model("User", UserSchema);

//创建基础用户
/*User.create({
  username: "测试",
  emil: "123456789@qq.com",
  passwords: "123456",
  role: "超级管理员",
  state: true,
});*/

//创建joi验证规则
const validateUser = async (user) => {
  const schema = {
    //joi.string为指定为字符串型
    username: joi.string().min(2).max(10).required().error(new Error('用户名填写有误，最少2个字符，最多10个字符！')),
    emil: joi.string().email().error(new Error('邮箱格式有误，请填写正确的邮箱！')),
    passwords: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required().error(new Error('密码格式有误,请输入6位有效字母或数字！')),
    //joi.valid为设置合法值
    role: joi.string().required().valid('普通用户', '超级管理员').required().error(new Error('没有选中用户类型！')),
    state: joi.boolean().required().error(new Error('状态没有选定！'))
  }
  //实施验证，第一个参数为需要验证的对象，第二个为验证的规则
  await joi.validate(user, schema)
}
//将User集合导出，给其他文件在添加用户时使用
module.exports = {
  User,
  validateUser
};
