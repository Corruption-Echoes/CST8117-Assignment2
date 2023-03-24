<?php
    //Connect to the server
    $mysqli = mysqli_connect("localhost", "localDB", "3RaWzFLG4a2WzJEn", "bubbles");
    if(!$mysqli) {
        echo('A critical error occured: Could not connect to MariaDB');
    }
    $myfile=fopen('bubbleLog.txt','a');
    //Load the request data into memory
    $L = $_REQUEST["L"];
    $R = $_REQUEST["R"];
    $H = $_REQUEST["H"];
    $G = $_REQUEST["G"];
    $U = $_REQUEST["U"];
    $requestType='';
    $dataPacket='';
    //Figure out which request it is and grab the data packet
    if($L!==null){
        $requestType="L";
        $dataPacket=$L;
    }else if($R!==null){
        $requestType="R";
        $dataPacket=$R;
    }else if($H!==null){
        $requestType="H";
        $dataPacket=$H;
    }else if($G!==null){
        $requestType="G";
        $dataPacket=$G;
    }else if($U!==null){
        $requestType="U";
        $dataPacket=$U;
    }
    //echo $requestType;
    //Unpack the dataPacket into an array
    //echo $dataPacket;
    $unpackedPacket=str_split(':', $dataPacket);
    $SQL='';
    //Handle the SQL creation
    switch($requestType){
        case "L":
            $SQL="SELECT idk_users FROM users WHERE username='".$unpackedPacket[0]."' AND password='".$unpackedPacket[1]."'";
            //echo "Statement Type was L. SQL is:".$SQL;
            break;
        case "R":
            $SQL="INSERT INTO users (username,password,email,phone) VALUES ('".$unpackedPacket[0]."','".$unpackedPacket[1]."','".$unpackedPacket[2]+"','".$unpackedPacket[3]."')";
            break;
        case "G":
            $SQL="SELECT u.username,s.score,s.play_date FROM scores s INNER JOIN users u ON s.user_id=u.idk_users ORDER BY score DESC";
            //echo "statement was G";
            echo "<table class='HST'>";
            break;
        case "U":
            $SQL="SELECT u.username,s.score as points,s.play_date,(SELECT COUNT(*) FROM scores WHERE score>points) FROM scores s INNER JOIN users u ON s.user_id=u.idk_users WHERE u.username LIKE '%".$unpackedPacket[0]."%'";
            echo "<table class='HST'>";
            break;
        case "H":
            $SQL="INSERT INTO scores (user_id,score,play_date) VALUES ((SELECT idk_users FROM users WHERE username='"+$unpackedPacket[0]+"'),'"+$unpackedPacket[1]+"','"+date("Y/m/d h:i:s")+"')";
            break;
    }
    fwrite($myfile,$SQL)
    //Run the query!
    //echo $SQL;
    $result=$mysqli->query($SQL);
    fwrite($myfile,$result)
    $rank=1;
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            if($requestType=="G" ||$requestType=='U'){
                echo "<tr><td class='HS'>",$rank,"</td><td class='HS'>",$row["username"],"</td><td class='HS'>",$row["score"],"</td><td class='HS'>",$row["play_date"],"</td></tr>";
                $rank++;
            }else if($requestType=='U'){
                echo "<tr><td class='HS'>",$row["rank"],"</td><td class='HS'>",$row["username"],"</td><td class='HS'>",$row["score"],"</td><td class='HS'>",$row["play_date"],"</td></tr>";
            }
            else{
                echo $row["idk_users"];
            }
        }
        if($requestType=="G"||$requestType=='U'){
            echo "</table>";
        }
    }else{
        echo "False";
    }
?>