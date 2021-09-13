<?php
if (!defined("IN_VIEW")) {
  header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found", true, 404);
}
include("dbConnection.php");

function queryMysql($query)
{
  global $connection;
  $result = $connection->query($query);
  if (!$result) die($connection->error);
  return $result;
}

function getRows($result)
{
  $row = $result->fetch_array(MYSQLI_ASSOC);
  return $row;
}

function getArrayResults($result)
{
  $resultArr = [];
  while($row = getRows($result)){
    $resultArr[] = $row;
  }
  return $resultArr;
}

function sanitizeString($var)
{
  global $connection;
  $var = strip_tags($var);
  $var = htmlentities($var);
  $var = stripslashes($var);
  $var = trim(preg_replace('/[\t\n\r\s]+/', ' ', $var));
  return $connection->real_escape_string($var);
}

function sanitizeStringMsgs($var)
{
  global $connection;
  $var = strip_tags($var);
  $var = htmlentities($var);
  $var = stripslashes($var);
  return $connection->real_escape_string($var);
}
