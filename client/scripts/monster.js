class Monster {
    
    constructor(hp, speed, type) {
        this.hp = hp;
        this.remainingHp = hp;
        this.speed = speed;
        this.progress = 0; //this is between 0 and 100 - it is a percent
        this.deviation = Math.floor(Math.random() * 20);
        this.curPosX = map.path[0].x * width;
        this.curPosY = map.path[0].y * height;
        this.curSprite = 0; //the sprite that should be drawn on the screen in the current frame
        this.direction = 0; //0 = 'right', 1 = 'left'. This tells the game which sprite of the monster to draw - left or right
        this.animationStep = 0; //this will determine how fas the monster will be animated
        this.sprite = type; //used to draw different monster shapes
        this.prizeMoney;
        switch(type) {
            case 'spider': {
                this.prizeMoney = 2;
                break;
            }
            case 'grunt': {
                this.prizeMoney = 5;
                break;
            }
            case 'knight': {
                this.prizeMoney = 10;
                break;
            }
            default: {
                this.prizeMoney = 0;
                break;
            }
        }
    };
    

    advance() {
        this.progress += this.speed;
        
        if(this.animationStep % 3 == 0)
            this.curSprite++;
        
        if(this.curSprite == 10)
            this.curSprite = 0;

        this.animationStep++
        
    }

    setCurrentPoint(point) {
        if(point.x < this.curPosX)
            this.direction = 1;
        else
            this.direction = 0;

        this.curPosX = point.x;
        this.curPosY = point.y;
    }

    draw () {
        //the body of the monster
        let img = this.sprite + this.direction
            //TODO: Fix the drwaing algoritm - right now it doesn't draw according to the dimensions
        ctx.drawImage(preloaded[img], 0, this.curSprite * 130, 121, 130, this.curPosX , this.curPosY - this.deviation, width * 0.08, width * 0.08) 
            // ctx.beginPath();
            // ctx.arc(this.curPosX + this.deviation, this.curPosY + this.deviation, height * 0.05, 0, 2*Math.PI, true);
            // ctx.stroke();
            // //the healthbar
            // ctx.beginPath();
        ctx.fillRect(this.curPosX, this.curPosY - this.deviation, height * 0.08 * this.remainingHp / this.hp, height*0.01)   
    }

    takeDamage(damage) {
        this.remainingHp -= damage;
    }

}