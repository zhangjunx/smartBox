//读卡
openReader();	
getDeviceSn();//获取设备sn
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

var sn;
var websocket = null;
//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    websocket = new WebSocket(ws+"/SyrisFactoryBD/websocket2");
}
else {
    layer.msg('当前浏览器 Not support websocket',{time:2000});
}

//连接发生错误的回调方法
websocket.onerror = function () {
    console.log("WebSocket连接发生错误");
};
//连接成功建立的回调方法
websocket.onopen = function () {
    console.log("WebSocket连接成功");
}
//接收到消息的回调方法
websocket.onmessage = function (event) {
    var res=JSON.parse(event.data);
    if(sn==undefined){
    	layer.msg("请选择设备!",{time:2000});
    }
    if(res.device_id==sn){
    	$("#img").attr("src","data:image/png;base64,"+res.id_image);
    	$("#scenePhoto").attr("src","data:image/png;base64,"+res.face_image);
    	$("#IDCard").val(res.id_number);
    	$("#IDName").val(res.name);
    	if(res.sex=="0"){
    		res.sex="男";
    	}else{
    		res.sex="女";
    	}
		("input[value="+res.sex+"]").attr("checked",true);
		layui.use("form",function(){
			var form=layui.form;
			form.render();
		})
    }
}
//连接关闭的回调方法
websocket.onclose = function () {
    console.log("WebSocket连接关闭");
}
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
	 websocket.close();
}
//发送消息
function send() {
    websocket.send(message);
}

//点击人证比对
$("#personPapers").click(function(){
	getDeviceSn();
	layer.open({
		type:1,
		title:"人证比对",
		content:$("#teminal"),
		area:["350px","200px"],
		btn:["确定","取消"],
		btnAlign:"c",
		yes:function(i){
			sn=$("#deviceSn").val();
			layer.close(i);
		}
	})
})
//获取设备sn
function getDeviceSn(){
	$.ajax({
		url:url+"/senseID/getEquipmentCode",
		type:"post",
		success:function(data){
			$("#deviceSn").empty();
			if(data.code=="200"){
				for(var item of data.result){
					if(item!=null){
						var $opt=$("<option vlaue='"+item+"'>"+item+"</option>");
						$("#deviceSn").append($opt);
					}
				}
				$("#deviceSn").val(sn);
			}
		}
	})
}
var stream;
var media=0;
var timer;
//访问用户媒体设备的兼容方法
function getUserMedia(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
    } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
    }
}

let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');	

function success(stream) {
    //兼容webkit核心浏览器
    let CompatibleURL = window.URL || window.webkitURL;
    //将视频流设置为video元素的源   
    stream = stream;
    //video.src = CompatibleURL.createObjectURL(stream);
    video.srcObject = stream;
    video.play();
   
	timer=setInterval(function(){
		contrastFace()
	},2000);
}

function error(error) {
    layer.msg("访问用户媒体设备失败!",{time:2000});
}


function contrastFace(){
	context.drawImage(video, 27,60,433,370,0,0,533,432);
	// 获取图片base64链接
	var image = canvas.toDataURL('image/png');
	// 定义一个img
	var img = document.getElementById("scenePhoto");
	//将图片添加到页面中
	img.src = image;
	var id_image = $("#idphoto1").attr("src");
	var file1 = dataURLtoFile(image, "idphoto.png"); //现场照
	var file2 = dataURLtoFile(id_image, "dataphoto.png");//证件照
	/*var formData = new FormData();
	formData.append("photo", file1);
	formData.append("photo", file2);*/
	var obj={"file1":id_image,"file2":image};
	//console.log(formData.getAll("photo"));
	$.ajax({
		 url: url+"/LH_FaceRecog/recog", // 发送地址
         type: "POST", // 数据提交类型
         data: obj, //发送数据
         dataType:"json",
	     success: function(data) {
	    	 console.log(data)
	 		 if(data.resultcode=="0"){
	 			//如果是0 成功
	            var score=data.score==undefined?0:data.score;
	            if(score>0.6){
			 		if(video.srcObject!=null){
			 			video.srcObject.getTracks()[0].stop(); //结束关闭流
			 		}
			 		clearInterval(timer);
	            }else{
                 	//layer.msg("识别失败，相似度太低！",{time:1000});
    	 			$(".process .pass").hide();
    		 		$(".process .failed").html("识别失败，相似度太低");
	            }
	 			
	 		 }else{
	 			layer.msg("识别失败！",{time:1000});
	 			$(".process .pass").hide();
		 		$(".process .failed").show();
	 		 }
	    },
	     error:function(data){
	    	if(video.srcObject!=null){
	    		video.srcObject.getTracks()[0].stop(); //结束关闭流
	    	}
	    	clearInterval(timer);
	    }
	})
}
//将base64转file文件
function dataURLtoFile(dataurl,filename){
		var arr=dataurl.split(',');
		var mime=arr[0].match(/:(.*?);/)[1];
		var bstr=atob(arr[1]);
		//var bstr=window.atob(arr[1]);
		var n=bstr.length;
		var u8arr=new Uint8Array(n);
		while(n--){
			u8arr[n]=bstr.charCodeAt(n);
		}
		//转换成file对象
		var obj= new File([u8arr],filename,{type:mime});
		//转换成blob对象
		//var obj=new Blob([u8arr],{type:mime});
		return obj;
}//end


