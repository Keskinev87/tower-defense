// the map object        
class Map {

    constructor(){

        this.path;
        this.image = preloaded.map;
        // this.image.src = './images/map.png';
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
            data.getAvailableTowers(2).then(towers => {
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
                    case i <= 2130:
                        x = Number((0.84 / 2130 * i).toFixed(4));
                        y = 0.1;
                        xy = {x:x, y:y} 
                        break
                    case i <= 2980:
                        x = 0.84;
                        y = Number((0.1 + 0.58/850 * (i - 2130)).toFixed(4));		
                        xy = {x:x, y:y} 	
                        break
                    case i <= 4330:
                        x = Number((0.84 - 0.52 / 1350 * (i-2980)).toFixed(4)) 
                        y = 0.68
                        xy = {x:x, y:y}
                        break 
                    case i <= 4610:
                        x = 0.32;
                        y = Number((0.68 - 0.22 / 280 * (i-4330)).toFixed(4));
                        xy = {x:x, y:y};
                        break 
                    case i <= 5610:
                        x = Number((0.32 + 0.38 / 1000 * (i-4610)).toFixed(4));
                        y = 0.46;
                        xy = {x:x, y:y};
                        break 
                    case i <=5890:
                        x = 0.70;
                        y = Number((0.46 - 0.2/280 * (i - 5610)).toFixed(4));
                        xy = {x:x, y:y};
                        break 
                    case i <= 7390:
                        x = Number((0.70 - 0.6 / 1500 * (i - 5890)).toFixed(4));
                        y = 0.26;
                        xy = {x:x, y:y};
                        break 
                    case i <= 8240:
                        x = 0.10;
                        y = Number((0.26 + 0.6/850 * (i - 7390)).toFixed(4));
                        xy = {x:x, y:y}
                        break
                    case i <= 10000:
                        x = Number((0.1 + 0.72 / 1760 * (i - 8240)).toFixed(4));
                        y = 0.86;
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