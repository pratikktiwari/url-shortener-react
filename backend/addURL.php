<?php
session_set_cookie_params(60 * 24 * 60 * 60);
session_start();
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
define("IN_VIEW", true);
include_once 'utilities.php';

$json = file_get_contents('php://input');
$requestObject = json_decode($json, true);

$short_name = sanitizeString($requestObject['shortName']);
$long_url = sanitizeString($requestObject['longURL']);

$result = queryMySQL(
  "SELECT * FROM url_records
          WHERE shortName='$short_name';
  "
);

if ($result->num_rows == 0) {
  $currentUserId = $_SESSION['userId'];
  queryMySQL(
    "INSERT INTO 
          url_records (shortName, longURL, userId)
          VALUES ('$short_name', '$long_url', '$currentUserId');"
  );
  $arr = array("result" => "addURLSuccess");
  $JSONData = json_encode($arr);
  echo $JSONData;
} else {
  $arr = array(
    "result" => "duplicateShortName",
  );
  $JSONData = json_encode($arr);
  echo $JSONData;
}
?>