function buildCollisionArray(ctx, width, height) {
	var imgArray = new Array(width);
	for(i = 0; i < width; i++) {
		imgArray[i] = new Array(height);
	}

	for(i = 0; i < ctx.length; i++) {
		var col = Math.floor(i/((width)*4));
		if(i == 3 || (i - 3)%4 == 0) {
			var row = Math.floor(i/4) % height;
			imgArray[row][col] = ctx[i];
		}

	}
	return imgArray;
}
