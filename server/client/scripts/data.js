//contains data for creating each monster of a wave 0=hp 1=speed 2=skin
//TODO - create algorithm for creating waves with increasing difficulty
var data = {
    levels: [[0,0,0],[1,1,1],[2,2,2]],
    waves: [
        [
            [[100,1,'circle'],[20,2,'circle'],[100,1,'circle'],[100,1,'circle'],[50,2,'circle'],[50,1,'circle'],[50,1,'circle'],[100,1,'circle'],[100,1,'circle'],[90,1,'circle']],
            [[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle']],
            [[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle'],[0,1,'circle']]
        ]
    ],
    maps:[
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ],
    towers: [
        [10, 0.1, 30, 'square'],
        [20, 0.15, 30, 'square'],
        [15, 0.1, 60, 'square']
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
    getTowers: function(nums) {
        return new Promise((resolve, reject) => {
            let result = [];
            for(let i = 0; i < nums.length; i++) {
                result.push(this.towers[i]);
            }
            
            result? resolve(result) : reject("No such towers available")
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