<?php
    //Connect to the server
    $mysqli = new mysqli("localhost", "localDB", "h9bWX9i1UBCY2JPR", "bubbles");
    if($mysqli->connect_error) {
        echo('Could not connect');
    }
    //Load the request data into memory
    $L = $_REQUEST["L"];
    $R = $_REQUEST["R"];
    $H = $_REQUEST["H"];
    $G = $_REQUEST["G"];
    $U = $_REQUEST["U"];
    $requestType='';
    $dataPacket='';
    $SQL='';
    //Figure out which request it is and grab the data packet
    if($L!==''){
        $requestType='L';
        $dataPacket=$L;
    }else if($R!==''){
        $requestType='R';
        $dataPacket=$R;
    }else if($H!==''){
        $requestType='H';
        $dataPacket=$H;
    }else if($G!==''){
        $requestType='G';
        $dataPacket=$G;
    }else if($U!==''){
        $requestType='U';
        $dataPacket=$U;
    }
    //Unpack the dataPacket into an array
    echo $dataPacket;
    $unpackedPacket=explode(':', $dataPacket);
    //Handle the SQL creation
    switch($requestType){
        case "L":
            $SQL="SELECT COUNT(*) FROM users WHERE username='"+$unpackedPacket[0]+"' AND password='"+$unpackedPacket[1]+"'";
            break;
        case "R":
            $SQL="INSERT INTO users (username,password,email,phone) VALUES ('"+$unpackedPacket[0]+"','"+$unpackedPacket[1]+"','"+$unpackedPacket[2]+"','"+$unpackedPacket[3]+"')";
            break;
        case "G":
            $SQL="SELECT u.username,s.score,s.play_date FROM scores s INNER JOIN users u ON s.user_id=u.idk_users";
            break;
        case "U":
            $SQL="SELECT u.username,s.score,s.play_date FROM scores s INNER JOIN users u ON s.user_id=u.idk_users WHERE u.username LIKE '%"+$unpackedPacket[0]+"%'";
            break;
        case "H":
            $SQL="INSERT INTO scores (user_id,score,play_date) VALUES ((SELECT idk_users FROM users WHERE username='"+$unpackedPacket[0]+"'),'"+$unpackedPacket[1]+"','"+date("Y/m/d h:i:s")+"')";
            break;
    }
    //Run the query!
    $result=$mysqli->query($sql);
    //Screw it give the Javascript side a puzzle to solve in how it interprets this mess!
    echo $result;
?>