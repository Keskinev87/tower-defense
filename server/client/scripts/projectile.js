class Projectile {

    constructor(startX, startY, endPt, index) {
        this.speed = 120;
        this.radius = 5;
        this.originPointX = startX;
        this.originPointY = startY;
        this.curX = startX;
        this.curY = startY;
        this.endX = endPt.x;
        this.endY = endPt.y;
        this.distanceX = this.endX - this.originPointX;
        this.distanceY = this.endY - this.originPointY;
        this.targetIndex = index;
    }

    draw() {
        
        ctx.beginPath();
        ctx.arc(this.curX, this.curY, this.radius, 0, 2*Math.PI);
        ctx.fill();
    }
    
    move() {
        this.curX += this.distanceX / 30;
        this.curY += this.distanceY / 30;
        if(Math.abs(this.curX - this.originPointX) > Math.abs(this.distanceX) && Math.abs(this.curY - this.originPointY) > Math.abs(this.distanceY)) {
            return false;
        }
        return true;
    }

}