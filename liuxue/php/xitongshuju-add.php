<?php
//接收客户端提交的所有数据
header('Content-Type:application/json;charset=UTF-8');
$link=mysqli_connect('localhost','root','123456','xitongshuju');

$sql="SET NAMES UTF8";
mysqli_query($link,$sql);

$sid=$_REQUEST['sid'];
$sname=$_REQUEST['sname'];
$stel=$_REQUEST['stel'];
$classID=$_REQUEST['classID'];
$callback=$_GET['callback'];


//根据id查找对应的数据
$sql="SELECT * FROM msg1 WHERE sid='$sid'";
$res=mysqli_query($link,$sql);

//如果有对应的id,code:0
if(mysqli_num_rows($res)==1){
  $resid= '{"code":0,"message":"exist"}';
}else{
  //否则,没有找到id,code:1
  $resid= '{"code":1,"message":"non-existent"}';
  $sqlin="INSERT msg1(sid,sname,stel,classID) VALUES('{$sid}','{$sname}','{$stel}','{$classID}')";
  $resin=mysqli_query($link,$sqlin);
}

//返回json
$json = json_encode($resid);
$resJson= $callback . "(" . $resid . ")";
echo $resJson;






