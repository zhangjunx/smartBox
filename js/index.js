$(function(){
	
})
//点击布局排列1,4,8
$(".layout").click(function(){
		var id=$(this).attr("data-id");
		if(id == 1){
			$(".con-center-1").show();
			$(".con-center-4").hide();
			$(".con-center-8").hide();
		}else if(id == 4){
			$(".con-center-1").hide();
			$(".con-center-4").show();
			$(".con-center-8").hide();
		}else if(id == 8){
			$(".con-center-1").hide();
			$(".con-center-4").hide();
			$(".con-center-8").show();
		}
})