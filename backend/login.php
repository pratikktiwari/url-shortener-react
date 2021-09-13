<?php
session_set_cookie_params(60 * 24 * 60 * 60);
session_start();
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
define("IN_VIEW", true);
include_once 'utilities.php';

$json = file_get_contents('php://input');
$requestObject = json_decode($json, true);

$user_email = sanitizeString($requestObject['userEmail']);
$user_password = sanitizeString($requestObject['password']);

$result = queryMySQL(
    "SELECT * FROM user_info
            WHERE userEmail='$user_email' AND userPassword='$user_password'
    "
);

if ($result->num_rows == 0) {
    $arr = array("result" => "error");
    $JSONData = json_encode($arr);
    echo $JSONData;
} else {
    $arr = array(
        "result" => "loginSuccess",
        "sessionCookie" => md5($user_email)
    );
    $_SESSION['userEmail'] = $user_email;
    $_SESSION['userId'] = getRows($result)['userId'];
    $JSONData = json_encode($arr);
    echo $JSONData;
}
?>