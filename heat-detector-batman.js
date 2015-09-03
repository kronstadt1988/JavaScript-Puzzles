/**
 Code to solve the Heat Detector (batman) puzzle at www.codingame.com

 */

var inputs = readline().split(' ');
var widthBuilding = parseInt(inputs[0])-1; // width of the building.
var heightBuilding = parseInt(inputs[1]) -1; // height of the building.
var numberOfTurns = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
var X0 = parseInt(inputs[0]);
var Y0 = parseInt(inputs[1]);
var batmanPosX = X0;
var batmanPosY = Y0;
var maxX = widthBuilding;
var minX = 0;
var maxY = heightBuilding;
var minY = 0;

function getNextWidthWindow(direction){
    if(direction==="U" || direction==="D"){
        return batmanPosX;
    }else if(direction==="UR" || direction==="DR" || direction==="R"){
        minX = batmanPosX;
        if((maxX - batmanPosX)%2 ===0){
            printErr("FLAG1")
            var nextWindowX = (maxX - batmanPosX)/2 
            batmanPosX = batmanPosX + nextWindowX;
            return batmanPosX;
        }else{
            batmanPosX++;
            var nextWindowX = (maxX - batmanPosX)/2;
            batmanPosX = batmanPosX + nextWindowX;
            return batmanPosX;
        }
        
    }else if(direction==="UL" || direction==="DL" || direction==="L"){
        maxX = batmanPosX;
        if((batmanPosX-minX)%2 ===0){
            printErr("FLAG1")
            var nextWindowX = (batmanPosX-minX)/2 
            batmanPosX = batmanPosX - nextWindowX;
            return batmanPosX;
        }else{
            printErr("FLAG2")
            batmanPosX--;
            var nextWindowX = (batmanPosX - minX)/2;
            batmanPosX = batmanPosX - nextWindowX;
            return batmanPosX;
        }
    }
}
function getNextHeightWindow(direction){
    if(direction === 'R' || direction === 'L'){
        return batmanPosY;
    }else if(direction === 'UR' || direction === 'U' || direction === 'UL'){
        maxY = batmanPosY;
        if((batmanPosY-minY)%2===0){
            printErr("FLAGy2")
            var nextWindowY = (batmanPosY-minY)/2
            batmanPosY = batmanPosY - nextWindowY;
            return batmanPosY;
            
        }else{
            printErr("FLAGy2")
            batmanPosY--;
            var nextWindowY = (batmanPosY-minY)/2
            batmanPosY = batmanPosY - nextWindowY;
            return batmanPosY;
        }
    }else if(direction === 'DR' || direction === 'D' || direction === 'DL'){
        minY = batmanPosY;
        if((maxY-batmanPosY)%2===0){
            printErr("FLAG")
            var nextWindowY = (maxY-batmanPosY)/2
            
            batmanPosY = batmanPosY+nextWindowY;
            return batmanPosY
        }else{
            batmanPosY++;
            var nextWindowY = (maxY - batmanPosY)/2
            batmanPosY = batmanPosY + nextWindowY;
            return batmanPosY;
        }
    }
    
    
    if((heightBuilding - batmanPosY)/2 ===0){
            var nextWindowX = (heightBuilding - batmanPosY)/2 
            return batmanPosX+nextWindowX;
        }else{
            batmanPosY++;
            var nextWindowY = (heightBuilding - batmanPosY)/2;
            return batmanPosY+nextWindowY;
        }
}
// game loop
while (true) {
    var BOMB_DIR = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
    
    print(getNextWidthWindow(BOMB_DIR) + ' '+ getNextHeightWindow( BOMB_DIR)); // the location of the next window Batman should jump to.
}