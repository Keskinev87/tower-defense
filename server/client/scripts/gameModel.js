 class UserInterface {
     constructor() {
        this.uiCanvas = document.getElementById('ui-layer');
        this.uictx = this.uiCanvas.getContext('2d');
        this.width = this.uiCanvas.width;
        this.height = this.uiCanvas.height;
     }

     init() {

     }

     drawMenu() {

     }

     drawStartBtn() {
        this.uictx.fillRect(this.width * 0.40,  this.height * 0.1, this.width * 0.20, this.height * 0.20);
     }

     drawInstructionsBtn() {
        this.uictx.fillRect(this.width * 0.40,  this.height * 0.4, this.width * 0.20, this.height * 0.20);
     }

     drawSettingsBtn() {
        this.uictx.fillRect(this.width * 0.40,  this.height * 0.7, this.width * 0.20, this.height * 0.20);
     }

     drawTowers() {

     }
 }
 
 
 class Game {

    constructor() {
        //size of the canvases 
        this.gameArea = document.getElementById('gameArea');
        this.gameCanvas = document.getElementById('game-layer');
        this.backgroundCanvas = document.getElementById('background-layer')
        this.uiCanvas = document.getElementById('ui-layer')
        //drawing contexts
        this.bgrctx = this.backgroundCanvas.getContext('2d')
        this.uictx = this.uiCanvas.getContext('2d');
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
    
        this.gameCanvas.width = this.backgroundCanvas.width = this.uiCanvas.width = this.width = newWidth;
        this.gameCanvas.height = this.backgroundCanvas.height = this.uiCanvas.height = this.height = newHeight;
        console.log(this.gameCanvas.offsetLeft)
        console.log(this.gameCanvas.offsetTop)
            
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