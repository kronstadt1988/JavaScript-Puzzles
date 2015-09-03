/**
 Code to solve the Bender, A depressed Robot  puzzle at www.codingame.com

 */

var inputs = readline().split(' ');
var L = parseInt(inputs[0]);
var C = parseInt(inputs[1]);
var startPointX;
var startPointY;
var endPointX;
var endPointY;
var teleport1X=-1;
var teleport1Y=-1;
var teleport2X;
var teleport2Y;
var matrix = [];

for (var i = 0; i < L; i++) {
    var row = readline();
    
    if(row.contains('@')){
        startPointY = i;
        startPointX = row.indexOf('@')
        
    }
    if(row.contains('$')){
        endPointY = i;
        endPointX = row.indexOf('$')
        
    }
    if(row.contains('T') && teleport1X ===-1){
        teleport1Y = i;
        teleport1X = row.indexOf('T')
        
    }
    if(row.contains('T') && teleport1X > 0){
        teleport2Y = i;
        teleport2X = row.indexOf('T')
    }
    
    row = row.split('');
    matrix.push(row)
   
    
}

function transpose(a) {
    return Object.keys(a[0]).map(function (c) { 
        return a.map(function (r) { 
            return r[c]; 
        }); 
    });
}

matrix = transpose(matrix)

function Direction(){
    this.directions = ["SOUTH", "EAST", "NORTH", "WEST"];
    this.directionIndex = 0;
    this.resetDir=false;
    var inverted = false;
    
    this.changeDirection = function(direction){
        if(arguments[0]){
            switch (arguments[0]){
                case "SOUTH":
                    this.directionIndex = 0;
                    break;
                case "EAST":
                    this.directionIndex = 1;
                    break;
                case "NORTH" :
                    this.directionIndex = 2;
                    break;
                case "WEST":
                    this.directionIndex = 3;
                    break;
            }
        }else{
            if(!inverted){
                if(this.resetDir === true){
                    this.directionIndex = 0;
                    this.resetDir = false;
                    return
                }
                if(this.directionIndex===3){
                    this.directionIndex = 0;    
                }else{
                    this.directionIndex++;    
                }
            }else{
                if(this.resetDir === true){
                    this.directionIndex = 3;
                    this.resetDir = false;
                    return
                }
                if(this.directionIndex===0){
                    this.directionIndex = 3;    
                }else{
                    this.directionIndex--;    
                }
            }
                
        }
    }
    this.getDirection = function(){
        return this.directions[this.directionIndex];
    }
    
    this.resetDirection = function(){
        this.resetDir = true;
    }
    
    this.invertDirection = function(){
        inverted ? inverted =false : inverted = true;
    }
    this.getInverted = function(){
        return inverted;
    }
}

function Bender(startX, startY, endX, endY){
    this.benderPositionX = startX;
    this.benderPositionY = startY;
    this.finalPositionX = endX;
    this.finalPositionY = endY;
    this.godMode = false;
    this.travelFinished = false;
    this.benderPath = [];
    this.isInLoop=false;
    
    this.testIfLoop = function(){
        var string = this.benderPath.join('');
        var length = string.length;
        if(length>1000){
            this.isInLoop = true;
        }
    }
    
    this.changeGodMode = function(){
        this.godMode ? this.godMode = false : this.godMode = true;
    }

    var directionObject = new Direction();
    
    this.walk = function(){
        switch(directionObject.getDirection()){
            case "SOUTH":
                this.takeAction(matrix[this.benderPositionX][this.benderPositionY+1]);
                break;
            case "EAST":
                this.takeAction(matrix[this.benderPositionX+1][this.benderPositionY]);
                break;
            case "NORTH" :
                this.takeAction(matrix[this.benderPositionX][this.benderPositionY-1]);
                break;
            case "WEST":
                this.takeAction(matrix[this.benderPositionX-1][this.benderPositionY]);
                break;
        }
        this.testIfLoop();
        
    }
    
    this.advance = function(){
        //printErr("CALLING ADVANCE")
        directionObject.resetDirection();
        switch(directionObject.getDirection()){
            case "SOUTH":
                this.benderPositionY+=1;
                this.benderPath.push(directionObject.getDirection());
                break;
            case "EAST":
                this.benderPositionX+=1;
                this.benderPath.push(directionObject.getDirection());
                break;
            case "NORTH" :
                this.benderPositionY-=1;
                this.benderPath.push(directionObject.getDirection());
                break;
            case "WEST":
                this.benderPositionX-=1;
                this.benderPath.push(directionObject.getDirection());
                break;
        }
        
        //printErr("current X " + this.benderPositionX)
        //printErr("current Y " + this.benderPositionY)
    }
    this.takeAction = function (character){
        switch(character){
            case " ":
                this.advance();
                break;
            case "N":
                this.advance();
                directionObject.changeDirection("NORTH");
                break;
            case "S":
                this.advance();
                directionObject.changeDirection("SOUTH");
                break;
            case "E":
                this.advance();
                directionObject.changeDirection("EAST");
                break;
            case "W":
                this.advance();
                directionObject.changeDirection("WEST");
                break;
            case "B":
                this.advance();
                this.godMode ? this.godMode = false : this.godMode = true;
                break;
            case "I":
                directionObject.invertDirection();
                this.advance();
                break;
            case "$":
                this.travelFinished = true;
                this.advance();
                break;
            case "T":
                this.advance();
                if(bender.benderPositionX ===teleport1X && bender.benderPositionY===teleport1Y){
    
                    bender.benderPositionX = teleport2X;
                    bender.benderPositionY = teleport2Y;
                }else{
                    bender.benderPositionX = teleport1X;
                    bender.benderPositionY = teleport1Y;
                }
                break;
            case "X":
                if(this.godMode){
                    this.advance();
                    matrix[bender.benderPositionX][bender.benderPositionY] =" ";
                    
                }else{
                    directionObject.changeDirection();
                    
                }
                break;
            case "#" :
                directionObject.changeDirection();
                
                break;
            
        }
    }
}

var bender = new Bender(startPointX,startPointY, endPointX, endPointY);

while(!bender.travelFinished){
    bender.walk();
    if(bender.isInLoop===true){
        
        break;
    }
}


if(bender.isInLoop===true){
     print("LOOP")

}else{
    bender.benderPath.forEach(function(item, index, array){
    print(item)
    })    
}


