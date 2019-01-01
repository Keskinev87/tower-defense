class Level {
    constructor(number) {
        this.number = number;  //the number of the level
        this.gameCanvas; // the game layer
        this.width;
        this.height;
        this.ctx;
        this.map;
        this.path; //the map for the level
        this.waves; //array with the waves for the level
        this.wave; // the current wave(the array)
        this.currentWaveNumber = 0;  //the number of the current wave with monsters
        this.availableTowers;  //array with available towers
        this.builtTowers; //array with the built towers.
        this.releaseStage = 0;  // used to release the monsters in several frames
        this.monstersLeft;  // how many monsters from the current wave are left - used to stop iterating when they are over.
        this.availableTowers; //all towers that are available for this stage of the game
        this.towers;  //all towers, that are built by the player

    }

    load() {
        this.gameCanvas = document.getElementById('game-layer');
        this.ctx = this.gameCanvas.getContext('2d');
        this.width = this.gameCanvas.width;
        this.height = this.gameCanvas.height;
        return new Promise((resolve, reject) => {
            let promises =[];
            promises.push(this.getWaves(), this.getAvailableTowers(), this.getMap()) //TODO - add the getMap
            Promise.all(promises).then(() => resolve(true))
                .catch(() => {
                    reject("Loading level failed")
                })
        })
        
    }

    getWaves() {
        return new Promise((resolve, reject) => {
            data.getWaves(this.number).then(waves => {
                this.waves = waves
                resolve(true)
            }).catch(error => {
                reject(error)
            })
        })
    }

    getMap() {
        return new Promise((resolve, reject) => {
            let map = new Map() // TODO - generate a map via data.js - get the map with maps[this.number]
            if(map) {
                map.getPath().then((path) => {
                    console.log(path)
                    this.path = path
                    resolve(true)
                }).catch(() => {
                    reject()
                })
            } else {
                reject("No map for this level found")
            }
        })
    }

    getAvailableTowers() {
        return new Promise((resolve, reject) => {
            data.getTowers(this.number).then(towers => {
                this.towers = towers;
                resolve(true)
            }).catch(() => {
                reject(false )
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
                        let currentPos = {x: this.path[curMonster.progress].x * this.width, y: this.path[curMonster.progress].y * this.height} 
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

    //get a map for the level
    

}
// the map object        
class Map {

    constructor(width, height, tsize, tiles, image){
        this.cols = width; //the width of the map in columns
        this.rows = height; // the height of the map in rows
        this.tsize = tsize; //the size of each tile
        this.tiles = tiles; //matrix containing the tiles
        this.tileAtlas = image; //the sprite for the map
    }
    

    getTile (row, col) {
        return this.tiles[row][col];
    }

    draw (ctx) {
        console.log("trying to draw")
        for (let r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.cols; c++) {
            var tile = this.getTile(r, c);
            if (tile !== 0) { // 0 => empty tile
                console.log("drawing")
                ctx.drawImage(
                this.tileAtlas, // image
                (tile - 1) * this.tsize, // source x
                0, // source y
                this.tsize, // source width
                this.tsize, // source height
                c * this.tsize, // target x
                r * this.tsize, // target y
                this.tsize, // target width
                this.tsize // target height
                );
            }
            }
        }
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

            tempPath ? resolve(tempPath) : reject("No path found for this level")
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
    
    constructor(damage, range, speed, skin, canvasWidth) {
        this.damage = damage;
        this.range = range;
        this.speed = speed;
        this.skin = skin;
        this.width = canvasWidth;
        this.towerWidth = Math.floor(canvasWidth * 0.06)
        this.center;
    }
    

    draw (point, ctx) {
        
        this.center = point;
        let startPt = {x: point.x - this.towerWidth / 2, y: point.y - this.towerWidth/2}
        ctx.strokeRect(startPt.x, startPt.y, this.towerWidth, this.towerWidth)
        
    }
    
    drawRange (ctx) {
        ctx.beginPath()
        ctx.arc(this.center.x, this.center.y, this.range * this.width, 0, 2 * Math.PI, true)
        ctx.stroke()
    }

    drawUI (point, ctx, width) {
        console.log("Draw UI")
    }

}