if(getUrlParam("fid")!=undefined&&getUrlParam("fid")!=null&&getUrlParam("fid")!=""){//编辑
	getOneInfo();
}else{//新增
	$("#fid").val("");
}
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	  
	 lay('.date').each(function() {
			laydate.render({
				elem : this,//元素
				trigger : 'click',//怎么触发
			});
	 });
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
		 var fid=$("#fid").val();
	     var obj=data.field;
	     obj.fid=fid;
	     obj.status=status;
	     if($("#schoolList .layui-form-checked").length==0){
	    	 layer.msg("请选择校区权限!",{time:2000});
	    	 return;
	     }
	     var schoolList=[];
	     for(var i=0;i<$("#schoolList .layui-form-checked").length;i++){
	    	 var schoolid=$("#schoolList .layui-form-checked").eq(i).prev().attr("name");
	    	 schoolList.push({"schoolID":schoolid});
	     }
	     obj.schoolList=schoolList;
	     var src=$("#img").attr("src");
	     var formdata=new FormData();
	     if(src.indexOf('data:image')>-1){
	    	 // base64 图片操作
	    	 var file=dataUrlToFile(src,"icon.png");
	    	 formdata.append("file", file);	
	     }else if(src!="../image/add_img.png"&&src.indexOf('data:image')==-1){
	    	 formdata.append("file", $("#logoIpt")[0].files[0]);
	     }
	     formdata.append("str",JSON.stringify(obj));
	     $.ajax({
	    	 url:url+'/user/addUserInfo',
	    	 type:"post",
	    	 data:formdata,
	    	 cache:false,
			 contentType:false,
			 processData:false,
	    	 success:function(res){
	    		 console.log(res);
	    		 if(res.result){
	    			 layer.msg(res.msg,{time:1000},function(){
	    				 parent.layer.closeAll();
	    				 window.parent.location.reload();
	    			 })
	    		 }else{
	    			 layer.msg(res.msg,{time:2000});
	    		 }
	    	 }
	     })
    });
	 //点击取消
	 $("#resetData").click(function(){
		parent.layer.closeAll();
	 })
	 /* 自定义验证规则 */
	    form.verify({
	    	phoneNum: function(value){
		    var reg=/^1[3456789]\d{9}$/;
	        if(!reg.test(value)){
	          return '请正确输入手机号!';
	        }
	      },
	    });
})

//点击选择车主
$("#selectPerson").click(function(){
	layer.open({
		type:1,
		content:$("#layer-selectPerson"),
		title:"选择车主",
		area:["70%","71%"]
	})
})



//编辑时获取一条信息
function getOneInfo(){
	$.ajax({
		url:url+"/user/getOneInfo",
		type:"post",
		data:{"fid":getUrlParam("fid")},
		async:false,
		success:function(data){
			if(data.result){
				 $("#fid").val(data.data.FID);
				 $("#userName").val(data.data.USERNAME);
				 $("#userCode").val(data.data.USERCODE);
				 $("#password").val(data.data.LOGINPASSWORD);
				 $("#remark").val(data.data.REMARK);
				 $("#phoneNum").val(data.data.PHONENUM);
				 if(data.data.LOGINIMG!=undefined&&data.data.LOGINIMG!=null&&data.data.LOGINIMG!=""){
						$("#img").attr("src","data:image/png;base64,"+data.data.LOGINIMG);
				}
				//开关赋值
				if(data.data.STATUS=="0"){
					$("#status").attr("checked",false);
					status=0;
				}
				var schoolList=data.data.SCHOOLIDS.split(",");
				console.log(schoolList);
				for(var item of schoolList){
					$("#schoolList input[name="+item+"]").attr("checked",true);
				}
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('checkbox');
				})
			}
		}
	})
}
//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}