$(function(){
	// if(sessionStorage.sessionID== "undefined" ||sessionStorage.sessionID==null||sessionStorage.sessionID==""){
		 //  window.location.href="../index.html";
	// }
})
//点击退出
$("#exit").click(function(){
 sessionStorage.sessionID="";
 window.location.href="login.html";
})
//获取当前登录用户信息
function getOneInfo(){
	$.ajax({
		url:url+"/user/getOneInfo",
		type:"post",
		data:{"fid":getUrlParam("fid")},
		success:function(data){
			console.log(data);
			if(data.result){
				 $("#loginUser").html(data.data.USERNAME);
				 if(data.data.LOGINIMG!=undefined&&data.data.LOGINIMG!=null&&data.data.LOGINIMG!=""){
						$("#loginUserImg").attr("src","data:image/png;base64,"+data.data.LOGINIMG);
				}
			}
		}
	})
}
//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var paramsString = window.location.search.substring(1);
    var r = window.decodeURIComponent(window.atob(paramsString)).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}