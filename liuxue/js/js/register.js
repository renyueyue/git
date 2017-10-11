//验证:手机号格式是否符合规则
var uname = document.querySelector('#uname');
uname.onblur = name;
function name() {
  var tel = /^ [\+86]|[0086]?\s*1[34578]\d{9}$/;
  if (!(uname.value)) {
    $('#uname').next('.msg-default').removeClass("hidden");
    $('#uname').next('.msg-default').html('手机号不能为空!');
  } else if (!(tel.test(uname.value))) {
    $('#uname').next('.msg-default').removeClass("hidden");
    $('#uname').next('.msg-default').html('手机号码输入不正确!');
  } else {
    $('#uname').next('.msg-default').addClass("hidden");

  }
}
//验证密码格式
var upwd = document.querySelector('#upwd');
upwd.onblur = pwd;
function pwd() {
  console.log('密码');
  var pwd = /\d{6,8}/;
  if (!(upwd.value)) {
    $('#upwd').next('.msg-default').removeClass("hidden");
    $('#upwd').next('.msg-default').html('密码不能为空!');
  } else if (!(pwd.test(upwd.value))) {
    $('#upwd').next('.msg-default').removeClass("hidden");
    $('#upwd').next('.msg-default').html('密码必须为6-8位数字!');
  } else {
    $('#upwd').next('.msg-default').addClass("hidden");
  }
}

//设置出生日期:插件layDate ,验证选择的出生日期是否符合范围
laydate({
  elem: '#ubirthday',
  theme: 'molv',
  format: 'YYYY年MM月DD日',
  max: laydate.now(), //最大日期  为今天
  min: '1937-01-01', //设定最小日期为当前日期
  istime: true,       //是否开启时间选择
  istoday: true,    //显示今天
  festival: true,  //显示节日
  fixed: false, //是否固定在可视区域
  event: 'click',   //默认是click
  //设置日期并判断
  choose: function (dates) {  //选择日期完毕的回调
    //设置的日期范围 转换格式位ms
    var min = '1937/01/01';
    var mins = new Date(min).getTime();
    var max = laydate.now();
    var reg = /[\u4e00-\u9fa5]/g;
    var maxzhge = max.replace(reg, '/');
    var maxs = (new Date(maxzhge)).getTime();
    // console.log(maxs);

    //得到用户选择的日期-转化格式为:YYYY/MM/DD  转为ms
    var zhgsuser = dates.replace(reg, '/');
    var ehs = new Date(zhgsuser).getTime(); //得到ms
    if (!(ubirthday.value)) {
      $('#ubirthday').next('.msg-default').removeClass("hidden");
      $('#ubirthday').next('.msg-default').html('日期不能为空!');
    } else if (zhgsuser < mins || zhgsuser > maxs) {
      $('#ubirthday').next('.msg-default').html('日期不能小于1937/01/01');
    } else {
      $('#ubirthday').next('.msg-default').addClass("hidden");
    }
  }
})
laydate.skin('molv');
//定义倒计时函数: 获取短信验证码:倒计时60s
function countDown() {
  $('.getSecond>a').unbind('click');
  var time = 60;//默认60秒, 测试可改成5s
  var t = setInterval(function () {
    time--;
    $('.getSecond>a').html(time + 's后再次获取');
    if (time < 0) {
      $('.getSecond>a').html('再次获取');
      clearInterval(t);
      $('.getSecond>a').bind('click', countDown);
      t = null;
    }
  }, 1000);
}
//给超链接绑定倒计时函数
$('.getSecond>a').bind('click', countDown);

//阅读规则,点击接受,切换图片
var ugree = document.getElementById("uagree");
$('.accept').click(
  function () {
    if (ugree.checked == false) {
      $('#uagree').css('opacity', '1');
      ugree.checked = true;
      $('#register').removeAttr('disabled');
    } else if (ugree.checked == true) {
      $('#uagree').css('opacity', '0.2');
      ugree.checked = false;
      $('#register').attr('disabled', 'true');
    }
  }
)

