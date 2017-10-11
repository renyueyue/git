//异步请求服务器端php文件中数据
// var myDate = new Date();
// var mytimeend=myDate.toLocaleTimeString();
// alert("user开始:"+ mytimeend);

$.ajax({
    url: "../php/xitongshuju.php",
    type: 'get',
    dataType: "jsonp",
    jsonp: "callback",
    success: function (data, textStatus) {
      //判断响应状态，不正常则alert出来
      if (textStatus != 200) {
        console.log(textStatus);
      }
      //打印响应数据
      // console.log(data);

      //处理响应数据
      var html = `<table class="table-striped table-bordered table-hover table"  id="tab">`;
      html += `
            <thead>
              <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>电话</th>
                <th>班级</th>
                <th>操作</th>
              </tr>
            </thead>`;
      html += `<tbody id="idata">`;
      // ${i+1}
      $.each(data, function (i, val) {
        html += `    
                <tr data-id="${val.sid}"> 
                  <td>${val.sid}</td>
                  <td>${val.sname}</td>
                  <td>${val.stel}</td>
                 <td>${val.classID}</td>
                 <td>
                    <button class="del">删除</button>
                    <button class="add">添加</button>
                  </td>
               </tr>`;
      });

      html += `</tbody></table>`;
      $('.bigright_div1').html(html);
      goPage(1, 14);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest.status);
      console.log(XMLHttpRequest.readyState);
      console.log(textStatus);
    }
  }
);


//点击删除:把当前一行记录删除
$('.bigright_div1').on('click', '.del', function () {
  if (!names) {
    $('#modal-box-del').css('display', 'block');
    $('#modal-box-del .modal-b').html(`<p class="lo">请先登录!</p>`);
    setTimeout(function () {
      $('#modal-box-del').css('display', 'none');
    }, 2000);
  }
  //获取id
  trthis = $(this).parent().parent();//当前tr
  var id = $(this).parent().parent().attr('data-id');//当前tr的data-id
  $('#modal-box-del-data-id').attr('value', id);
  $('#modal-box-del').css('display', 'block');
});

$('#modal-box-del-true').click(function () {
    //获取id
    var id = $('#modal-box-del-data-id').attr('value');
    //通过id获取当前行
    $.ajax({
      url: '../php/xitongshuju-del.php',
      data: {sid: id},
      dataType: "jsonp",
      jsonp: "callback",
      success: function (data) {
        if (data.code == 0) {
          trthis.remove();
          $('#modal-box-del').css('display', 'none');
        } else {
          $('#modal-box-del').css('display', 'block');
          var html = `删除失败,请稍后重试!`;
          $('#modal-box-del .modal-b').html(html);
        }
      },
      error: function (data) {
        var html = `删除出现错误,请稍后重试!`;
        $('#modal-box-del .modal-b').html(html);
      }
    })
  }
);

$('#modal-box-del-false').click(function () {
  // 关闭对话框
  $('#modal-box-del').css('display', 'none');
});


//点击添加,弹出框输入学生信息
$('.bigright_div1').on('click', '.add', function () {
  if (!names) {
    $('#modal-box-del').css('display', 'block');
    $('#modal-box-del .modal-b').html(`<p class="lo">请先登录!</p>`);
    setTimeout(function () {
      $('#modal-box-del').css('display', 'none');
    }, 2000);
  } else {
    $('#modal-box').css('display', 'block');
  }
});

//点击确定,发起异步请求,将数据添加到数据库中
$('#determine').click(
  function () {
    //当前tr
    var trthis = $(this).parent().parent();
    //当前tr的data-id
    var id = $(this).parent().parent().attr('data-id');

    //得到用户输入的数据
    var uid = $('#uid').val();
    var uname = $('#uname').val();
    var utel = $('#utel').val();
    var uclassid = $('#uclassid').val();
    if (uid == '' && uname == '' && utel == '' && uclassid == '') {
      alert('请正确填写id 姓名 电话 班级');
      $('#modal-box').css('display', 'none');
    } else {
      $.ajax({
        url: '../php/xitongshuju-add.php',
        data: {
          sid: uid,
          sname: uname,
          stel: utel,
          classID: uclassid
        },
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
          if (data.code == 1) {
            $('#modal-box').css('display', 'none');
            var $html = $(`<tr data-id="${uid}">
                 <td>${uid}</td>
                  <td>${uname}</td>
                  <td>${utel}</td>
                 <td>${uclassid}</td>
                 <td><button class="del">删除</button>
                    <button class="add">添加</button>
                  </td>
               </tr>`);
            var trs = trthis.next().nextAll('tr');//新插入tr后所有的tr
            //遍历当前新插入tr后所有的兄弟tr
            for (var i = 0; i < trs.length; i++) {
              //所有的data-id  +1 , 重新排列
              var afterid = parseInt(trs[i].getAttribute('data-id')) + 1;
              trs[i].setAttribute('data-id', afterid);
            }
            window.location.reload();
          } else {
            alert('已有此id及对应的同学!');
            window.location.reload();
          }
        },
        error: function (data) {
          alert('添加出现错误:' + data);
        }
      })
    }
  });


