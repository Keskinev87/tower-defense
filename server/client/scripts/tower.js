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
                this.price = 40;
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