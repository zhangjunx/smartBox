layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate=layui.laydate;
	  
	  lay('.date').each(function() {
	  	laydate.render({
	  		elem : this,//元素
			type:"datetime",
	  		trigger : 'click',//怎么触发
	  	});
	  });
	  	
	
	  //监听搜索
	  form.on('submit(LAY-user-front-search)', function(data){
	    var field = data.field;
	    //执行重载
	    table.reload('LAY-user-manage', {
	      where: field
	    });
	  });
	  table.render({
		    elem: '#LAY-user-manage',
		    url:url+'/parentUser/getList',
		    cellMinWidth: 80,
		    request:{
		    	pageName:"curpage",
		    	limitName:"pagesize",
		    },
		    parseData: function(res){ //res 即为原始返回的数据
		    	console.log(res);
		        return {
		          "code": res.result==true?"0":"", //解析接口状态
		          "msg": res.msg, //解析提示文本
		          "count": res.count, //解析数据长度
		          "data": res.data //解析数据列表
		        };
		      },
		    cols:  [[
		    	  {field:'NAME', title:'序号', width:150},
				  {field:'NAME', title:'操作人', width:150},
			      {field:'PHONENUM', title:'操作类别', width:200,sort:true},
			      {field:'STUDENTS', title:'操作内容', width:250,sort:true},
			      {field:'CREATEDATE', title:'登录IP', width:200,sort:true},
				  {field:'CREATEDATE', title:'操作时间', width:250,sort:true},
			    ]]
		    ,page: true
		  });
})
