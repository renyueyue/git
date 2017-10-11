<?php
//接收客户端提交的所有数据
header('Content-Type:application/json;charset=UTF-8');
$link=mysqli_connect('localhost','root','123456','xitongshuju');

$sql="SET NAMES UTF8";
mysqli_query($link,$sql);

$sid=$_REQUEST['sid'];
$callback=$_GET['callback'];


//根据id查找对应的数据
$sql="SELECT * FROM msg1 WHERE sid='$sid'";
$res=mysqli_query($link,$sql);

//如果有对应的id,code:0,删除对应id的数据
if(mysqli_num_rows($res)==1){
  $resid= '{"code":0,"message":"Deleted"}';
  $sqlid = "DELETE FROM msg1 WHERE sid='$sid'";
  $res=mysqli_query($link,$sqlid);
}else{
  //否则,没有找到id,code:1
  $resid= '{"code":1,"message":"Not deleted"}';
}

//返回json
$json = json_encode($resid);
$resJson= $callback . "(" . $resid . ")";
echo $resJson;






