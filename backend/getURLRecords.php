<?php
session_set_cookie_params(60 * 24 * 60 * 60);
session_start();
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
define("IN_VIEW", true);
include_once 'utilities.php';

$json = file_get_contents('php://input');
$requestObject = json_decode($json, true);

if (isset($_SESSION['userEmail'])) {
  $currentUserId = $_SESSION['userId'];
  $resultCountGrouped = queryMySQL(
    "SELECT UR.shortName, UR.longURL, COUNT(UT.urlId) AS totalVisits FROM url_records UR 
      INNER JOIN user_info UI ON UI.userId=UR.userId 
      LEFT JOIN url_track UT ON UT.urlId=UR.urlId 
      WHERE UI.userId='$currentUserId' 
      GROUP BY UT.urlId;
   "
  );
  $resultDateGrouped = queryMySQL(
    "SELECT UR.shortName, UR.longURL, UT.dateHit, COUNT(UT.urlId) AS totalVisits FROM url_records UR 
    INNER JOIN user_info UI ON UI.userId=UR.userId 
    INNER JOIN url_track UT ON UT.urlId=UR.urlId 
    WHERE UI.userId='$currentUserId' 
    GROUP BY UT.dateHit;"
  );
  $resultArr = array("resultCountGrouped" => getArrayResults($resultCountGrouped), "resultDateGrouped" => getArrayResults($resultDateGrouped));
  $arr = array("result" => $resultArr);
  $JSONData = json_encode($arr);
  echo $JSONData;
} else {
  $arr = array(
    "result" => "some error occured.",
  );
  $JSONData = json_encode($arr);
  echo $JSONData;
}
?>