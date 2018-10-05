

class Point {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.width = 20;
        this.height = 20;

        this.centerX = this.x + this.width/2;
        this.centerY = this.y + this.height/2;

        
    }
    drawPoint() {
        ctx.beginPath();
        ctx.rect (this.x,this.y,this.width,this.height);
        ctx.stroke();

        if (this.pointID != pointList.length-1) {
            write (this.pointID, this.x+this.width+5,this.y);
        }
    }
    getId(){
        this.pointID = pointList.indexOf(this);
    }
    updatePoint() {
        this.getId();
    }
}

function updatePoints() {
    for (i=0;i<pointList.length;i++) {
        pointList[i].drawPoint();
        pointList[i].updatePoint();
    }
}

function createPoint(x,y) {
    var point = new Point (x,y);
    pointList.push(point);
}

function createPointMap() {
    createPoint(200,200);
    createPoint(300,200);
    createPoint(400,200);
    createPoint(400,300);
    createPoint(400,400);
    createPoint(300,400);
    createPoint(200,400);
    createPoint(100,400);
    createPoint(100,300);
    createPoint(100,200);
    createPoint(100,200);
}

function drawConnectorLines() {
    for (i=0;i<pointList.length-1;i++) {
        var point1 = pointList[i];
        var point2 = pointList[i+1];
        ctx.beginPath();
        ctx.moveTo(point1.centerX,point1.centerY);
        ctx.lineTo(point2.centerX,point2.centerY);
        ctx.stroke();
    }
}