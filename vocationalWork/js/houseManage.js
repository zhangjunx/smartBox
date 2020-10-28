layui.use(["form","table"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table;
	
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
				  {type:'checkbox'},
		    	  {field:'NAME', title:'序号', width:150},
			      {field:'PHONENUM', title:'楼栋名称', width:200,sort:true},
			      {field:'STUDENTS', title:'门牌号', width:200,sort:true},
			      {field:'CREATEDATE', title:'房主姓名', width:200,sort:true},
				  {field:'CREATEDATE', title:'联系方式', width:200,sort:true},
				  {field:'CREATEDATE', title:'房主身份证号', width:200,sort:true},
			      {field:'REMARK', title:'操作', width:350,templet:function(){
					  var $a1="<a class='layui-btn layui-btn-xs layui-bg-gray'></i>查看</a>";
					  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>编辑</a>";
					  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
					  return $a1+$a2+$a3;
				  }},
			    ]]
		    ,page: true
		  });
})

//点击新增
 $('#add').click(function(){
	 layer.open({
		 type:2,
		 title:"添加房屋",
		 content:"houseManage_add.html",
		 area:["90%","91%"],
	 })
});