
var pcount = Participant.length-1;//参加人数
var runing = true;//是否运行
var isrun=false;//是否正在运行
//var inUser = (Math.floor(Math.random() * 10000)) % 5 + 1;
var Lotterynumber = 5; //设置单次抽奖人数
var Circular=0;//定义循环
var prize,//奖项
	prizeNum=0,//奖项人数
	prizeOrder=0,//抽奖批次
	prizeOnNum=0;//当前奖项序列
var prizeWinning;//中奖者
var Winning=[] ;
var getprize=0;
var editprize=false;
//弹出新增
$('.addprizeyuan').click(function(event) {
	$('.addprize').show();
	$(this).hide();
});
//关闭新增
$('.addprizeclose').click(function(event) {
	$('.addprize').hide();
	$('.addprizeyuan').show();
});
//新增提交
$('.but').click(function(event) {
	var i=0;
	var items=[];
	$('.additem').each(function(){
		if($(this).val()==''){
			i +=1;
			alert('数据不能为空！');
		}else{
			items.push($(this).val())
		}
	})
	if(items[1]%items[2]!=0){
		alert('奖项'+items[1]+'人，一次抽'+items[2]+'人，剩余'+items[1]%items[2]+'人，不够一批次，无法处理，请再次修改！')
		return false;
	}
	if(i==0){
		var html ='<div class="check " data-name="'+items[0]+'" data-num="'+items[1]+'" data-order="'+items[2]+'"><span></span>'+
					'<em></em>'+items[0]+'<i>'+items[1]+'个</i><br>'+
					'<label for="">中奖数量：<input type="number" class="num"  value="'+items[1]+'"></label>'+
					'<label for="">抽奖批次：<input type="number" class="order"  value="'+items[2]+'"></label></div>';
		$('.prize').append(html);
	}
	alleditprize()
	$('.addprize').hide();
	$('.addprizeyuan').show();
});
function alleditprize(){
	//编辑奖项
	$('.edit').click(function(event) {
		$('.confirm').show();
		$(this).hide();
		$('.prize').find('em').hide();
		$('.prize').find('label').show();
		$('.prize').find('span').show();
		editprize=true;
	});
	//确认编辑奖项
	$('.confirm').click(function(event) {
		$('.prize').find('input').each(function(event) {
			var val0 = $(this).val();
			var class0= $(this).attr('class');
			$(this).parents('.check').attr('class0',val0)
			if(class0=='num'){
				$(this).parents('.check').find('i').html(val0+'个')
			}

		});
		$('.edit').show();
		$(this).hide();
		$('.prize').find('em').show();
		$('.prize').find('label').hide();
		$('.prize').find('span').hide();
		editprize=false;
	});
	//删除奖项
	$('.prize').find('span').click(function(event) {
		$(this).parents('.check').remove();
	});
}

alleditprize();


$('.check').click(function(event) {
	if(editprize){
		return false;
	}
	$('.luck-content').show();
	pcount = Participant.length;
	$('.check').removeClass('on')
	$(this).addClass('on');
	prize=$(this).data('name');
	prizeNum=$(this).data('num');
	prizeOrder=$(this).data('order');
	prizeOnNum=$(this).index();
	var Winningtext=new Object();
	Winningtext.prizeOnNum=prizeOnNum;
	Winningtext.prize=prize;
	Winningtext.personnum=prizeNum;
	Winningtext.Order=prizeOrder;
	Winningtext.name=[];
	Winningtext.opid=[];
	var isused=0;
	getprize=0
	runing=true;
	if(prizeOrder>Participant.length){
		alert("奖品大于抽奖人数");
	}else{

		for(j = 0,len=Winning.length; j < len; j++) {
			if(Winning[j].prize==prize&&Winning[j].name.length>0){
				isused=1;
			}
		}
		if(isused!=1){
			sethtml(prizeOrder);
			Winning.push(Winningtext);
		}else{
			alert('奖品，已抽取！')
			prizeNum=0
		}
	}

});

$(function () {
	//$('.slot').css('background-image','url('+Participant[0].c_pic+')');
	//$('.name').html(Participant[0].c_name);
	$(document).keydown(function(e){
		if(!e) var e = window.event;
		if(e.keyCode==32){// 空格暂停
			if(isrun){
				stop();
			}
		}
		if(event.keyCode==13){//enter 回车进入
			console.log(runing);
			if(runing&&prizeNum!=0){
				//runing= true;
				start();
			}else{
				if(!isrun){
					alert('奖项为空，请选择奖项！')
				}
			}
		}
	});
});


