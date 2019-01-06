class Level {
    constructor(number) {
        this.number = number;  //the number of the level
        this.width;
        this.height;
        this.waves; //array with the waves for the level
        this.wave=[]; // the current wave(the array)
        this.currentWaveNumber = 0;  //the number of the current wave with monsters
        this.builtTowers; //array with the built towers.
        this.releaseStage = 0;  // used to release the monsters in several frames
        this.fullRelease = 4000;
        this.monstersLeft;  // how many monsters from the current wave are left - used to stop iterating when they are over.
        this.towers = []; //the towers that are built by the player
    }

    load() {
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
        
        let curWave = this.waves[this.currentWaveNumber]
        for (let monster of curWave){
            this.wave.push(new Monster(monster[0], monster[1], monster[2]))
        }
        this.monstersLeft = this.wave.length;
        this.releaseStage = 0; //set the stage to 0 to begin the releasing from the first monster
        console.log(map.path.length)
        this.animateWave();

    }

    animateWave () {
    //    console.time('timer');
        ctx.clearRect(0,0, width, height);
        //if there are any monsters left in the level
        
        if(this.monstersLeft > 0) {
            //sort the array by progress, so the towers target the first monster.
            // this.wave.sort(compare)
            for (let i=0; i < this.wave.length * this.releaseStage / this.fullRelease; i++){
            
                let curMonster = this.wave[i];
                
                
                if(curMonster != null) {
                    
                    curMonster.advance();
                    if(curMonster.progress < map.path.length) {
                        
                        let currentPos = {x: map.path[curMonster.progress].x * width, y: map.path[curMonster.progress].y * height};
                       
                        curMonster.curPosX = currentPos.x;
                        curMonster.curPosY = currentPos.y;
                        
                        curMonster.draw();
                         
                        //check if the monster is within the range of a tower/s
                        
                        for(let k = 0; k < this.towers.length; k++) {
                  
                            let tower = this.towers[k];
                            
                            if(tower.checkIfMonsterInRange(currentPos) && tower.currentTarget === null){
                                
                                // aquire the current monster as a target
                                // since we sorted the array at the beginning, the first monster should always be aquired as target
                            //    tower.currentTarget = {x: curMonster.curPosX, x: curMonster.curPosY};
                                console.log(currentPos, i)
                                tower.setCurrentTarget(currentPos, i);   
                                           
                            }  
                        }
                    } else {     
                        this.wave[i] = null; //do not rename to curMonster, since wave is a hashtable
                        console.log("removing")
                        console.log(this.wave)
                        this.monstersLeft--;
                    }
                }
            }
           
            for(let tower of this.towers) {
                
                if(tower.shootCount == tower.speed && tower.currentTarget != null) {
                    
                    tower.fireProjectile();
                    tower.shootCount = 0; //reset the count so the next projectile is generated after speed * frames    
                }

                for (let j = 0; j < tower.projectiles.length; j++) {
                    let projectile = tower.projectiles[j];
                    if(projectile.move()){
                        projectile.draw();
                    } 
                    else {
                        //damage the monsters and kill them
                        let targetMonster = this.wave[projectile.targetIndex];
                        if (targetMonster != null) {
                            targetMonster.takeDamage();
                            if(targetMonster.remainingHp <= 0) {
                                this.wave[projectile.targetIndex] = null;
                                this.monstersLeft--;
                            }
                        }

                        
                        tower.projectiles.splice(j,1);
                    }
                        

                }
                //set the target to null again so the next time the tower will aquire a new target if some monster changed position to first.
                tower.currentTarget = null;
                tower.shootCount++;
                if(tower.shootCount == tower.speed)
                    tower.shootCount = 0;
                tower.shootCount++;
            }

            if(this.releaseStage < this.fullRelease) {
                this.releaseStage += 2;
            }
            // console.timeEnd('timer')
            
            window.requestAnimationFrame(() => this.animateWave()); //loop until the monsters are dead or out of the map
        } else {
            console.log("Done")
            this.currentWaveNumber++;
            this.releaseStage = 0;
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