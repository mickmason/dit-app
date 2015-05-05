<?php
/*
 * Following code will list all the modules on a course
 */

//Enable cross domain Communication - Beware, this can be a security risk 
header('Access-Control-Allow-Origin: http://localhost:8888');
$origin = $_GET["origin"] ;
$destination = $_GET["dest"] ;

$url = "https://maps.googleapis.com/maps/api/directions/json?origin=" . $origin."&destination=".$destination."&key=AIzaSyDvChWYNxiSZwwEPquQ0xJRCFjoSL0dSL8";

$cr = curl_init();
curl_setopt($cr, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($cr, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($cr, CURLOPT_CAINFO, getcwd() . "/ca_cert/BuiltinObjectToken-EquifaxSecureCA.crt");
curl_setopt($cr, CURLOPT_RETURNTRANSFER, true);
curl_setopt($cr, CURLOPT_URL, $url);
if (!curl_exec($cr)) {
    echo curl_error($cr);
} else {
    echo curl_exec($cr) ;
}
curl_close($cr) ;
//echo http_get("https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyDvChWYNxiSZwwEPquQ0xJRCFjoSL0dSL8");
?>

