//contains data for creating each monster of a wave 0=hp 1=speed 2=skin
//TODO - create algorithm for creating waves with increasing difficulty
var data = {
    levels: [[0,0,0],[1,1,1],[2,2,2]],
    waves: [
        [
            [[20,6,'spider'],[100,8,'spider'],[100,8,'grunt'],[100,5,'grunt'],[100,5,'grunt'],[100,5,'grunt'],[100,4,'knight'],[100,4,'knight']],
            [[0,2,'grunt'],[0,3,'grunt'],[0,2,'grunt'],[0,3,'grunt'],[0,2,'grunt'],[0,3,'grunt'],[0,3,'grunt'],[0,2,'grunt'],[0,2,'grunt'],[0,3,'grunt']],
            [[0,10,'spider'],[0,1,'knight'],[0,10,'spider'],[0,1,'knight'],[0,1,'knight'],[0,1,'knight'],[0,1,'knight'],[0,1,'knight'],[0,1,'knight'],[0,1,'knight']]
        ]
    ],
    maps:[
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ],
    towers: ['archer','mage'],
    towerNests: [
        [{top:'39%', left:'60%'}, {top: '24%',left:'75%'},{top:'58%', left: '75%'},{top: '58%', left: '40%'}]
    ],
    getLevelConfig: function(num) {
        return new Promise((resolve, reject) => {
            if(this.levels[num]) {
                console.log("resolving config")
                console.log(this.levels[num])
                resolve(this.levels[num])
            }
            else
                reject("No levels available")
        })
    },
    getWaves: function(num) {
        return new Promise((resolve, reject) => {
            this.waves[num] ? resolve(this.waves[num]) : reject("No waves remaining");
        })
    },
    getMap: function(num) {
        return new Promise((resolve, reject) => {
            this.maps[num] ? resolve(this.map[num]) : reject("No maps remaining");
        })
    },
    getAvailableTowers: function(nums) {
        return new Promise((resolve, reject) => {
            let result = [];
            for(let i = 0; i < nums.length; i++) {
                console.log(this.towers[i]);
                result.push(this.towers[i]);
            }
        
            result? resolve(result) : reject("No such towers available")
        })
        
    },
    getTowerNests: function(num) {
        return new Promise((resolve, reject) => {
            if(this.towerNests[num])
                resolve(this.towerNests[num]);
            else
                reject();
        })
    }

    
}




//3. Load and set levels

    //3.1. Set waves for levels
        //game.setWaves()
    //4. Load and set towers

    //5. Load and set monsters

    //6. Load and set paths
        //game.setPath()
    //7. Load and set user data

    //8. Load audio