<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>

        <script type="text/javascript" src="js/core.js"></script>
        <script type="text/javascript" src="js/inputEngine.js"></script>
        <script type="text/javascript" src="js/spriteSheet.js"></script>
        <script type="text/javascript" src="js/entity.js"></script>
        <script type="text/javascript" src="js/xhr.js"></script>
    </head>
    <body>
        <canvas id="canvas" width="500" height="500"></canvas>
    </body>
</html>

<script type="text/javascript">

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');  
    var mapJsonString = xhrGet('js/atlas.json');
    var isAtlasDataLoaded = false;
    var canvasAlphaData;
    
    function spriteSheetLoaderCallback() {
        start();
        setInterval(render, 1000/50);
        setInterval(gInputEngine.update, 1000/50);
    };
    
    gSpriteSheet.load('atlas.png', spriteSheetLoaderCallback); //we load the atlas and when loaded, begin game;
    gSpriteSheet.parseAtlasDefinition(mapJsonString);

    //define entities
    var player = new EntityClass(200,100);
    player.sprites = ["blob.png", "blob2.png", "blob3.png", "blob4.png"];
    player.size.x = 28; player.size.y = 28;
    player.velocity = 6;
    
    var enemy = new EntityClass(375,130);
    enemy.sprites = ["enemy.png"];
    enemy.size.x = 32; enemy.size.y = 32;
    enemy.update = function(x, y) {
        enemy.pos.x += x;
        enemy.pos.y += y;
    };
    
    var enemy2 = new EntityClass(200,400);
    enemy2.sprites = ["enemy.png"];
    enemy2.size.x = 32; enemy2.size.y = 32;
    enemy2.update = function(x, y) {
        enemy2.pos.x += x;
        enemy2.pos.y += y;
    };
    
    var enemy3 = new EntityClass(400,300);
    enemy3.sprites = ["enemy.png"];
    enemy3.size.x = 32; enemy3.size.y = 32;
    enemy3.update = function(x, y) {
        enemy3.pos.x += x;
        enemy3.pos.y += y;
    };
    
    var map = new EntityClass(250, 250);
    map.sprites = ["map.png"];
    
    var prize = new EntityClass(400, 400);
    prize.sprites = ["prize.png"];
    prize.size.x = 20; prize.size.y = 20;
    
    var wall = new EntityClass(120, 400);
    wall.sprites = ["wall.png"];
    
    //push all entities into array
    var entities = [map, wall, player, enemy, enemy2, enemy3, prize];
    var updatable = [enemy, enemy2, enemy3];
    var enemies = [enemy, enemy2, enemy3];
    
    function start() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < entities.length; i++) {
            drawSprite(entities[i].animate(), entities[i].startPos.x, entities[i].startPos.y);
            //we do the following so we can get an array of rdba values for each pixel of canvas to use for collisions
            if(!isAtlasDataLoaded && i == 1) {
                canvasAlphaData = context.getImageData(0, 0, canvas.width, canvas.height).data;
                isAtlasDataLoaded = true;
            }
        }
    }
    
    function reset() {
        for(var i = 0; i < entities.length; i++) {
            entities[i].pos.x = entities[i].startPos.x;
            entities[i].pos.y = entities[i].startPos.y;
        }
        start();
    }
    
    function prizeCollisionEvent() {
        reset();
    }
    
    //Entity A at (ax,ay) with collision box aw*ah and entity B at (bx, by) with collision box bw*bh
    function collision(a, b, f) {
        if (a.getX() <= (b.getX() + b.size.x) && b.getX() <= (a.getX() + a.size.x) && a.getY() <= (b.getY() + b.size.y) && b.getY() <= (a.getY() + a.size.y)) {
            f();
        }
    }
    
    function movePlayer(x, y) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var mapDataAlpha = getCanvasAlphaData(canvasAlphaData, player.getX() + x, player.getY() + y);
        if(mapDataAlpha == 0) {
            player.pos.x += x; player.pos.y += y;
        }
        for(var i = 0; i < entities.length; i++) {
            drawSprite(entities[i].animate(), entities[i].getX(), entities[i].getY());
        }
    };
    
    function getCanvasAlphaData(canvasData, x, y) {
        return canvasData[((y*(canvas.width*4)) + x*4) + 3];
    }
    
    function render() {
        for(var i = 0; i < updatable.length; i++) {
            var x = getRand();
            var y = getRand();
            var mapDataAlpha = getCanvasAlphaData(canvasAlphaData, updatable[i].getX() + x, updatable[i].getY() + y);
            if(mapDataAlpha == 0) {
                updatable[i].update(x, y);
            }
        }
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < entities.length; i++) {
            drawSprite(entities[i].getCurrentAnimationState(), entities[i].getX(), entities[i].getY());
        }
        
        for(var i = 0; i < enemies.length; i++) {
            collision(player, enemies[i], reset);
        }
        collision(player, prize, prizeCollisionEvent);
    }
    
    function getRand() {
        var posNeg = Math.random() < 0.5 ? -1 : 1;
        var rand = posNeg*Math.floor(Math.random() * 10);
        return rand;
    }

</script>