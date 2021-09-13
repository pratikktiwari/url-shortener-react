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
            WHERE userEmail='$user_email';
    "
);

if ($result->num_rows == 0) {
    queryMySQL(
        "INSERT INTO 
            user_info (userEmail, userPassword) 
            VALUES ('$user_email', '$user_password');"
    );
    $arr = array("result" => "signUpSuccess");
    $JSONData = json_encode($arr);
    echo $JSONData;
} else {
    $arr = array(
        "result" => "duplicateEmail",
    );
    $JSONData = json_encode($arr);
    echo $JSONData;
}
