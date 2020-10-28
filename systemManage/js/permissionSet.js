$(function(){
	
})
//点击模块
$(document).on("click",".module-list li",function(){
	$(this).addClass("curr").siblings().removeClass("curr");
})
//点击复选框
$(document).on("click","table .checkbox",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else {
		$(this).addClass("curr");
	}
})