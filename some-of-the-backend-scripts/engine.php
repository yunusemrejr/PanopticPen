<?php

    if (isset($_POST['email'])) {
      
 
     $email = $_POST['email'] ;
        
        

 require 'databasecon.php';


if ($con->connect_error) {
    exit();
}  

else{


$table = 'mailtable';
$sql = "SELECT * FROM $table WHERE email = '$email'";
$result = $con->query($sql);

if ($result->num_rows > 0) {
    return "Record with the same email already exists";
} else {
    $insertSql = "INSERT INTO $table (email) VALUES ('$email')";
    if ($con->query($insertSql) === TRUE) {
        $lastInsertedId = $con->insert_id;
        return "Email inserted successfully with ID: $lastInsertedId";
    } else {
        return "Error: " . $con->error;
    }
}




}
 
 
    }else{
        header('Location: http://panopticpen.space');
        exit();
    }
?>