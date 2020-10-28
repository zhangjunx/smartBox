   layui.use(['layer','form'], function(){
     var layer = layui.layer;
	 var form=layui.form;
	 form.render();
   }); 
	//判断页面是否存在cookie
    if ($.cookie("rmbUser") == "true") { 
  	     $("#rememberPw").next().addClass("layui-form-checked"); 
           $("#LAY-user-login-username").val($.cookie("userName")); //给页面用户名赋值
           $("#LAY-user-login-password").val($.cookie("passWord")); //给页面密码赋值
    } 
    
    //提交
    $("#login").click(function(){
    	var index=layer.load(2);
		var username=$("#LAY-user-login-username").val();
		var password=$("#LAY-user-login-password").val();
    	saveUserInfo();
      //请求登入接口
       $.ajax({
    	  url:"/EducationManager/login/login",
      	  type:"post",
      	  data:{"userName":username,"password":password},
      	  success:function(data){
      		  layer.close(index);
      		  if(data.result){
      			sessionStorage.sessionID=data.data.sessionID;
      			var username=data.data.USERNAME;
      			var usercode=data.data.USERCODE;
      			if(usercode==0){//超级管理员
      				layer.msg(data.msg, {
                        time: 1000
                      }, function(){
                        location.href = 'views/admin.html?'+window.btoa(window.encodeURIComponent("userName="+username+"&fid="+data.data.FID+"&usercode="+usercode)); //后台主页
                      }); 
      			}else{
      				layer.msg(data.msg, {
                        time: 1000
                      }, function(){
                        location.href = 'views/home.html?'+window.btoa(window.encodeURIComponent("userName="+username+"&fid="+data.data.FID+"&usercode="+data.data.USERCODE)); //后台主页
                      }); 
      			}
      			
      		  }else{
      			  layer.msg(data.msg,{time:2000});
      		  }
      	  },
      	  error:function(){
      		layer.close(index);
      	  }
      }) 
    }); 
	

 //保存用户信息 
function saveUserInfo() { 
 if ($("#rememberPw").next().hasClass("layui-form-checked")) { 
	 var userName = $("#LAY-user-login-username").val(); 
	 var passWord = $("#LAY-user-login-password").val(); 
	 $.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie 
	 $.cookie("userName", userName, { expires: 7 }); // 存储一个带7天期限的 cookie 
	 $.cookie("passWord", passWord, { expires: 7 }); // 存储一个带7天期限的 cookie 
 } 
 else 
 { 
	 $.cookie("rmbUser", "false", { expires: -1 }); 
	 $.cookie("userName", '', { expires: -1 }); 
	 $.cookie("passWord", '', { expires: -1 }); 
 }
}