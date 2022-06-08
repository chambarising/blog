    //创建方法为保存表单信息
    function serializeToJSON(form){
      var result = {}
      //获取表单控件内容
      var f = form.serializeArray()
      f.forEach(function(item){
        //result[item.name]相当与result.emil
        result[item.name]=item.value
      })
      return result
    }
