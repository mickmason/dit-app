<?php
/*
 * Following code will list all the modules on a course
 */

//Enable cross domain Communication - Beware, this can be a security risk 
header('Access-Control-Allow-Origin: http://localhost:8383');

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db
$db = new DB_CONNECT();
$userNos = array() ;


$result = array();
//Get 
$result = mysql_query("SELECT studentID FROM studenttable") or die(mysql_error());

//Get 

$i = 0;
    if (mysql_num_rows($result) > 0)
     {
        // looping through all results
        // modules node
        
         while ($row = mysql_fetch_array($result)) 
         {


                echo $row["studentID"] . "<br />";
                $userNos[$i] = $row["studentID"];
                
                $i++ ;   
        }
        // success
 
    } else {
        
        echo "No results";
        return false;
    }
$result = mysql_query("SELECT staffNumber FROM lecturertable") or die(mysql_error());


    if (mysql_num_rows($result) > 0)
     {
        // looping through all results
        // modules node
        
         while ($row = mysql_fetch_array($result)) 
         {

                // temp module array
                echo $row["staffNumber"] . "<br />";;
                $userNos[$i] = $row["staffNumber"];
                
                $i++ ;   
        }
        // success
 
    } else {
        
        
        return false;
    }


$result = array();
echo count($userNos);
for ($i = 0; $i<count($userNos); $i++) {
    $query = "INSERT INTO users (`user_id`) VALUE (".$userNos[$i].")";
    if (mysql_query($query)) {
        echo "Added ".$userNos[$i];
    } else{ 
        echo "Nope, error ";
        die(mysql_error());
    }
}


?>

