
<?php
/*
 * Following code will gets the modules that a student is enrolled in
 */

//Enable cross domain Communication - Beware, this can be a security risk 
header('Access-Control-Allow-Origin: http://localhost:8383');

// array for JSON response
$response = array();
//Student ID 
if (isset($_GET['studentid'])){
    $stID = $_GET['studentid'];
} else {
    // no modules found
    $response["success"] = 0;
    $response["message"] = "No modules found for that ID";

    // echo no modules JSON
    print (json_encode($response));
    //echo (json_encode($response));    
}

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db
$db = new DB_CONNECT();
//Array of student module IDs
$stdModules = array();
//Get student modules
$result = mysql_query("SELECT moduleNo1, moduleNo2 FROM studenttable WHERE studentID=".$stID) or die(mysql_error());
// check for empty result
if (mysql_num_rows($result) > 0)
 {
    // looping the result - there will be one only
    while ($row = mysql_fetch_array($result)) 
    {

            $stdModules["moduleNo1"] = $row["moduleNo1"];
            $stdModules["moduleNo2"] = $row["moduleNo2"];
    }
} else {
    // no modules found
    $response["success"] = 0;
    $response["message"] = "No modules found";
    // echo no modules JSON
    print (json_encode($response));
    //echo (json_encode($response));
}
$response["modules"] = array();
// get modules from module table based on id(s) returned
foreach ($stdModules as $stdModule) {
    $result = mysql_query("SELECT * FROM moduleTable WHERE moduleNo=".$stdModule) or die(mysql_error());

    // check for empty result
    if (mysql_num_rows($result) > 0)
     {
        // looping through all results
        // modules node
        

         while ($row = mysql_fetch_array($result)) 
         {
                // temp module array
                $module = array();
                $module["moduleNo"] = $row["moduleNo"];
                $module["moduleName"] = $row["moduleName"];
                $module["credits"] = $row["credits"];
                $module["website"] = $row["website"];
                $module["dueDate"] = $row["dueDate"];
                $module["location"] =$row["location"];
                $module["room"] =$row["room"];
                $module["lat"] =$row["lat"];
                $module["long"] =$row["long"];
                
           // push single module into final response array
            array_push($response["modules"], $module);
        }


    }    # code...
}


if (count($response)> 0) {
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

