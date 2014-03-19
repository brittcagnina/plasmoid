
EntityClass = Class.extend({

	startPos : {x:0,y:0},
	pos : {x:0,y:0},
    lastPos : {x:0,y:0},
	size : {x:0,y:0},
    sprites : new Array(), //upon init, must have at least one image
    animator : 0,
    velocity : 0,
        
    //entity should have start x and y positions.
    init : function(x, y) {
        this.startPos.x = x;
        this.startPos.y = y
        this.pos.x = x;
        this.pos.y = y
    },
    animate : function() {
        if(this.sprites.length > 0) {
            var img = this.sprites[this.animator]
            this.animator = (this.animator + 1) % this.sprites.length;
            return img;
        } else {
            return null;
        }
    },
    getCurrentAnimationState : function() {
        return this.sprites[this.animator];
    },
    getX : function() {
        return this.pos.x;
    },
    getY : function() {
        return this.pos.y;
    }, 
	update : function() {
            
    }
});




