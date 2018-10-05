/// creeps.js

class Creep {
    constructor(x,y,width,height,fillColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor

        this.fillColor = 'white';

        this.width = creepWidth;
        this.height = creepHeight;

        this.centerX = this.x + this.width/2;
        this.centerY = this.y + this.height/2;

        this.collidePoint = false;

        this.currentPointID = 0;
        this.currentPoint = null;
        this.nextPointID = 0;
        this.nextPoint = null;

        this.velX = 0;
        this.velY = 0;

        this.ID = 0;
    }
    drawCreep() {
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.stroke();

        write (this.currentPointID + ' , ' + this.nextPointID, this.x + this.width + 5, this.y);
    }
    handleCollision() {
        if (this.collidePoint == true) {
            this.currentPoint = pointList[this.currentPointID];
            this.fillColor = 'red';
            return;
        }
        else {
            this.fillColor = 'white';
        }
    }
    getNextPoint() {
        this.nextPointID = this.currentPointID + 1;
        this.nextPoint = pointList[this.nextPointID];
        this.goToPoint();
    }
    goToPoint() {
		if (this.nextPoint.x > this.x && this.y+this.height/2 <= this.nextPoint.centerY) {
			this.velX = 1;
			this.velY = 0;
        }
		if (this.nextPoint.y > this.y && this.x+this.width/2 >= this.nextPoint.centerX) {
			this.velX = 0;
			this.velY = 1;
		}
		if (this.nextPoint.x < this.x && this.y+this.height/2 >= this.nextPoint.centerY) {
			this.velX = -1;
			this.velY = 0;
        }
        if (this.nextPoint.centerY < this.y && this.x+this.width/2 <= this.nextPoint.centerX) {
            this.velX = 0;
            this.velY = -1;
        }
    }
    getID() {
        this.ID = creepList.indexOf(this);
    }
    finalPoint() {
        if (this.nextPointID >= pointList.length-1) {
            reachedEnd += 1;
            this.killMe();
        }
    }
    killMe() {
        creepList.splice(this.ID,1);
    }
    moveCreep() {
        this.x += this.velX;
        this.y += this.velY;
    }
    updateCreep() {
        this.getID();
        this.moveCreep();
        this.handleCollision();
        this.finalPoint();
    }
}

function updateCreeps() {
    for (i=0;i<creepList.length;i++) {
        creepList[i].drawCreep();
        creepList[i].updateCreep();
    }
}

function createCreep(x,y) {
    var creep = new Creep (x,y);
    creepList.push(creep);
    creepsCreated += 1;
}

function checkPointCollision() {
    for (i=0;i<creepList.length;i++) {
        var obj1 = creepList[i];
        for (j=0;j<pointList.length;j++) {
            var obj2 = pointList[j];
            var pointID = pointList.indexOf(obj2);
            if (obj1.x < obj2.x + obj2.width &&
                obj1.x + obj1.width > obj2.x &&
                obj1.y < obj2.y + obj2.height &&
                obj1.y + obj1.height > obj2.y) {
                    
                    obj1.collidePoint = true;
                    obj1.currentPointID = pointID;
                    obj1.getNextPoint();
                    break;
                }
            else {
                    obj1.collidePoint = false;
            }
        }
    }
}