//点击人脸采集
$("#Unlicensed_taking").click(function(){
	if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
	    //调用用户媒体设备, 访问摄像头
	    getUserMedia({ video: { width: 533, height: 432 } }, success, error);
	} else {
	    alert('不支持访问用户媒体');
	}
	layer.open({
		type:1,
		title:"拍摄取照",
		content:$("#personFace"),
		btn:["确定","取消"],
		area:["600px","600px"],
		btnAlign:"c",
		yes:function(index){
			if(video.srcObject==null){
				layer.msg("请连接摄像头!",{time:2000});
				return;
			}
			context.drawImage(video, 27,60,433,370,0,0,533,432);
			// 获取图片base64链接
			var image = canvas.toDataURL('image/png');
			// 定义一个img
			var img = document.getElementById("scenePhoto");
			//将图片添加到页面中
			img.src = image;
			if(video.srcObject!=null){
	 			video.srcObject.getTracks()[0].stop(); //结束关闭流
	 		}
			clearInterval(timer);
			layer.close(index);
		},
		btn2:function(index){
			if(video.srcObject!=null){
	 			video.srcObject.getTracks()[0].stop(); //结束关闭流
	 		}
			layer.close(index);
			clearInterval(timer);
		}
	})
})


//点击现场照选择图片
$("#sceneFile").change(function(){
	var imgUrl = getObjectURL(this.files[0]);
	$("#scenePhoto").attr("src", imgUrl);
})
function getObjectURL(file) {
	var url = null;
	if (window.createObjectURL != undefined) {
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) {
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) {
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}//end
//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}

//点击读卡
$("#readIDCard").click(function(){
	readIDCard();
})
//读卡
var socket;
function openReader() {
		var host = "ws://localhost:33666";
		if(socket == null){
			socket = new WebSocket(host);
		}else{
			console.log("已初始化.");
		}
		try {
			socket.onopen = function () {
				console.log("初始化成功.");
				//getVersion(); 
			};
			socket.onclose = function () {
				console.log("读卡服务已经断开.");
			};
			socket.onerror = function(){
				console.log("请检查控件是否正常安装.");
			};
			socket.onmessage = function (msg) {
				if (typeof msg.data == "string") {
					var msgM=msg.data+"";
					var msgJson = JSON.parse(msgM);
					//resultMsg(msgM);        
					switch(msgJson.fun) {

						case "EST_GetVersion#":
							layer.msg("版本号："+msgJson.errMsg,{time:2000})
						break;
							
						case "EST_Reader_ReadIDCard#":
							if (msgJson.rCode == "0") {
								$("#IDCard").val(msgJson.certNo);//身份证号码  
								$("#IDName").val(msgJson.name);
								$("#visitorssextext").val(msgJson.sex);
								("input[value="+msgJson.sex+"]").attr("checked",true);
								layui.use("form",function(){
										var form=layui.form;
										form.render();
								})
								$("#img").attr("src","data:image/png;base64,"+msgJson.base64Data);
								posBeep();
							}
							else if(msgJson.rCode == "-2"){
								layer.msg("请放身份证",{time:2000})
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000});
							}
							break;

						case "EST_ReadCertID#":
							if (msgJson.rCode == "0") {
								document.getElementById("cardid").value = msgJson.UID;  
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000})
							}
						break;
						
						case "EST_ReadBankCard#":
							if (msgJson.rCode == "0") {
								document.getElementById("text_Bank_ID").value = msgJson.bankCard;
								posBeep();
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000});
							}
							break;

						case "EST_ReadM1Card#":
							if (msgJson.rCode == "0") {
								console.log(msgJson)
								document.getElementById("carno").value = msgJson.UID; //IC卡卡号
								posBeep();
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000});
							}
							break;

						case "EST_ReadSocialCard#":   //社保卡信息，个别地区社保卡不按国家规范来的，会读取信息不全
							if (msgJson.rCode == "0") { 
								posBeep();
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000});
							}
							break;

						case "EST_IDRequest#":
								if (msgJson.rCode == "0") {
									layer.msg("找到身份证",{time:2000})
								}
								else {
									layer.msg(msgJson.errMsg,{time:2000});
								}
						break;

						default:
							break;
					}
				}
				else{
					layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
				}
			};
		}
		catch (ex) {
			layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
		}
	}

	//读取IC卡号，包括M1、CPU卡，8位16进制数据
	function readM1Card() {
		try { 
			if (socket.readyState == 1) {
				socket.send("EST_ReadM1Card#");  
			}
			else {
				layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
			}
		}
		catch (ex) {
			layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
		}
	}
	//蜂鸣器控制，可以自己选择是否蜂鸣
	function posBeep() {
		if (socket.readyState == 1) {
				socket.send("EST_PosBeep#");
			}
			else {
				layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
			}
	}
	//读取身份证信息
	function readIDCard() {
		try {
			if (socket.readyState == 1) {
				socket.send("EST_Reader_ReadIDCard#");    
			}
			else {
				layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
			}
		}
		catch (ex) {
			layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
		}
	}//end
	

