layui.use(["form","table"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table;
	  //监听单选按钮的点击
	  form.on('radio(levelM)', function(data){
		  if(data.value == 0){//单机
			  $("#platform").hide();
		  }else if(data.value == 1){//联网
			  $("#platform").show();
		  }
	  })
	  
	  //监听保存按钮
	   form.on('submit(component-form-demo1)', function(data){
		   
	   })
})