$('#cancel').click(function () {
  $('#modal-box').css('display', 'none');
});


/**
 * 分页函数
 * pno--页数
 * psize--每页显示记录数
 * 分页部分是从真实数据行开始，因而存在加减某个常数，以确定真正的记录数
 * 纯js分页实质是数据行全部加载，通过是否显示属性完成分页功能
 **/
// var myDate = new Date();
// var mytimeend=myDate.toLocaleTimeString();
// alert("page开始:"+ mytimeend);


function goPage(pno, psize) {   //pno,
  var itable = document.getElementById("idata");
  var num = document.getElementById("idata").rows.length;//表格所有行数(所有记录数)

  // alert(num);
  var totalPage = 0;//总页数
  var pageSize = psize;//每页显示行数
  //总共分几页
  //如果总页数/每页显示的条数>取整之后的数值,就总页数加1,否则显示取整页数
  if (num / pageSize > parseInt(num / pageSize)) {
    totalPage = parseInt(num / pageSize) + 1;
  } else {
    totalPage = parseInt(num / pageSize);
  }
  var currentPage = pno;//pno 当前页数
  var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行
  var endRow = currentPage * pageSize;//结束显示的行
  endRow = (endRow > num) ? num : endRow;
  console.log(endRow);
  //遍历显示数据实现分页
  for (var i = 1; i < (num + 1); i++) {
    var irow = itable.rows[i - 1];   //itable..rows
    if (i >= startRow && i <= endRow) {
      irow.style.display = 'table-row';
    } else {
      irow.style.display = "none";
    }
  }


  var tempStr = `<ul class="pagination pagination-sm">`;
  tempStr += `<li><span>共 ${num} 条记录</span></li>`;
  tempStr += `<li><span>共 ${totalPage} 页</span> </li>`;

  if (currentPage > 1) {
    tempStr += `<li>`;
    tempStr += `<a href="#" onClick="goPage(1,${psize})">  <span>首页</span> </a>`;
    tempStr += `</li><li aria-hidden="true">`;
    tempStr += `<a href="#" onClick="goPage(${currentPage}-1,${psize})"><span><上一页</span></a>`;
    tempStr += `</li>`;
  } else {
    tempStr += `<li><a>首页</a></li>`;
    tempStr += `<li><a><上一页</a></li>`;
  }


  if (totalPage >= 7) {
    tempStr += `<li><a href="#" onClick="goPage(${totalPage}/${totalPage},${psize})">  <span>${totalPage / totalPage}</span> </a></li>`;
    tempStr += `<li><a href="#" onClick="goPage(${totalPage}/${totalPage}+1,${psize})">  <span>${totalPage / totalPage + 1}</span> </a></li>`;
    tempStr += `<li><a href="#" onClick="goPage(${totalPage}/${totalPage}+2,${psize})">  <span>${totalPage / totalPage + 2}</span> </a></li>`;
    tempStr += `<li><a href="#"> <span>...</span> </a></li>`;
    tempStr += `<li><a href="#" onClick="goPage(${totalPage}-2 ,${psize})">  <span>${totalPage - 2}</span> </a></li>`;
    tempStr += `<li><a href="#" onClick="goPage(${totalPage}-1,${psize})">  <span>${totalPage - 1}</span> </a></li>`;
    tempStr += `<li><a href="#" onClick="goPage(${totalPage},${psize})">  <span>${totalPage}</span> </a></li>`;
  } else {
    for (var i = 1; i <= totalPage; i++) {
      tempStr += `<li><a href="#" onClick="goPage(${i},${psize})">  <span>${i}</span> </a></li>`;
    }
  }


  if (currentPage < totalPage) {
    tempStr += `<li aria-hidden="true"><a href="#" onClick="goPage(${currentPage}+1,${psize})"><span>下一页></span></a><li>`;
    tempStr += `<li><a href="#" onClick="goPage(${totalPage},${psize})"><span>尾页</span></a></li>`;
  } else {
    tempStr += `<li><a>下一页></a></li>`;
    tempStr += `<li><a>尾页</a></li>`;
  }
  document.querySelector(".bigright_div2").innerHTML = tempStr;
};








