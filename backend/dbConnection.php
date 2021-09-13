<?php
$dbhost  = 'mysql-php.mysql.database.azure.com';
$dbname  = 'url_shortener';
$dbuser  = 'tiwari@mysql-php';
$dbpass  = 'MySQLAzure2017';

$connection = mysqli_init();
mysqli_ssl_set($connection, NULL, NULL, "BaltimoreCyberTrustRoot.crt.pem", NULL, NULL);
mysqli_real_connect($connection, $dbhost, $dbuser, $dbpass, $dbname, 3306, MYSQLI_CLIENT_SSL);
if (mysqli_connect_errno($connection)) {
  die('Failed to connect to MySQL: ' . mysqli_connect_error());
}
