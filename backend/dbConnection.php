<?php
$dbhost  = 'server_name';
$dbname  = 'url_shortener';
$dbuser  = 'username';
$dbpass  = 'password';

$connection = mysqli_init();
mysqli_ssl_set($connection, NULL, NULL, "BaltimoreCyberTrustRoot.crt.pem", NULL, NULL);
mysqli_real_connect($connection, $dbhost, $dbuser, $dbpass, $dbname, 3306, MYSQLI_CLIENT_SSL);
if (mysqli_connect_errno($connection)) {
  die('Failed to connect to MySQL: ' . mysqli_connect_error());
}
