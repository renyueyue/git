<?php
//接收客户端提交的sname,返回在数据库中账号密码是否正确
header('Content-Type:text/plain;charset=UTF-8');
$link=mysqli_connect('localhost','root','123456','tedu');

$sql="SET NAMES UTF8";
mysqli_query($link,$sql);

$sname=$_REQUEST['sname'];
$spwd=$_REQUEST['spwd'];

/*根据姓名密码查询密码对否*/
$sqlname="SELECT sname FROM student WHERE sname='$sname'";
$resname=mysqli_query($link,$sqlname);

/*根据接收的手机号查询手机号是否注册过*/
/*数据库中有,说明注册过,返回1*/
if(mysqli_num_rows($resname)){
    /*数据库有,说明注册过,可登录,然后根据接收的密码查询对应的密码正确否*/
    $sqlpwd="SELECT spwd FROM student WHERE sname='$sname' and spwd='$spwd'";
    $respwd=mysqli_query($link,$sqlpwd);
    if(mysqli_num_rows($respwd)){
        //密码对
        $respwd= '{"code":0,"message":"loginSuccess"}';
    }else{
        //密码错
        $respwd= '{"code":-1,"message":"pwdError"}';
    }
}else{ //没注册过返回,让其先去注册
    $respwd= '{"code":-2,"message":"noAccount"}';
}



/*跨域请求 jsonp回调函数*/

//$list=mysqli_fetch_all($res,MYSQLI_ASSOC);
$callback = isset($_GET['callback']) ? trim($_GET['callback']) : '';
    $json=json_encode($respwd);
echo $callback . '(' . $json .')';







/*
if(mysqli_num_rows($res)){
	echo 'yes';
}else{
	echo 'no';
}

*/


