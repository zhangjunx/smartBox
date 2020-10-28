$(function(){
	
})
layui.use("form",function(){
	var form=layui.form
})
$("#add").click(function(){
	layer.open({
		type:2,
		title:"新增",
		content:"permissionGroup_add.html",
		area:["95%","96%"]
	})
})