<?php
//接收客户端提交的sname,返回在数据库中是否存在
header('Content-Type:application/json;charset=UTF-8');
$link=mysqli_connect('localhost','root','123456','tedu');

$sql="SET NAMES UTF8";
mysqli_query($link,$sql);

$sname=$_REQUEST['sname'];
$spwd=$_REQUEST['spwd'];
$sbir=$_REQUEST['sbir'];
$callback=$_GET['callback'];

//根据姓名查询数据库中是否有该用户
$sqlname="SELECT * FROM student WHERE sname='$sname'";
$resname=mysqli_query($link,$sqlname);

//如果有,则code:0
if(mysqli_num_rows($resname)==1){
	$resname= '{"code":0,"message":"telExist"}';
}else{
    //没有,则code:1
    $resname= '{"code":1,"message":"telExist"}';
    //向数据库中插入一条记录
    $sqlin="insert student(sname,spwd,sbir)
        	   values('{$sname}','{$spwd}','{$sbir}')";
    $resin=mysqli_query($link,$sqlin);
}

//返回json
$json = json_encode($resname);
$resJson= $callback . "(" . $resname . ")";
echo $resJson;







