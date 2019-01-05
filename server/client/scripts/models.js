class Monster {
    
    constructor(hp, speed, skin) {
        this.hp = hp;
        this.remainingHp = hp;
        this.speed = speed;
        this.progress = 0; //this is between 0 and 100 - it is a percent
        this.deviation = Math.floor(Math.random() * 10) - 10;
        this.skin = skin; //used to draw different monster shapes
        this.curPosX = map.path[0].x * width;
        this.curPosY = map.path[0].y * height;
        
    };
    

    advance() {
        this.progress += this.speed;
    }

    draw () {
        //the body of the monster
            ctx.beginPath();
            ctx.arc(this.curPosX + this.deviation, this.curPosY + this.deviation, height * 0.05, 0, 2*Math.PI, true);
            ctx.stroke();
            //the healthbar
            ctx.beginPath();
            ctx.fillRect(this.curPosX - height * 0.04 + this.deviation, this.curPosY - height * 0.08 + this.deviation, height * 0.08 * this.remainingHp / this.hp, height*0.01)   
    }

    takeDamage() {
        this.remainingHp += -10;
        console.log(this.remainingHp);
    }

}

class Tower {
    
    constructor(type) {
        this.type = type;
        this.centerX;
        this.centerY;
        this.projectiles=[];
        this.currentTarget = null;
        this.currentTargetIndex;
        this.shootCount = 0; //this will be incremented to the speed of the tower and when they are equal, a projectile will be shot.

        switch (type) {
            case 'archer': {
                this.damage = 10;
                this.range = 0.4;
                this.speed = 15;
                this.sprite = 'images/stone-tower.png';
                this.uiImage = new Image();
                this.uiImage.src = 'images/stone-tower.png';
                this.uiImage.id = this.type;
                this.uiImage.width = width * 0.08 ;
                this.uiImage.classList.add('tower-ui');
            }
        }
    }
    
    build (nest) {
        //We will build the tower using the nest coordinates. We will instert the tower into the nest.
        //With position absolute the tower will use the nest's coordinates to build itself.
        //The center coordinates are used to calculate if a monster is within range. Also as a start point for the projectiles.
        console.log(parseInt(nest.style.top));
        console.log(parseInt(nest.style.left));
        this.centerX = Math.floor(width * parseInt(nest.style.left)/100 + width * 0.04);
        this.centerY = Math.floor(height * parseInt(nest.style.top)/100);
        let towerImg = document.createElement('img')
        towerImg.src = this.sprite;
        towerImg.classList.add('tower');
        towerImg.style.width = Math.floor(width * 0.08) + 'px';

        nest.append(towerImg);
        //delete the border of the nest, so it is not visible anymore
        nest.style.border = 'none';
        console.log(this.centerX, this.centerY)
        this.drawRange();
    }
    
    drawRange () {
        
        ctx.beginPath()
        ctx.arc(this.centerX, this.centerY, Math.floor(this.range * width), 0, 2 * Math.PI, true)
        ctx.stroke()
    }

    checkIfMonsterInRange(point) {
        let dx = Math.abs(this.centerX - point.x);
        let dy = Math.abs(this.centerY - point.y);
        let distance = Math.sqrt(dx * dx + dy * dy);
   
        if(distance < this.range * width)
            return true;
        return false;
    }

    setCurrentTarget(point, index) {
        this.currentTarget = point;
        this.currentTargetIndex = index;
    }

    fireProjectile() {
        let newProjectile = new Projectile(this.centerX, this.centerY, this.currentTarget, this.currentTargetIndex);

        this.projectiles.push(newProjectile);
        
    }

}

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