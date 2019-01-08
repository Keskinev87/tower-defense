var game;
var map;
var level = undefined;
var ui;
var width;
var height;
var gameCanvas = document.getElementById('game-layer');
var bgrCanvas = document.getElementById('background-layer');
var ctx = gameCanvas.getContext('2d');
var bgrctx = bgrCanvas.getContext('2d');


class Game {

    constructor() {
        //the current level
        this.currentLevel = 0;
        this.money = 100;
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

    updateMoney(val) {
        this.money += val;
        ui.updateStatusMoney(val);
    }
}

