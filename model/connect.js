const mongoose = require("mongoose");

//使用账号进行数据库连接user(这里写数据库用户名):user(这里写用户密码)@localhost:27017(这里是需要的端口号，默认27017可以省略)/blog"
mongoose
  .connect("mongodb://localhost/blog")
  .then(() => {
    console.log("连接成功");
  })
  .catch((err) => {
    console.log("连接失败");
  });
