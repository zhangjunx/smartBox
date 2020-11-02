function print (tablelayid){
	var v = document.createElement("div");
	var f = ["<head>", "<style>", "body{font-size: 12px; color: #666;}", "table{width: 100%; border-collapse: collapse; border-spacing: 0;}", "th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}", "a{color: #666; text-decoration:none;}", "*.layui-hide{display: none}", "</style>", "</head>"].join("");
	$(v).append($(".layui-table-box").find(".layui-table-header").html());
	$(v).find("tr").after($("[lay-id=\"" + tablelayid+ "\"] .layui-table-body.layui-table-main table").html());
	$(v).find("th.layui-table-patch").remove();
	$(v).find(".layui-table-col-special").remove();
	var h = window.open("打印窗口", "_blank");
	h.document.write(f + $(v).prop("outerHTML"));
	h.document.close();
	h.print();
	h.close();
}