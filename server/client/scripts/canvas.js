function resizeGame() {
    var gameArea = document.getElementById('gameArea');

    var widthToHeight = 16 / 9;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    }

    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';

    var gameCanvas = document.getElementById('game-layer');
    var backgroundCanvas = document.getElementById('background-layer')
    var uiCanvas = document.getElementById('ui-layer')

    gameCanvas.width = backgroundCanvas.width = uiCanvas.width = newWidth;
    gameCanvas.height = backgroundCanvas.height = uiCanvas.height = newHeight;
        
}