// 开始停止
function start() {
	if (runing) {
		if ( pcount <= Lotterynumber ) {
			alert("抽奖人数不足5人");
		}else{
			isrun= true;
			runing = false;
			$('#start').text('停止');
			if(getprize>=prizeNum){
				//中奖人数 大于 奖品数；


			}else{
				startNum(prizeNum)
			}
		}
	} else {
		stop();
	}

}

//初始化 html
function sethtml(num){
	var html='';
	var getnum=num%2;//是否整除
	var th;
	if(num>15){
		alert('抽奖人数过多！')
	}else if(num%2==0){
		var th=num/2,tr=2;
		if(num%4==0){
			th=num/4;
			tr=4
		}
		if(num%5==0){
			th=num/5;
			tr=5
		}
		if(num%7==0){
			th=num/7;
			tr=7
		}
		for (var i = 0; i < th; i++) {
			td(tr,0)
		}
	} else if(num%3==0){
		var th=num/3,tr=3;

		if(num%5==0){
			th=num/5;
			tr=5
		}
		for (var i = 0; i < th; i++) {
			td(tr,0)
		}
	}else{
		if(num==1){
			th=1;
			td(th,0);
		}else{
			th=(num-1)/2;
			td(th,1)
			td(th*1+1,0)
		}
	}
	$('.ce-pack-end').html('').append(html)
	function td(num,half){
		if(num==1){
			html +='<div class="ce-pack-end-item" ><div class="luckwen">'+prize+'</div>'

		}else if(half==1){
			html +='<div class="ce-pack-end-item" ><div class="luckwen">'+prize+'</div>'
			html +='<div class="slotMachine" style="width:70px;border: none;background-color: inherit;"></div>';
		}else if(half==0){
			html +='<div class="ce-pack-end-item" style="width:'+num*180+'px"><div class="luckwen">'+prize+'</div>'
		}
		for (var i = 0; i < num; i++) {
			html +='<div class="slotMachine"><div class="slot">'+
					'<span class="name">姓名</span></div></div>';
		}
		html +='</div>'
	}


}

// 开始抽奖
function startLuck() {
	runing = false;
	$('#btntxt').removeClass('start').addClass('stop');
	startNum()
}

// 循环参加名单Circular list
function startNum() {
	//num = Math.floor(Math.random() * pcount);
	bb(prizeOrder,Participant.length);
	console.log(a);
	prizeWinning=a;
	for (var i = 0; i < prizeOrder; i++) {
		//var num=randomNum(0,10);console.log(num);Participant[0].c_pic
		$('.slot').eq(i).css('background-image','url(http://jointest.95005.com'+Participant[a[i]].c_pic+')');
		$('.name').eq(i).html(Participant[a[i]].c_name);
	}
	Circular = setTimeout(startNum, 40);
}

// 停止跳动
function stop() {
	pcount = Participant.length-1;
	clearInterval(Circular);
	Circular = 0;
	getprize +=prizeOrder;
	$('#start').text('开始');
	runing = true;
	isrun= false;
	console.log(runing);
	for(j = 0,len=Winning.length; j < len; j++) {
		if(Winning[j].prize==prize){
			for(k = 0,len=Winning.length; k < len; k++) {
				var num=prizeWinning[k];//中奖序号
				var obj= new Object();
				obj.name=Participant[num].c_name;
				obj.oid=Participant[num].openid;
				// 中奖者插入json
				Winning[j].name.push(obj)
				// 中奖者本地删除
				Participant.splice($.inArray(Participant[num], Participant), 1);
				//phone.splice($.inArray(phone[num], phone), 1);
			}
		}
	}
}
//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){
	switch(arguments.length){
		case 1:
			return parseInt(Math.random()*minNum+1,10);
		break;
		case 2:
			return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
		break;
		default:
			return 0;
		break;
	}
}

// 指定中奖人
function inUser() {


}

//随机 不重复 数
//返回false代表可以添加
var a=[0];
function aa(number){
	var z=false
	var num=number;
	for(var i=0;i< a.length;i++){
		if(a[i]==num){
			z=true;
		}
	}
	return z;
}
function bb(m,n){
	if(m>n){
		alert("你输入的范围不对，请重新输入");
	}else {
		for (var j=0;j<m;j++){
			var number=parseInt(Math.random()*n);
			while (true){
				if(aa(number)){
					number=parseInt(Math.random()*n);
				}else {
					a[j]=number;
					break;
				}
			}

		}
	}
}