//方法1: ng：只有选择了：checkbox同意，才能提交
// var app = angular.module('myApp', ['ng']);
// app.controller('myCtrl', function ($scope) {
//   $scope.register = function () {
//     console.log($scope.phone);
//     console.log($scope.pwd);
//     console.log($scope.birthday);
//     console.log($scope.isAgree);
//   }
// });
//方法2：只有选择了：checkbox同意，才能提交

//点击注册 发起异步请求
$('#register').click(function () {
  //如果输入框无值,则提示错误
  if ((!uname.value) || (!upwd.value)
    || (!($('#uname').next().hasClass('hidden')))
    || (!($('#upwd').next().hasClass('hidden')))) {
    $('#errorMsg').fadeIn();
    $('.close-error').html('请再次检查用户名、密码、出生日期是否填写正确!!!');
    isreg();//如果用户不点击关闭按钮,会在8s之后自动关闭
  } else {
    //把用户输入的出生日期,转为ms
    var reg = /[\u4e00-\u9fa5]/g;
    var zhgsuser = ubirthday.value.replace(reg, '/');
    var ehs = new Date(zhgsuser).getTime(); //得到ms
    $.ajax({
      url: "../php/check_sname_r.php",
      type: 'get',
      dataType: 'jsonp',
      jsonp: "callback",
      data: {
        sname: uname.value,
        spwd: upwd.value,
        sbir: ehs,
      },
      success: function (data) {
        //判断数据库是否已经存在该用户,返回1表示不存在,成功注册,跳转
        if (data.code == 0) {
          //存在:提示已将存在直接登录
          $('#errorMsg').fadeIn();
          $('.close-error').html('该账号已经注册过,请直接登录!');
          isreg();
        } else {
          delay();
          //把登录的用户名保存在当前会话中
          localStorage.setItem('NAME', uname.value);
        }
      },
      error: function (data) {
        $('#errorMsg').fadeIn();
        $('.close-error').html('注册失败,请稍后再试!');
        isreg();
      }

    });
  }
});

//延迟3秒,跳转到登录页面
function delay() {
  $("#errorMsg").fadeIn();
  $('.close-error').html('注册成功!正在跳转到登录页面...');
  setTimeout(function () {
    window.location.href = "login.html";
  }, 3000);
}


//提示错误的模态框:用户不点击关闭,自动在8s内关闭
function isreg() {
  setTimeout(function () {
    $("#errorMsg").fadeOut();
  }, 8000);
}

//点击模态框的关闭X
$('.close').click(
  function () {
    $("#errorMsg").fadeOut();
  }
)

//点击登录跳转到登录页面
$('#login').on('click', function () {
  window.location.href = "login.html";
});



//获取一个指定范围内的随机数
function rn(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//获取一个指定范围内的随机颜色
function rc(min, max) {
  var r = rn(min, max);
  var g = rn(min, max);
  var b = rn(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}

//  `rgb(${r},${g},${b})`


var cols = [rc(1, 255), rc(1, 255), rc(1, 255), rc(1, 255), rc(1, 255), rc(1, 255), rc(1, 255), rc(1, 255), rc(1, 255), rc(1, 255)];
var stars = 250;

for (var i = 0; i <= stars; i++) {

  var size = Math.random() * 3;
  var color = cols[parseInt(Math.random() * 4)];

  $('.start').prepend('<span style=" width: ' + size + 'px; height: ' + size + 'px; top: ' + Math.random() * 100 + '%; left: ' + Math.random() * 100 + '%; background: ' + color + '; box-shadow: 0 0 ' + Math.random() * 10 + 'px' + color + ';"></span>');
}
;

setTimeout(function () {
  $('.start span').each(function () {
    $(this).css('top', Math.random() * 100 + '%').css('left', Math.random() * 100 + '%');
  });
}, 1);

setInterval(function () {
  $('.start span').each(function () {
    $(this).css('top', Math.random() * 100 + '%').css('left', Math.random() * 100 + '%');
  });
}, 2000);












