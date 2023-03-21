
function login(userName,password,returnFunction){
    sendQuery('L' , userName+':'+password , returnFunction)
}
function register(userName,password,email,phone,returnFunction){
    sendQuery('R' , userName+':'+password+':'+email+':'+phone , returnFunction)
}
function registerHighscore(userName,score,returnFunction){
    sendQuery('H' , userName+':'+score , returnFunction)
}
function getHighscores(returnFunction){
    sendQuery('G' , '' , returnFunction)
}
function getHighscore(userName , returnFunction){
    sendQuery('U' , userName , returnFunction)
}
function sendQuery(mode, dataPacket,returnFunction){
    const xhttpRequest=new XMLHttpRequest()
    xhttpRequest.onload=returnFunction
    xhttpRequest.open("GET","QueryDatabase.php?"+mode+"="+dataPacket+";")
    xhttpRequest.send()
}
