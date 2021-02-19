var exportData;
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate=layui.laydate;
	  
	  lay('.date').each(function() {
	  	laydate.render({
	  		elem : this,//元素
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
			title:"车辆进出记录",
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
				  {field:'NAME', title:'车牌号', width:150},
			      {field:'PHONENUM', title:'车牌颜色', width:200,sort:true},
			      {field:'STUDENTS', title:'车身颜色', width:250,sort:true},
			      {field:'CREATEDATE', title:'车辆类型', width:200,sort:true},
				  {field:'CREATEDATE', title:'车辆类别', width:250,sort:true},
				  {field:'CREATEDATE', title:'车主姓名', width:250,sort:true},
				  {field:'CREATEDATE', title:'车主联系电话', width:250,sort:true},
				  {field:'CREATEDATE', title:'进出状态', width:250,sort:true},
				  {field:'CREATEDATE', title:'设备名称', width:250,sort:true},
				  {field:'CREATEDATE', title:'进出时间', width:250,sort:true},
			      {fixed: 'right', title:'操作', width:350,templet:function(){
					  var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='watch'>查看</a>";
					  return $a1;
				  }},
			    ]],
				page: true,
				done:function(res){
					exportData=res.data;
				}
		  });
		  $("#export").click(function(){
				table.exportFile("LAY-user-manage",exportData, "xls");
		  })
})
//点击打印
$("#print").click(function(){
	print("LAY-user-manage");
})
