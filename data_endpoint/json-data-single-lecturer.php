<?php
/*
 * Following code gets a single module based on the modid passed
 */

//Enable cross domain Communication - Beware, this can be a security risk 
header('Access-Control-Allow-Origin: http://localhost:8383');

//Student ID 
if (isset($_GET['lecturerid'])){
    $lectID = $_GET['lecturerid'];
} else {
    // no modules found
    $response["success"] = 0;
    $response["message"] = "No modules found for that ID";

    // echo no modules JSON
    print (json_encode($response));
    //echo (json_encode($response));
    return;    
}

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
// connecting to db
$db = new DB_CONNECT();

// get all modules from module table
$result = mysql_query("SELECT * FROM lecturertable WHERE staffNumber=".$lectID) or die(mysql_error());

// check for empty result
if (mysql_num_rows($result) > 0)
 {
    // lecturers node
    $response["lecturers"] = array();

     while ($row = mysql_fetch_array($result)) 
     {
            // temp lecturer array
            $lecturer = array();
            $lecturer["staffNumber"] = $row["staffNumber"];
            $lecturer["firstName"] = $row["firstName"];
            $lecturer["lastName"] = $row["lastName"];
            $lecturer["moduleNo1"] = $row["moduleNo1"];
            $lecturer["moduleNo2"] = $row["moduleNo2"];
            $lecturer["email"] =$row["email"];

       // push single product into final response array
        array_push($response["lecturers"], $lecturer);
    }
    // success
    // success
    $response["success"] = 1;

    // echoing JSON response
    print (json_encode($response));
    // echo (json_encode($response));

}else {
    
    // no modules found
    $response["success"] = 0;
    $response["message"] = "No modules found";

    // echo no modules JSON
    print (json_encode($response));
    //echo (json_encode($response));
}

?>

