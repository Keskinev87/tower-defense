class Monster {
    
    constructor(hp, speed, sprite) {
        this.hp = hp;
        this.remainingHp = hp;
        this.speed = speed;
        this.progress = 0; //this is between 0 and 100 - it is a percent
        this.deviation = Math.floor(Math.random() * 10) - 10;
        this.curPosX = map.path[0].x * width;
        this.curPosY = map.path[0].y * height;
        this.curSprite = 0; //the sprite that should be drawn on the screen in the current frame
        this.animationStep = 0; //this will determine how fas the monster will be animated
        this.sprite = sprite; //used to draw different monster shapes
    };
    

    advance() {
        this.progress += this.speed;
        
        if(this.animationStep % 3 == 0)
            this.curSprite++;
        
        if(this.curSprite == 10)
            this.curSprite = 0;

        this.animationStep++
        
    }

    draw () {
        //the body of the monster
        let img = this.sprite + this.curSprite
            //TODO: Fix the drwaing algoritm - right now it doesn't draw according to the dimensions
            ctx.drawImage(preloaded[img], this.curPosX , this.curPosY - width * 0.08, width * 0.08, width * 0.08) 
            // ctx.beginPath();
            // ctx.arc(this.curPosX + this.deviation, this.curPosY + this.deviation, height * 0.05, 0, 2*Math.PI, true);
            // ctx.stroke();
            // //the healthbar
            // ctx.beginPath();
            ctx.fillRect(this.curPosX, this.curPosY - height * 0.13, height * 0.08 * this.remainingHp / this.hp, height*0.01)   
    }

    takeDamage() {
        this.remainingHp += -10;
        console.log(this.remainingHp);
    }

}