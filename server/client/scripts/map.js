// the map object        
class Map {

    constructor(){

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
        bgrctx.drawImage(this.image, 0, 0, width, height);
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
        
        
            for(let i=1; i <= 10000; i ++) {
                switch (true) {
                    case i <= 1400:
                        x = Number((0.2 / 1400 * i).toFixed(4));
                        y = 0.2;
                        xy = {x:x, y:y} 
                        break
                    case i <= 2400:
                        x = 0.2;
                        y = Number((0.2 + 0.2/1000 * (i - 1400)).toFixed(4));		
                        xy = {x:x, y:y} 	
                        break
                    case i <= 3800:
                        x = Number((0.2 + 0.2 / 1400 * (i-2400)).toFixed(4)) 
                        y = 0.4
                        xy = {x:x, y:y}
                        break 
                    case i <= 6200:
                        x = Number((0.4 + 0.2 / 2400 * (i-3800)).toFixed(4))
                        y = Number((0.4 + 0.2 / 2400 * (i-3800)).toFixed(4))
                        xy = {x:x, y:y}
                        break 
                    case i <= 7600:
                        x = Number((0.6 + 0.2 / 1400 * (i-6200)).toFixed(4))
                        y = 0.6
                        xy = {x:x, y:y}
                        break 
                    case i <=8600:
                        x = 0.8;
                        y = Number((0.6 + 0.2/1000 * (i - 7600)).toFixed(4))
                        xy = {x:x, y:y}
                        break 
                    case i <= 10000:
                        x = Number((0.8 + 0.2/ 1400 * (i - 8600)).toFixed(4))
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