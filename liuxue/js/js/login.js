//验证手机号 密码 及验证码 :不为空 且 符合规则
var uname = document.querySelector('#uname');
uname.onblur =
  function () {
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

var upwd = document.querySelector('#upwd');
upwd.onblur =
  function () {
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

var inputTxt = document.querySelector('#inputTxt');
inputTxt.onblur =
  function () {
    console.log('验证码');
    var codes = /[0-9a-zA-Z]{4}/;
    if (!(inputTxt.value)) {
      $('.ts').css('display', 'block');
      $('.ts').html('请输入4位验证码!');
    } else if (!(codes.test(inputTxt.value))) {
      $('.ts').css('display', 'block');
      $('.ts').html('验证码不正确!');
    } else {
      $('.ts').css('display', 'none');
    }
  }


//验证码

//绘制50个杂色点——半径为1的圆
// for(var i=0;i<90;i++){
//
// }

function rn(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//获取一个指定范围内的随机颜色
function rc(min, max) {
  var r = rn(min, max);
  var g = rn(min, max);
  var b = rn(min, max);
  return `rgb(${r},${g},${b})`;
}

var chars = [];
var i;
//i从48开始，到57结束  //将i转为原字符串，压入chars中
for (i = 48; i <= 57; chars.push(String.fromCharCode(i++)));   //0-9
for (i = 65; i <= 90; chars.push(String.fromCharCode(i++)));  //A-Z
for (i = 97; i <= 122; chars.push(String.fromCharCode(i++))); //a-z
//2:定义函数getCode(),随机生成一个4位验证码
function getCode() {
  var code = "";
  while (code.length < 4) {
    //在0-chars的length之间生成一个随机数r
    var r = Math.floor(Math.random() * (chars.length));
    //将chars中r位置的字符拼接到code上
    var randint = function () {  //8 10
      var num = Math.random() * 10;   //0-1之间的小数
      return Math.floor(num);
    };
    code += chars[r];

  }
  return code;
}


var code = getCode();
var code1 = document.getElementById('code');//span显示验证码
code1.innerHTML = code;
code1.style.color = rc(120, 256); //文字随机色
code1.style.background = rc(10, 120); //背景随机色
$('.getAgain').on('click', function (e) {
  document.getElementById('code').innerHTML = getCode();
})
$('#btn1').on('click', function () {
  //点击登录按钮,验证用户名和密码
  if ((!uname.value) || (!upwd.value)
    || (!($('#uname').next().hasClass('hidden')))
    || (!($('#upwd').next().hasClass('hidden')))) {
    $('#errorMsg').fadeIn();
    $('.close-error').html('请检查用户名、密码格式是否正确!');
    isreg();
  } else { //都不为空就验证验证码
    //输入验证码的框:值/长度
    var inputCode = document.querySelector('#inputTxt').value;
    //判断验证码是否为空,不区分大小写
    if (inputCode.toUpperCase() != code1.innerHTML.toUpperCase()) {
      $('.ts').css('display', 'block');
      $('.ts').html('验证码错误！');
      getCode(); //刷新验证码
    } else {
      //验证码正确,则检查用户名对应的密码是否正确
      $.ajax({
        url: "../php/check_sname.php",
        type: 'get',
        dataType: 'jsonp',
        jsonp: "callback",
        data: {
          sname: uname.value,
          spwd: upwd.value
        },
        //请求成功
        success: function (data) {//data:返回的数据(字符串)
          // alert(data);
          //返回的数据(字符串)转为json对象
          var dataJson = JSON.parse(data);
          // alert(dataJson.code);
          //code = -2 :手机号没有注册
          if (dataJson.code == -2) {
            $('#errorMsg').fadeIn();
            $('.close-error').html('该手机号不存在,请先去注册!');
            isreg();
          }
          //code = 0 : 密码正确
          else if (dataJson.code == 0) {
            //跳转到system.html
            window.location.href = "system.html";
            //把登录的用户名保存在当前会话中
            localStorage.setItem('NAME', uname.value);
          }
          //code = -1 : 密码错误
          else if (dataJson.code == -1) {
            // alert(dataJson.code);
            $('#errorMsg').fadeIn(); //显示模态框
            $('.close-error').html('密码错误!');  //提示内容
            isreg();//如果用户5s内不点击关闭,则自动关闭
          }
        },
        //请求失败
        error: function (data) {
          // console.log(data);
          $('#errorMsg').fadeIn();
          $('.close-error').html('登录失败,请重试！');
          isreg();
        }
      })
    }
  }
})


//用户如果不手动点击关闭,则5s后关闭
function isreg() {
  setTimeout(function () {
    $("#errorMsg").fadeOut();
  }, 5000);
}
window.onload =
  $('.close').click(
    function () {
      $("#errorMsg").fadeOut();
    }
  )

//点击登录,直接跳转到登录页面
$('#btn2').on('click', function () {
  window.location.href = "register.html";
})


























