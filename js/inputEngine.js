
var keyState = new Array(256);
for(var i = 0; i < keyState.length; i++) {
    keyState[i] = false;
}

InputEngineClass = Class.extend({

        init : function() {
		document.addEventListener('keydown', this.onKeyDown);
		document.addEventListener('keyup', this.onKeyUp);
        },
        
	onMouseMove: function (event) {

	},
        
	onKeyDown: function (event) {
            var key = event.keyCode*1;
            keyState[key] = true;
	},
        
	onKeyUp: function (event) {
            var key = event.keyCode*1;
            keyState[key] = false;
	},
        
        //Updates canvas
	update: function() {
            var velocity = player.velocity;
		if(keyState[38]) {
                    movePlayer(0, -velocity);
                }
		if(keyState[40]) {
                    movePlayer(0, velocity);
                }
		if(keyState[37]) {
                    movePlayer(-velocity, 0);
                }
                if(keyState[39]) {
                    movePlayer(velocity, 0);
                }                
	}


});

gInputEngine = new InputEngineClass();

