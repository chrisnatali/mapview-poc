function car() {  
    var c = {x: 0, y: 0, speed: 0, direction: 0}; 

    c.near = function(other, range) {
        return Math.sqrt(Math.pow(c.x - other.x, 2) + Math.pow(c.y = other.y, 2)) < range;
    }

    return c;
}

module.exports = car;
