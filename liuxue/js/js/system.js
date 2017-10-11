/**
 * Created by renyueyue on 2017/9/19.
 */

//http://192.168.1.101/liuxue/html/

//浏览器窗口调整大小 :判断滚动条与内容区域的高度
$(window).resize(function () {
    var sc = document.querySelector('#left_list');
    if (sc.scrollHeight > sc.clientHeight) {
      $('#left_list').css('width', '220px');
    } else {
      $('#left_list').css('width', '208px');
    }
  }
)

//请求数据
function stu1() {
  $.ajax({
    url: "childhtml/user_1.html",
    global: false,
    type: "get",
    dataType: "html",
    success: function (msg) {
      $('.page-content').html(msg);
    }
  })
};
function stu2() {
  $.ajax({
    url: "childhtml/user_2.html",
    global: false,
    type: "get",
    dataType: "html",
    success: function (msg) {
      $('.page-content').html(msg);
    }
  })
};

function stu3() {
  $.ajax({
    url: "childhtml/user_3.html",
    global: false,
    type: "get",
    dataType: "html",
    success: function (msg) {
      $('.page-content').html(msg);
    }
  })
};


//左侧下拉菜单:一级菜单与二级菜单
$('.nav_list>li>a').bind('click', function () {
  $(this).next().slideToggle(500);
  $(this).parent('li').siblings().children(':last-child').css('display', 'none');
  console.log(this);
});
//左侧二级菜单:控制右侧显示内容
$('.menu>li').bind('mouseenter', function () {
  if ($(this).hasClass('active')) {
  } else {
    $(this).addClass('active');
    $(this).siblings('li').removeClass('active');
  }
});

//试着从会话范围内读取登录用户名
var names = localStorage.getItem('NAME');

if (names) {
  //获取到names,登录按钮并未退出按钮
  var html = `<a id="tuichu" class="btn btn-success navbar-btn navbar-right" >退出</a>`;
  $('#btnlogin').html(html);

  //注册按钮变为'欢迎回来!XXX'
  var html = `<span class="wel">`;
  html += names;
  html += `</span>`;
  $('#btnregister').html(html);
}

$('#btnlogin').on('click', '#tuichu', function () {
  location.reload();
  var htmll = `<a class="btn btn-success navbar-btn navbar-right" href="login.html">登录</a>`;
  $('#btnlogin').html(htmll);
  var htmlr = `<a class="btn btn-success navbar-btn navbar-right" href="register.html">注册</a>`;
  $('#btnregister').html(htmlr);
  localStorage.clear();
})
// var url= location.search;//获得url ?及其之后的内容"?sname=18612306840"
// var urls=url.split('='); //["?sname", "18612306840"]
//var un=url[1];  //"18612306840"




















