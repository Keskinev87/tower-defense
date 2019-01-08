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
                this.range = 0.1;
                this.speed = 15;
                this.price = 40;
                this.sprite = preloaded[type];
                this.uiImage = new Image();
                this.uiImage.src = 'images/archer.png';
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
        this.centerX = Math.floor(width * parseInt(nest.style.left)/100);
        this.centerY = Math.floor(height * parseInt(nest.style.top)/100);
        //add to active towers
        level.towers.push(this); //add the tower to the array with built towers
        //subract cost
        //update the money
        game.updateMoney(-this.price);
        //draw the tower
        bgrctx.drawImage(this.sprite, this.centerX, this.centerY  - 0.02 * height, this.uiImage.width, this.uiImage.width)
        //hide the nest
        nest.style.visibility = 'hidden';
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
        let newProjectile = new Projectile(this.damage, this.centerX, this.centerY, this.currentTarget.x + width * 0.02, this.currentTarget.y + height * 0.02, this.currentTargetIndex);

        this.projectiles.push(newProjectile);
        
    }
    

}