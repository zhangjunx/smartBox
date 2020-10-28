$(function(){
	
})
layui.use("form",function(){
	var form=layui.form;
})
//点击模块
$(document).on("click",".module-list li",function(){
	$(this).addClass("curr").siblings().removeClass("curr");
})
//点击人员
$(document).on("click",".personBox li",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
})
//点击人员全选
$(".power h2 span").click(function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
		$(".personBox li").removeClass("curr");
	}else{
		$(this).addClass("curr");
		$(".personBox li").addClass("curr");
	}
})
