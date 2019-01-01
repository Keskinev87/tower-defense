function gameInit() {

    //////////////////////////////////////////////
    ////////////II. GENERAL GAME FLOW/////////////
    //////////////////////////////////////////////

    //1.Create a new game
    let game = new Game();
    game.resizeGame();
    let level = new Level(0)
   
    
    level.load().then(() => console.log('Ok'))
    console.log(level)

   
    console.log(new Level(0))
    game.createNewLevel().then((level => {
        console.log(level)
        level.load().then(levelLoaded => {
            if(levelLoaded){
                level = levelLoaded
            }
            
        })
    }))
    
    
    //2.Resize the canvas according to the browser
    
    //3.Set the current level
    //TODO - draw the map, set the path, set the waves, set the available towers 
        //3.1. Draw the map on the background canvas
        //TODO drawMap()
        //3.2. Set the path for the monsters
        // game.setPath()
        //3.3. Set the available towers
        // game.setAvailableTowers()
        //3.4. Draw the available towers on the ui layer
        //TODO game.drawUiTowers()
        //3.5. Set the waves for the level
        //TODO game.setWaves()
        //3.6. Draw the metrics UI on the screen
        //TODO drawMetrics()
        //draw the towers, that the user built till now
    // let tower = new Tower(game.backgroundCanvas.width, game.backgroundCanvas.height);
    // tower.draw({x:game.backgroundCanvas.width * 0.25, y: game.backgroundCanvas.height * 0.47}, game.bgrctx)
    // tower.drawRange(game.bgrctx)
    //set the waives for the level
    // TODO
    // // game.setWaves()
    // game.releaseNewWave()
    
    // resizeGame() //canvas.js: resize the canvas according to the screen of the player
    // window.addEventListener('resize', resizeGame, false); //canvas.js: on window change, resize the canvas
    //INSERT LOADER HERE
    
    // the canvas layers
    // let gameCanvas = document.getElementById('game-layer');
    // let backgroundCanvas = document.getElementById('background-layer')
    // let uiCanvas = document.getElementById('ui-layer')

    //the game elements
    // let path = new Path(backgroundCanvas);
    // let path2 = createPathAsArray();
    // let map = new Map(16, 24 , 20, mapTiles, tileAtlas);
    // let waveOfMonsters = 1;
    

    //draw the background map 
    // if (backgroundCanvas.getContext) {
        // let bgrctx = backgroundCanvas.getContext('2d');
        
        //TODO: DRAW THE MAP
       
        //draw the monster path
        // path.drawPath(bgrctx, backgroundCanvas);
        // let tower = new Tower(backgroundCanvas.width, backgroundCanvas.height);
        // tower.draw({x:backgroundCanvas.width * 0.25, y: backgroundCanvas.height * 0.47}, bgrctx)
    // }

    //draw the interface

    // if (uiCanvas.getContext) {
    //     // let uictx = uiCanvas.getContext('2d');
    // }
    
    //the game
    // if (gameCanvas.getContext) {
    //     // start the animation
    //     animate();

    //     function animate() {
    //         game.ctx.clearRect(0,0,game.width, game.height);
           
    //         // drawFrame(percent);
            
           
    //         setTimeout(function () {
    //             requestAnimationFrame(animate);
    //         }, 1000 / fps);
    //     }

    //     function releaseNewWave() {
            
    //     }

    // }

    
}