<?php
//接收客户端提交的所有数据
header('Content-Type:application/json;charset=UTF-8');
$link=mysqli_connect('localhost','root','123456','xitongshuju');

$sql="SET NAMES UTF8";
mysqli_query($link,$sql);

$sql = "SELECT sid,sname,stel,classID FROM msg1";
$res=mysqli_query($link,$sql);

$callback = isset($_GET['callback']) ? trim($_GET['callback']) : '';
$list=mysqli_fetch_all($res,MYSQLI_ASSOC);
$json=json_encode($list); //得到数据转为json格式

echo $callback . '(' . $json .')';  //所有的数据




