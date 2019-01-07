class Projectile {

    constructor(startX, startY, endPtX, endPtY, index) {
        this.speed = 120;
        this.radius = 5;
        this.originPointX = startX;
        this.originPointY = startY;
        this.curX = startX;
        this.curY = startY;
        this.endX = endPtX;
        this.endY = endPtY;
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
        this.curX += this.distanceX / 15;
        this.curY += this.distanceY / 15;
        if(Math.abs(this.curX - this.originPointX) > Math.abs(this.distanceX) && Math.abs(this.curY - this.originPointY) > Math.abs(this.distanceY)) {
            return false;
        }
        return true;
    }

}