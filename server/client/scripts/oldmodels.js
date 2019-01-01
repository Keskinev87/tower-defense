class Path {

    constructor(canvas) {

        //FIRST PATH
        //starting point coordinates
        this.width = canvas.width;
        this.height = canvas.height;

        this.firstLnStart = {x: 0, y: this.height * 0.20}
        this.firstLnEnd = {x: this.width * 0.20, y: this.height * 0.20};

        this.secondLnEnd = {x: this.width * 0.20, y: this.height * 0.40};

        this.thirdLnEnd = {x: this.width * 0.42, y: this.height * 0.40};

        //arc
        this.centerX = Math.floor(canvas.width * 0.50);
        this.centerY = Math.floor(canvas.height * 0.50);
        this.radius = Math.floor(canvas.width * 0.10);
    
        this.fourthLnStart = {x: this.width * 0.58, y: this.height * 0.60};
        this.fourthLnEnd = {x: this.width * 0.80, y: this.height * 0.60};

        this.fifthLnEnd = {x: this.width * 0.80, y: this.height * 0.80};
        
        this.sixthLnEnd = {x: this.width, y: this.height * 0.80};
    }
    
   
    


    drawPath (ctx) {
        ctx.clearRect(0, 0, this.width, this.height);
        
        //first line
        ctx.beginPath();
        ctx.moveTo(this.firstLnStart.x, this.firstLnStart.y);
        ctx.lineTo(this.firstLnEnd.x, this.firstLnEnd.y);
        ctx.stroke();

        //second line
        ctx.beginPath();
        ctx.moveTo(this.firstLnEnd.x, this.firstLnEnd.y);
        ctx.lineTo(this.secondLnEnd.x, this.secondLnEnd.y);
        ctx.stroke();

        //third line
        ctx.beginPath();
        ctx.moveTo(this.secondLnEnd.x, this.secondLnEnd.y);
        ctx.lineTo(this.thirdLnEnd.x, this.thirdLnEnd.y);
        ctx.stroke();

        //the central circle
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
        ctx.stroke();

        //fourth line
        ctx.beginPath();
        ctx.moveTo(this.fourthLnStart.x, this.fourthLnStart.y);
        ctx.lineTo(this.fourthLnEnd.x, this.fourthLnEnd.y);
        ctx.stroke();

        //fifth line
        ctx.beginPath();
        ctx.moveTo(this.fourthLnEnd.x, this.fourthLnEnd.y);
        ctx.lineTo(this.fifthLnEnd.x, this.fifthLnEnd.y);
        ctx.stroke();

        //sixth line 
        ctx.beginPath();
        ctx.moveTo(this.fifthLnEnd.x, this.fifthLnEnd.y);
        ctx.lineTo(this.sixthLnEnd.x, this.sixthLnEnd.y);
        ctx.stroke();

    }

    

    getPointAtPercent (progress) {
        let xy;
        
        if(progress < 0)
            progress=0;
        if(progress > 100)
            progress=99;
        
        
        switch (true) {
            case progress <= 14: 
                var percent = progress / 14;
                console.log("here")
                xy = getLineXYatPercent(this.firstLnStart, this.firstLnEnd, percent);
                break;
            case (progress <= 24): {
                var percent = (progress - 14) / 10;
                xy = getLineXYatPercent(this.firstLnEnd, this.secondLnEnd, percent);
                break;
            }
            case (progress <= 38): {
                var percent = (progress - 24) / 14;
                xy = getLineXYatPercent(this.secondLnEnd, this.thirdLnEnd, percent);
                break;
            }
            case (progress <= 62): {
                var percent = (progress - 38) / 24;
                xy = getLineXYatPercent(this.thirdLnEnd, this.fourthLnStart, percent);
                break;
            }
            case (progress <= 76): {
                let percent = (progress - 62) / 14;
                xy = getLineXYatPercent(this.fourthLnStart, this.fourthLnEnd, percent);
                break;
            }
            case (progress <= 86): {
                let percent = (progress - 76) / 10;
                xy = getLineXYatPercent(this.fourthLnEnd, this.fifthLnEnd, percent);
                break;
            }
            case (progress < 100): {
                let percent = (progress - 86) / 13;
                xy = getLineXYatPercent(this.fifthLnEnd, this.sixthLnEnd, percent);
                break;
            }
            default: {
                break;
            }
        }

        return xy;

        // else if (progress <= 100) {
        //     var percent = (progress - 50) / 50;

        //     xy = getQuadraticBezierXYatPercent({ x: this.middlePtX, y: this.middlePtY }, { x: this.secondPtCtrlX, y: this.secondPtCtrlY }, { x: this.endPointX, y: this.endPointY }, percent);
        // }

        function getQuadraticBezierXYatPercent (startPt, controlPt, endPt, percent) {
           
            var x = Math.pow(1 - percent, 2) * startPt.x + 2 * (1 - percent) * percent * controlPt.x + Math.pow(percent, 2) * endPt.x;
            var y = Math.pow(1 - percent, 2) * startPt.y + 2 * (1 - percent) * percent * controlPt.y + Math.pow(percent, 2) * endPt.y;
            return ({
                x: x,
                y: y
            });
        }
    
        function getLineXYatPercent (startPt, endPt, percent) {
            var dx = endPt.x - startPt.x;
            var dy = endPt.y - startPt.y;
            var X = startPt.x + dx * percent;
            var Y = startPt.y + dy * percent;
            return ({
                x: X,
                y: Y
            });
        }
    
    }
    
}