
//微信
$('.icon_r>img').mouseover(function () {
  $('.icon_r2').css('display', 'block')
})
$('.icon_r>img').mouseout(function () {
  $('.icon_r2').css('display', 'none')
})


//点击学生系统跳转到系统页面时,把localStorage清除掉
localStorage.clear()



//介绍简章
$('.guide').bind('mouseenter',function () {
  $(this).children('.display').children('.behind').css('display', 'block');
  $(this).children('.display').children('.behind').animate({left: '0px'}, 1000);
})
$('.guide').bind('mouseleave',function () {
  $(this).children('.display').children('.behind').animate({left: '-200px'}, 500);
})

//资讯部分
//资讯列表和li的border切换
$('.l_b1').hover(function () {
  $('#b1').css('display', 'block');
  $('#b2').css('display', 'none');
  $('#b3').css('display', 'none');
  $('.msg_left .msg_t .border').css('left', '39px');
  $('.msg_left .msg_t .border').css('width', '100px');

})
$('.l_b2').hover(function () {
  $('#b1').css('display', 'none');
  $('#b2').css('display', 'block');
  $('#b3').css('display', 'none');
  $('.msg_left .msg_t .border').css('left', '130px');
  $('.msg_left .msg_t .border').css('width', '100px');

})
$('.l_b3').hover(function () {
  $('#b1').css('display', 'none');
  $('#b2').css('display', 'none');
  $('#b3').css('display', 'block');
  $('.msg_left .msg_t .border').css('left', '228px');
  $('.msg_left .msg_t .border').css('width', '120px');

})

$('.c_b1').hover(function () {
  $('#c1').css('display', 'block');
  $('#c2').css('display', 'none');
  $('#c3').css('display', 'none');
  $('.msg_center .msg_t .border').css('left', '39px');
  $('.msg_center .msg_t .border').css('width', '100px');

})
$('.c_b2').hover(function () {
  $('#c1').css('display', 'none');
  $('#c2').css('display', 'block');
  $('#c3').css('display', 'none');
  $('.msg_center .msg_t .border').css('left', '130px');
  $('.msg_center .msg_t .border').css('width', '100px');

})
$('.c_b3').hover(function () {
  $('#c1').css('display', 'none');
  $('#c2').css('display', 'none');
  $('#c3').css('display', 'block');
  $('.msg_center .msg_t .border').css('left', '210px');
  $('.msg_center .msg_t .border').css('width', '138px');

})


//为播放按钮添加事件监听
btn.onclick = function () {
  if (v1.paused) {
    v1.play();
    btn.innerHTML = "<img  src='liuxue/img/pause.png'>";
  } else {
    v1.pause();
    btn.innerHTML = "<img  src='liuxue/img/play.png'>";
  }
}
//鼠标移出容器时播放按钮隐藏，移入时显示
$('#v1').mouseenter(function () {
  $('#btn').css('z-index', '500000');
})
$('#btn').mouseenter(function () {
  $('#btn').css('z-index', '500000');
})

$('#v1').mouseleave(function () {
  $('#btn').css('z-index', '0');
})


//播放视频时，广告隐藏，暂停时，显示广告
v1.onplay = function () {
  ads.style.display = 'none';
}
v1.onpause = function () {
  ads.style.display = 'block';
}


//合作大学
$('.country_t').bind('mouseenter',function () {
  $(this).children('.t_i').css('display', 'block');
  $(this).children('.t_i').stop(false, true).animate({top: '-195px'}, 500);
})
$('.country_t').bind('mouseleave',function () {
  $(this).children('.t_i').stop(false, true).animate({top: '0px'}, 500);
})



//设置超链接在新窗口打开
$('.country_c>ul>li>a').attr('target', '_blank');


//中心模块
$('.center_module1').mouseover(function () {
  $('.center_module .center_module1').css('background', '#ffe2cf')
})
$('.center_module1').mouseout(function () {
  $('.center_module .center_module1').css('background', '')
})
$('.center_module2').mouseover(function () {
  $('.center_module .center_module2').css('background', '#ffe2cf')
})
$('.center_module2').mouseout(function () {
  $('.center_module .center_module2').css('background', '')
})
$('.center_module3').mouseover(function () {
  $('.center_module .center_module3').css('background', '#ffe2cf')
})
$('.center_module3').mouseout(function () {
  $('.center_module .center_module3').css('background', '')
})


























