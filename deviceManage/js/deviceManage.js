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
		    	  {field:'NAME', title:'序号', width:150},
				  {field:'NAME', title:'设备名称', width:150},
			      {field:'PHONENUM', title:'设备类型', width:200,sort:true},
				  {field:'PHONENUM', title:'设备厂家', width:200,sort:true},
				  {field:'PHONENUM', title:'通道名称', width:200,sort:true},
				  {field:'PHONENUM', title:'安装位置', width:200,sort:true},
				  {field:'PHONENUM', title:'进出状态', width:200,sort:true},
				  {field:'PHONENUM', title:'设备SN', width:200,sort:true},
				  {field:'PHONENUM', title:'设备IP', width:200,sort:true},
				  {field:'PHONENUM', title:'端口号', width:200,sort:true},
				  {field:'PHONENUM', title:'设备Mac', width:200,sort:true},
				  {field:'PHONENUM', title:'设备账号', width:200,sort:true},
				  {field:'PHONENUM', title:'设备密码', width:200,sort:true},
				  {field:'PHONENUM', title:'设备在线时间', width:200,sort:true},
				  {field:'PHONENUM', title:'网络状态', width:200,sort:true},
				  {field:'PHONENUM', title:'在线状态', width:200,sort:true},
				  {field:'PHONENUM', title:'是否启用', width:200,sort:true},
			      {fixed: 'right', title:'操作', width:350,templet:function(){
					  var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='watch'>查看</a>";
					  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs'>编辑</a>";
					  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs'>删除</a>";
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
		 title:"添加设备",
		 content:"deviceManage_add.html",
		 area:["90%","91%"],
	 })
});
