/**
 * Created by renyueyue on 2017/9/20.
 */
//异步请求服务器端php文件中数据
// var myDate = new Date();
// var mytimeend=myDate.toLocaleTimeString();
// alert("user开始:"+ mytimeend);

$.ajax({
    url: "../php/xitongshuju1.php",
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
      var html = `<table class="table-striped table-bordered table-hover table"  >`;
      html+=`
            <thead>
              <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>电话</th>
                <th>班级</th>
              </tr>
            </thead>`;
      html+=`<tbody id="idata">`;

      $.each(data, function (i, val) {
        html += `
                <tr>
                 <td>${val.sid}</td>
                  <td>${val.sname}</td>
                  <td>${val.stel}</td>
                 <td>${val.classID}</td>
               </tr>`;
      });

      html+=`</tbody></table>`;
      $('.bigright_div1').html(html);
      goPage(1,15);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest.status);
      console.log(XMLHttpRequest.readyState);
      console.log(textStatus);
    }
  }
);

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


function goPage(pno,psize){
  var itable = document.getElementById("idata");
  var num =document.getElementById("idata").rows.length;//表格所有行数(所有记录数)

  // alert(num);
  var totalPage = 0;//总页数
  var pageSize = psize;//每页显示行数
  //总共分几页
  //如果总页数/每页显示的条数>取整之后的数值,就总页数加1,否则显示取整页数
  if(num/pageSize > parseInt(num/pageSize)){
    totalPage=parseInt(num/pageSize)+1;
  }else{
    totalPage=parseInt(num/pageSize);
  }
  var currentPage = pno;//当前页数
  var startRow = (currentPage - 1) * pageSize+1;//开始显示的行
  var endRow = currentPage * pageSize;//结束显示的行
  endRow = (endRow > num)? num : endRow;
  console.log(endRow);
  //遍历显示数据实现分页
  for(var i=1;i<(num+1);i++){
    var irow = itable.rows[i-1];   //itable..rows
    if(i>=startRow && i<=endRow){
      irow.style.display ='table-row';
    }else{
      irow.style.display = "none";
    }
  }

  //拼接总记录 总页数 首页 上一页
  var tempStr=`<ul class="pagination pagination-sm">`;
  tempStr+=  `<li><span>共 ${num} 条记录</span></li>`;
  tempStr+=  `<li><span>共 ${totalPage} 页</span> </li>`;
  // tempStr+=  `<li><span>当前第 ${currentPage} 页</span></li>`;
  if(currentPage>1){
    tempStr+=`<li>`;
    tempStr += `<a href="#" onClick="goPage(1,${psize})">  <span>首页</span> </a>`;
    tempStr+=`</li><li></li><li aria-hidden="true">`;
    tempStr += `<a href="#" onClick="goPage(${currentPage}-1,${psize})"><span><上一页</span></a>`;
    tempStr+= `</li>`;
  }else{
    tempStr += `<li><a>首页</a></li>`;
    tempStr += `<li><a><上一页</a></li>`;
  }



  //判断:根据页数来定显示规则

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


  //拼接下一页 尾页
  if(currentPage<totalPage){
    tempStr += `<li aria-hidden="true"><a href="#" onClick="goPage(${currentPage}+1,${psize})"><span>下一页></span></a><li>`;
    tempStr += `<li><a href="#" onClick="goPage(${totalPage},${psize})"><span>尾页</span></a></li>`;
  }else{
    tempStr += `<li><a>下一页></a></li>`;
    tempStr += `<li><a>尾页</a></li>`;
  }
  document.querySelector(".bigright_div2").innerHTML=tempStr;
};


// var myDate = new Date();
// var mytimeend=myDate.toLocaleTimeString();
// alert("page结束:"+ mytimeend);

// var myDate = new Date();
// var mytimeend=myDate.toLocaleTimeString();
// console.log("userjs结束:"+mytimeend);






