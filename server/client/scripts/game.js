var game;
var map;
var level = undefined;
var ui;


class Game {

    constructor(width, height) {

        this.width = width;
        this.height = height;
        //the current level
        this.currentLevel = 0;
    }

    startGame() {

        let promises = [];
        promises.push(this.createNewMap(), this.createNewLevel())
        Promise.all(promises).then(() => {
            ui.showGameArea();
            map.drawMap();
            map.drawTowerNests();
            level.releaseNewWave();
        })

    }

    logWH() {
        console.log(this.width)
        console.log(this.height)
    }

    createNewLevel () {
        return new Promise((resolve, reject) => {
            level = new Level(this.currentLevel)
            level.load().then(() => {
                resolve()
            }).catch((error) => {
                reject(error)
            })
        })
    } 

    createNewMap () {
        return new Promise((resolve, reject) => {
            map = new Map();
            map.load().then(() => {
                resolve()
            }).catch((error) => {
                reject(error);
            })
        })
    }
}

class UserInterface {

    constructor() {
        this.gameArea = document.getElementById('gameArea');
        this.gameLayer = document.getElementById('game-layer');
        this.backgroundLayer = document.getElementById('background-layer');
        this.menu = document.getElementById('menu');
        this.statusBar = document.getElementById('status-bar');
        this.moneyCounter = document.getElementById('money').innerHTML;
        this.waveCounter = document.getElementById('wave').innerHTML;
        this.activeTowerNest; //used to know where to build a tower after the user gave the command. Each time a user clicks on a nest, we assign it's id to this variable.
    }

    handleClicks(e) {
        console.log(e.target)
        switch(true) {
            case e.target.classList.contains('tower-nest'): {
                //The player has clicked on a tower nest. We have to display the popup with available towers on click.
                let popup = document.getElementById("towers-popup"); //get the popup with the towers
                let currentNestId = popup.parentElement.id //get the current nest the popup is attched to. This is needed to determine if we should hide the popup or not
                let towerNest = document.getElementById(e.target.id); //get the tower nest, that was clicked
                this.activeTowerNest = e.target.id; //we will use this id in the next case if the user wants to build a tower here.
                
                towerNest.appendChild(popup); //append the popup to the tower nest
                if(currentNestId != towerNest.id) {
                    popup.style.visibility = '';
                } else{
                    popup.style.visibility = popup.style.visibility === 'hidden' ? '' : 'hidden';
                }
                break;
            }
            case e.target.classList.contains('tower-ui'): {
                //The player wants to build a tower - he/she clicks on an icon in the popup
                let towerType = e.target.id; //we set the id to be equal to the type when constructing the object Tower
                let nest = document.getElementById(this.activeTowerNest);
                let topOffset = nest.style.top;
                let leftOffset = nest.style.left;

                let tower = map.availableTowers.find(x => x.type == towerType);
                let towerCoords = {top: topOffset, left: leftOffset};
                tower.build(towerCoords);

            }
            default: {
                let popup = document.getElementById('towers-popup')
                popup.style.visibility = popup.style.visibility === '' ? 'hidden' : 'hidden';
                break;
            }
                
        }
        
    }

    showGameArea() {
        this.gameArea.style.visibility = '';
        this.gameLayer.style.visibility ='';
        this.backgroundLayer.style.visibility='';
        this.hideMenu();
        this.showStatusBar();
    }

    showMenu() {
        //initialize the game
        this.menu.style.visibility = '';
    }

    hideMenu() {
        this.menu.style.visibility = 'hidden';
    }

    showStatusBar() {
        this.statusBar.style.visibility = '';
    }

    hideStatusBar() {
        this.statusBar.style.visibility = 'hidden';
    }

    updateStatusMoney(value) {
        this.moneyCounter += value;
    }

    updateWave(value) {
        this.waveCounter += value;
    }

    placeTowerNests(coords, towers) {
        let gameAreaEl = document.getElementById('gameArea');
        let gameCanvas = document.getElementById('game-layer')
        //Add an event listener to it. this will handle the click of a tower nest.
        //When a towernest is clicked, a popup should pop up from it containing the list with available towers
        gameAreaEl.addEventListener('click', this.handleClicks);
        
        //creating the popup div with all available towers for building
        let popup = document.createElement('div');
        popup.setAttribute('id', 'towers-popup');
        popup.style.visibility = 'hidden';
        popup.classList.add('popup-menu');
        //each tower will be 5% of the total width of the canvas + some space for margins
        popup.style.width = Math.floor(towers.length * 0.08 * gameCanvas.width + gameCanvas.width * 0.05) + 'px'; 
        // popup.setAttribute('width', Math.floor(towers.length * gameCanvas.width * 0.05 + gameCanvas.width * 0.05));
        console.log("Popup calculations")
        console.log(towers.length)
        console.log(gameAreaEl.width)

        //append all sprites for the available towers to the popup
        for (let tower of towers) {
            popup.appendChild(tower.uiImage);
        }
        gameAreaEl.appendChild(popup);

        //The coordinates are percentages relative to the game canvas. 
        //The css properties of the tower nests are handled by the style.css
        //This method just sets the top and left position
        for (let i=0; i < coords.length; i++) {
            let towerNest = document.createElement('div');

            towerNest.classList.add('tower-nest');
            towerNest.classList.add('popup');
            towerNest.setAttribute('id', 'tower' + i)
            
            towerNest.style.top = coords[i].top;
            towerNest.style.left = coords[i].left;

            this.gameArea.appendChild(towerNest);
        }
         
    }
}