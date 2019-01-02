var game;
var level = undefined;
var ui;

function clicked(e) {
    console.log(e)
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

class Game {

    constructor(width, height) {

        this.width = width;
        this.height = height;
        //the current level
        this.currentLevel = 0;
    }

    startGame() {
        this.createNewLevel().then(() => {
            level.load().then(() => {
                ui.showGameArea();
                console.log(level.map);
                level.map.drawMap();
                level.releaseNewWave();
            })
        }) 
    }

    logWH() {
        console.log(this.width)
        console.log(this.height)
    }

    createNewLevel () {
        return new Promise((resolve, reject) => {
            level = new Level(this.currentLevel)
            if(level)
                resolve();
            else
                reject();
            
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
}