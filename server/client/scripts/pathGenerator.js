function createPathAsArray() {
    let path = []
    let x, y, xy;
    
    
    for(i=0; i <= 100; i ++) {
        switch (true) {
            case i <= 14:
                x = Number((0.2 / 14 * i).toFixed(2));
                y = 0.2;
                xy = {x:x, y:y} 
                break
            case i <= 24:
                x = 0.2;
                y = Number((0.2 + 0.2/10 * (i - 14)).toFixed(2));		
                xy = {x:x, y:y} 	
                break
            case i <= 38:
                x = Number((0.2 + 0.2 / 14 * (i-24)).toFixed(2)) 
                y = 0.4
                xy = {x:x, y:y}
                break 
            case i <= 62:
                x = Number((0.4 + 0.2 / 24 * (i-38)).toFixed(2))
                y = Number((0.4 + 0.2 / 24 * (i-38)).toFixed(2))
                xy = {x:x, y:y}
                break 
            case i <= 76:
                x = Number((0.6 + 0.2 / 14 * (i-62)).toFixed(2))
                y = 0.6
                xy = {x:x, y:y}
                break 
            case i <=86:
                x = 0.8;
                y = Number((0.6 + 0.2/10 * (i - 76)).toFixed(2))
                xy = {x:x, y:y}
                break 
            case i <= 100:
                x = Number((0.8 + 0.2/ 14 * (i - 86)).toFixed(2))
                y = 0.8
                xy = {x:x, y:y}
                break 
            default:
                break
            
        }
        path.push(xy)
    }

    return path
}

