window.onload = function(){
	showTime();//显示当前系统时间
	countDown();
	preparePlacehoder();
	prepareGallery();
}
function showPic(whichpic) {
	if (!document.getElementById('placeholder')) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById('placeholder');
	if (placeholder.nodeName != "IMG") return false;
	placeholder.setAttribute("src",source);//虽然可以用 placeholder.src = source;但是用setAttribute()方法，可移植性、兼容性更好。
	//替换描述,锦上添花内容，不是主要内容
	if (document.getElementById('description')) {
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") :"";
		var description = document.getElementById('description');
		if(description.firstChild.nodeType == 3){
			description.firstChild.nodeValue = text;
		}
	}
	return true;
}

function prepareGallery() {
	//对象检测，向后兼容考虑
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	//渐进增强，不应该让JS代码对网页结构有任何依赖
	if (!document.getElementById('imagegallery')) return false;

	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return !showPic(this);//平稳退化考虑。如果showPic返回false,则允许链接默认行为发生
		}
		
	}
}

function preparePlacehoder(){
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('imagegallery')) return false;
	var placeholder = document.createElement("IMG");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","img/1.jpg");
	placeholder.setAttribute("alt","图片1");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var tex = document.createTextNode("图片1");
	description.appendChild(tex);
	// var b = document.getElementsByTagName("body")[0];
	// b.appendChild(placeholder);
	// b.appendChild(description);
	var gallery = document.getElementById('imagegallery');
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);

}

//在已有元素之后插入新元素
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);		
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//显示系统当前时间
function checkMS(i){
	if(i < 10){
		i = "0" + i;
	}
	return i;	
}//补位处理

function showTime(){
	var system_date = new Date();
	var year = system_date.getFullYear();//返回4位数年份
	var month = system_date.getMonth() + 1;//月份 返回0-11
	var day = system_date.getDate();//一月中的某一天（几号)
	var weekday = system_date.getDay();//星期几 返回0-6
	var whichweekday = new Array();
	whichweekday[0] = "日";
	whichweekday[1] = "一";
	whichweekday[2] = "二";
	whichweekday[3] = "三";
	whichweekday[4] = "四";
	whichweekday[5] = "五";
	whichweekday[6] = "六";
	var hour = system_date.getHours();	
	var mintue = system_date.getMinutes();//分钟，0-59
	var second = system_date.getSeconds();//秒，0-59
	mintue = checkMS(mintue);
	second = checkMS(second);
	
	var Time = document.getElementById('time');

	var time = year + "年" + month + "月" + day + "日" + "星期"+ whichweekday[weekday] + hour + ":" + mintue + ":" + second;
	Time.innerHTML = "现在是：" + time;
	setTimeout("showTime()",500);
}

//倒计时效果，以天计
/*function countDown() {
	var now = new Date();
	var overtime = new Date("2016,6,29");
	var count_down = overtime.getTime() - now.getTime();//得到毫秒数
	//转换成天，1天=24小时，1小时=60分，1分=60秒，1秒=1000毫秒
	var count_down = Math.ceil(count_down/(24*60*60*1000));
	document.getElementById("countdown").innerHTML = "离毕业离校还有" + count_down + "天";
}*/


//倒计时效果，精确计算
function countDown(){
	var now = new Date();
	var overtime = new Date("2016/10/15,0:0:0");//设置结束时间
	var count_down = overtime.getTime() - now.getTime();
	var day = parseInt(count_down/(24*60*60*1000));
	var hour = parseInt(count_down/(60*60*1000)%24);
	var mintue = parseInt(count_down/(60*1000)%60);
	var second = parseInt(count_down/1000%60);
	mintue = checkMS(mintue);
	second = checkMS(second);
	document.getElementById('countdown').innerHTML = "倒计时"+day+"天"+hour+"小时"+mintue+"分" + second+"秒";
	setTimeout("countDown()",500);
}


