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
        
        this.ctx.clearRect(0,0, this.width, this.height);
        if(this.monstersLeft > 0) {
            for (let i=0; i < this.wave.length * this.releaseStage / 400; i++){
                let curMonster = this.wave[i]
                if(curMonster != null) {
                    
                    curMonster.advance();
                    
                    if(curMonster.progress < 1000) {
                        let currentPos = {x: map.path[curMonster.progress].x * this.width, y: map.path[curMonster.progress].y * this.height} 
                        curMonster.draw(currentPos, this.height, this.ctx);
                    } else{     
                        this.wave[i] = null;
                        this.monstersLeft--;
                    }
                }
            }
            if(this.releaseStage < 400) {
                this.releaseStage++;
            }
            
            window.requestAnimationFrame(() => this.animateWave()); //loop until the monsters are dead or out of the map
        } else {
            console.log("Done")
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
        this.towers;  //all towers, that are built by the player
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
        this.towerWidth = this.width * 0.1;
        this.center;

        switch (type) {
            case 'archer': {
                this.damage = 10;
                this.range = 0.1;
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
    

    build (point) {
        let towerImg = document.createElement('img')
        towerImg.src = this.sprite;
        towerImg.classList.add('tower');
        towerImg.style.top = point.top;
        towerImg.style.left = point.left;
        towerImg.style.width = Math.floor(this.width * 0.08) + 'px';

        this.gameArea.append(towerImg);

         
        // this.center = point;
        // let startPt = {x: point.x - this.towerWidth / 2, y: point.y - this.towerWidth/2}
        // ctx.strokeRect(startPt.x, startPt.y, this.towerWidth, this.towerWidth)
    }
    
    drawRange (ctx) {
        ctx.beginPath()
        ctx.arc(this.center.x, this.center.y, this.range * this.width, 0, 2 * Math.PI, true)
        ctx.stroke()
    }

}