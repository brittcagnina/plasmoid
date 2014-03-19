
var gSpriteSheets = {};

var atlas;

var mapData;

SpriteSheetClass = Class.extend({

    img: null,
    url: "",
    sprites: new Array(),

    init: function () {

    },
    load: function (imgName, f) {
        // Store the URL of the spritesheet we want.
        this.url = imgName;
        
        // Create a new image whose source is at 'imgName'.
        var img = new Image();
        img.onload = f;
        img.src = imgName;

        // Store the Image object in the img parameter.
        this.img = img;

        // Store this SpriteSheetClass in our global
        // dictionary gSpriteSheets defined above.
        gSpriteSheets[imgName] = this;
    },
    defSprite: function (name, x, y, w, h, cx, cy) {
        var spt = {
            "id": name,
            "x": x,
            "y": y,
            "w": w,
            "h": h,
            "cx": cx == null ? 0 : cx,
            "cy": cy == null ? 0 : cy
        };
        this.sprites.push(spt);
    },
    parseAtlasDefinition: function (atlasJSON) {
        var parsed = JSON.parse(atlasJSON);

        for(var key in parsed.frames) {
            var sprite = parsed.frames[key];

            var width = sprite.frame.x;
            var height = sprite.frame.y;
            var cx = -sprite.frame.w/2;
            var cy = -sprite.frame.h/2;
                
            if(sprite.trimmed) {
                cx = sprite.spriteSourceSize.x - (sprite.sourceSize.w/2);
                cy = sprite.spriteSourceSize.y - (sprite.sourceSize.h/2);
            }
                
            this.defSprite(key, width, height, sprite.frame.w, sprite.frame.h, cx, cy);
        }
    }, 
    getStats: function (name) {
        for(var i = 0; i < this.sprites.length; i++) {
            if(this.sprites[i].id === name) {
                return this.sprites[i];
            }
        }
        return null;
    }
});


//-----------------------------------------
// External-facing function for drawing sprites based
// on the sprite name (ie. "chaingun.png", and the
// position on the canvas to draw to.
function drawSprite(spritename, posX, posY) {
    for(var sheetName in gSpriteSheets) {
        var sheet = gSpriteSheets[sheetName];
        var sprite = sheet.getStats(spritename);
        if(sprite == null) {
            continue;
        }
        
        __drawSpriteInternal(sprite, sheet, posX, posY);
        
        return;
    }

}

//-----------------------------------------
// External-facing function for drawing sprites based
// on the sprite object stored in the 'sprites Array,
// the 'SpriteSheetClass' object stored in the
// 'gSpriteSheets' dictionary, and the position on
// canvas to draw to.
function __drawSpriteInternal(spt, sheet, posX, posY) {
    if(spt == null || sheet == null) {
        return;
    }

    var hlf = {
        x: spt.cx,
        y: spt.cy
    };
    context.drawImage(sheet.img, spt.x, spt.y, spt.w, spt.h, posX + hlf.x, posY + hlf.y, spt.w, spt.h);
}

gSpriteSheet = new SpriteSheetClass();