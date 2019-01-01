class UserInterface {
    constructor() {

    }

    showMenu(){

    }
}

class Game {

    constructor() {
        //size of the canvases 
        this.gameArea = document.getElementById('gameArea');
        this.gameCanvas = document.getElementById('game-layer');
        this.backgroundCanvas = document.getElementById('background-layer')
        this.uiDiv = document.getElementById('ui-layer')
        //drawing contexts
        this.bgrctx = this.backgroundCanvas.getContext('2d')
        this.ctx = this.gameCanvas.getContext('2d')
        //general variables for the game
        this.fps = 60;
        this.width;
        this.height;
        //the current level
        this.currentLevel;
        this.currentLevelNumber = 0;

    }

    resizeGame () {
    
        let widthToHeight = 16 / 9;
        let newWidth = window.innerWidth;
        let newHeight = window.innerHeight;
        let newWidthToHeight = newWidth / newHeight;
    
        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
            this.gameArea.style.height = newHeight + 'px';
            this.gameArea.style.width = newWidth + 'px';
        } else {
            newHeight = newWidth / widthToHeight;
            this.gameArea.style.width = newWidth + 'px';
            this.gameArea.style.height = newHeight + 'px';
        }
    
        this.gameArea.style.marginTop = (-newHeight / 2) + 'px';
        this.gameArea.style.marginLeft = (-newWidth / 2) + 'px';
    
        this.gameCanvas.width = this.backgroundCanvas.width = this.width = newWidth;
        this.gameCanvas.height = this.backgroundCanvas.height = this.height = newHeight;
        
        // this.uiDiv.style.height = this.height * 0.05 + 'px'
            
    }

    createNewLevel () {
        return new Promise((resolve, reject) => {
            console.log(this.currentLevelNumber)
            data.getLevelConfig(this.currentLevelNumber).then((config) => {
                console.log(config)
                console.log(new Level(0))
                let newLevel = new Level(0)
                
                resolve(newLevel);
            }).catch(() => {
                reject();
            })
        })
    }

    createUI (){
        return new Promise((resolve, reject) => {
            let ui = new UserInterface()
            ui.init() 
        })
    }

    
}