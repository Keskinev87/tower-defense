class Level {
    constructor(number) {
        this.number = number;  //the number of the level
        this.gameCanvas; // the game layer
        this.width;
        this.height;
        this.ctx;
        this.waves; //array with the waves for the level
        this.wave; // the current wave(the array)
        this.currentWaveNumber = 0;  //the number of the current wave with monsters
        this.builtTowers; //array with the built towers.
        this.releaseStage = 0;  // used to release the monsters in several frames
        this.monstersLeft;  // how many monsters from the current wave are left - used to stop iterating when they are over.
        this.towers = []; //the towers that are built by the player
    }

    load() {
        this.gameCanvas = document.getElementById('game-layer');
        this.ctx = this.gameCanvas.getContext('2d');
        this.width = this.gameCanvas.width;
        this.height = this.gameCanvas.height;
        return new Promise((resolve, reject) => {
            let promises =[];
            promises.push(this.getWaves()) //TODO - add the getMap
            Promise.all(promises)
                .then(() => resolve())
                .catch(() => {
                    reject()
                })
        })
        
    }

    getWaves() {
        return new Promise((resolve, reject) => {
            data.getWaves(this.number).then(waves => {
                this.waves = waves
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }

    releaseNewWave () {
        
        let wave = [];
        let curWave = this.waves[this.currentWaveNumber]
        console.log(this.waves)
        console.log(curWave)
        for (let monster of curWave){
            wave.push(new Monster(monster[0], monster[1], monster[2]))
        }
        this.wave = wave
        this.monstersLeft = this.wave.length;
        this.releaseStage = 0; //set the stage to 0 to begin the releasing from the first monster
        this.animateWave();

    }

    animateWave () {
       console.time('timer')
        this.ctx.clearRect(0,0, this.width, this.height);
        //if there are any monsters left in the level
        if(this.monstersLeft > 0) {
            //sort the array by progress, so the towers target the first monster.
            // this.wave.sort(compare)
            for (let i=0; i < this.wave.length * this.releaseStage / 400; i++){
                let curMonster = this.wave[i]
                if(curMonster != null) {
                    curMonster.advance();
                    if(curMonster.progress < 1000) {
                        let currentPos = {x: map.path[curMonster.progress].x * this.width, y: map.path[curMonster.progress].y * this.height} 
                        curMonster.draw(currentPos, this.height, this.ctx);
                        //check if the monster is within the range of a tower/s
                        for(let tower of this.towers) {
                            //check if the monster is in range. 
                            if(tower.checkIfMonsterInRange(currentPos) && tower.currentTarget === null){
                                console.log('here');
                                tower.currentTarget = curMonster;
                                tower.shootCount++;
                                // aquire the current monster as a target
                                // since we sorted the array at the beginning, the first monster should always be aquired as target
                            }
                            //check if the tower can shoot
                            
                            if(tower.shootCount == tower.speed && tower.currentTarget != null) {
                                
                                tower.fireProjectile(currentPos);
                                tower.shootCount = 0; //reset the count so the next projectile is generated after speed * frames
                            }
                            
                            for (let i = 0; i < tower.projectiles.length; i++) {
                               
                                if(tower.projectiles[i].move()){
                                    
                                    tower.projectiles[i].draw();
                                }
                                    
                                else
                                    tower.projectiles.splice(i,1);
                            }
                                
                            
                            tower.currentTarget = null;
                        }
                    } else{     
                        this.wave[i] = null;
                        this.monstersLeft--;
                    }
                }
            }
            if(this.releaseStage < 400) {
                this.releaseStage++;
            }
            console.timeEnd('timer')
            window.requestAnimationFrame(() => this.animateWave()); //loop until the monsters are dead or out of the map
        } else {
            console.log("Done")
        }

        function compare(a,b) {
            if (a.progress < b.progress)
              return -1;
            if (a.progress > b.progress)
              return 1;
            return 0;
        }
        
    }

    
    

}
// the map object        
class Map {

    constructor(){
        this.bgrCanvas = document.getElementById('background-layer');
        this.bgrctx = this.bgrCanvas.getContext('2d');
        this.width = this.bgrCanvas.width; 
        this.height = this.bgrCanvas.height;
        this.path;
        this.image = new Image();
        this.image.src = './images/map.png';
        this.towerNestsCoords; //used to generate the tower nests along the card
        this.availableTowers=[]; //all towers that are available for this map
    }
    
    load() {
        return new Promise((resolve, reject) => {
            let promises =[];
            promises.push(this.getTowerNests(), this.getAvailableTowers(), this.getPath()) //TODO - add the getMap
            Promise.all(promises).then(() => resolve())
                .catch((error) => {
                    reject(error);
                })
        })
    }

    drawMap () {
        this.bgrctx.drawImage(this.image, 0, 0, this.width, this.height);
    }

    drawTowerNests() {
        ui.placeTowerNests(this.towerNestsCoords, this.availableTowers);
    }

    getTowerNests() {
        return new Promise((resolve, reject) => {
            data.getTowerNests(0).then((coords) => {
                this.towerNestsCoords = coords;
                resolve();
            }).catch(() => {
                reject("Error in tower nests");
            })
        })
        
    }

    getAvailableTowers() {
        return new Promise((resolve, reject) => {
            data.getAvailableTowers([0]).then(towers => {
                for (let towerType of towers) {
                    console.log("Tower:")
                    console.log(towerType)
                    this.availableTowers.push(new Tower(towerType))
                };
                console.log("Available towers");
                console.log(this.availableTowers)
                resolve();
            }).catch(() => {
                reject("Error in available towers");
            })
        })
    }

    //TODO - create different paths for the different levels and pass them when constructing a new Map
    getPath () {

        return new Promise((resolve, reject) => {
            let tempPath = []
            let x, y, xy;
        
        
            for(let i=1; i <= 1000; i ++) {
                switch (true) {
                    case i <= 140:
                        x = Number((0.2 / 140 * i).toFixed(3));
                        y = 0.2;
                        xy = {x:x, y:y} 
                        break
                    case i <= 240:
                        x = 0.2;
                        y = Number((0.2 + 0.2/100 * (i - 140)).toFixed(3));		
                        xy = {x:x, y:y} 	
                        break
                    case i <= 380:
                        x = Number((0.2 + 0.2 / 140 * (i-240)).toFixed(3)) 
                        y = 0.4
                        xy = {x:x, y:y}
                        break 
                    case i <= 620:
                        x = Number((0.4 + 0.2 / 240 * (i-380)).toFixed(3))
                        y = Number((0.4 + 0.2 / 240 * (i-380)).toFixed(3))
                        xy = {x:x, y:y}
                        break 
                    case i <= 760:
                        x = Number((0.6 + 0.2 / 140 * (i-620)).toFixed(3))
                        y = 0.6
                        xy = {x:x, y:y}
                        break 
                    case i <=860:
                        x = 0.8;
                        y = Number((0.6 + 0.2/100 * (i - 760)).toFixed(3))
                        xy = {x:x, y:y}
                        break 
                    case i <= 1000:
                        x = Number((0.8 + 0.2/ 140 * (i - 860)).toFixed(3))
                        y = 0.8
                        xy = {x:x, y:y}
                        break 
                    default:
                        break
                    
                }
                tempPath.push(xy)
            }
            
            if (tempPath) {
                this.path = tempPath;
                resolve();
            } else {
                reject("Error in path");
            }
        })
         
    }
};

// function Path (start, end, ctrlPoint, ratio) {


class Monster {
    
    constructor(hp, speed, skin) {
        this.hp = hp;
        this.remainingHp = hp;
        this.speed = speed;
        this.progress = 0; //this is between 0 and 100 - it is a percent
        this.deviation = Math.floor(Math.random() * 10) - 10;
        this.skin = skin; //used to draw different monster shapes
    };
    

    advance() {
        this.progress += this.speed;
    }

    draw (point, height, ctx) {
        //the body of the monster
            ctx.beginPath();
            ctx.arc(point.x + this.deviation, point.y + this.deviation, height * 0.05, 0, 2*Math.PI, true);
            ctx.stroke();
            //the healthbar
            ctx.beginPath();
            ctx.fillRect(point.x - height * 0.04 + this.deviation, point.y - height * 0.08 + this.deviation, height * 0.08 * this.remainingHp / this.hp, height*0.01)
        
    }
}

class Tower {
    
    constructor(type) {
        this.type = type;
        this.gameArea = document.getElementById('gameArea');
        this.gameCanvas = document.getElementById('game-layer');
        this.width = this.gameCanvas.width;
        this.centerX;
        this.centerY;
        this.projectiles=[];
        this.currentTarget = null;
        this.shootCount = 0; //this will be incremented to the speed of the tower and when they are equal, a projectile will be shot.

        switch (type) {
            case 'archer': {
                this.damage = 10;
                this.range = 0.2;
                this.speed = 15;
                this.sprite = 'images/stone-tower.png';
                this.uiImage = new Image();
                this.uiImage.src = 'images/stone-tower.png';
                this.uiImage.id = this.type;
                this.uiImage.width = this.width * 0.08 ;
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
        this.centerX = Math.floor(this.gameCanvas.width * parseInt(nest.style.left)/100 + this.gameCanvas.width * 0.04);
        this.centerY = Math.floor(this.gameCanvas.height * parseInt(nest.style.top)/100);
        let towerImg = document.createElement('img')
        towerImg.src = this.sprite;
        towerImg.classList.add('tower');
        towerImg.style.width = Math.floor(this.width * 0.08) + 'px';

        nest.append(towerImg);
        //delete the border of the nest, so it is not visible anymore
        nest.style.border = 'none';
        console.log(this.centerX, this.centerY)
        this.drawRange();
    }
    
    drawRange () {
        let ctx = document.getElementById("game-layer").getContext('2d');
        
        ctx.beginPath()
        ctx.arc(this.centerX, this.centerY, Math.floor(this.range * this.width), 0, 2 * Math.PI, true)
        ctx.stroke()
    }

    checkIfMonsterInRange(point) {
        let dx = Math.abs(this.centerX - point.x);
        let dy = Math.abs(this.centerY - point.y);
        let distance = Math.sqrt(dx * dx + dy * dy);
   
        if(distance < this.range * this.width)
            return true;
        return false;
    }

    fireProjectile(endPt) {
        let newProjectile = new Projectile(this.centerX, this.centerY, endPt);

        this.projectiles.push(newProjectile);
    }

}

class Projectile {

    constructor(startX, startY, endPt) {
        this.canvas = document.getElementById('game-layer');
        this.ctx = this.canvas.getContext('2d');
        this.speed = 30;
        this.radius = 5;
        this.originPointX = startX;
        this.originPointY = startY;
        this.curX = startX;
        this.curY = startY;
        this.endX = endPt.x;
        this.endY = endPt.y;
        this.distanceX = this.endX - this.originPointX;
        this.distanceY = this.endY - this.originPointY;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.curX, this.curY, this.radius, 0, 2*Math.PI);
        this.ctx.fill();
    }
    
    move() {
        this.curX += this.distanceX / this.speed;
        this.curY += this.distanceY / this.speed;
        if(Math.abs(this.curX - this.originPointX) > Math.abs(this.distanceX) && Math.abs(this.curY - this.originPointY) > Math.abs(this.distanceY)) {
            return false;
        }
        return true;
    }

}