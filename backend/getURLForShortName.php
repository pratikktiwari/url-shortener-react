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

$result = queryMySQL(
  "SELECT longURL, urlId FROM url_records
          WHERE shortName='$short_name';
  "
);

if ($result->num_rows != 0) {
  $rowResultUrlId = getRows($result)['urlId'];
  queryMySQL(
    "INSERT INTO 
          url_track (urlId, location, dateHit)
          VALUES ('$rowResultUrlId', 'na', CURDATE());"
  );
  $arr = array("result" => $rowResult);
  $JSONData = json_encode($arr);
  echo $JSONData;
} else {
  $arr = array(
    "result" => "noSuchURL",
  );
  $JSONData = json_encode($arr);
  echo $JSONData;
}
?>