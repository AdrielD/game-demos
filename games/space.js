(function() {

	var MAX_WIDTH, MAX_HEIGHT, ctx, ship, bullets, asteroids, cursorX, cursorY, animationId, running;

	window.startSpaceGame = function(canvas) {
		MAX_WIDTH = canvas.width;
		MAX_HEIGHT = canvas.height;
		ctx = canvas.getContext("2d");

		running = true;
		loop();
	};

	window.stopSpaceGame = function() {
		if(animationId) {
			cancelAnimationFrame(animationId);
		}
		running = false;
	};

	function loop() {
		if(running) {
			update();
			render();
			animationId = requestAnimationFrame(loop);
		}
	}

	function update() {
		
	}

	function render() {
		clear();
	}

	function clear() {
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
	}

	function checkCollision(obj1, obj2) {
		var collision = false;

		var ax1 = obj1.x;
		var ax2 = obj1.x + obj1.w;
		var ay1 = obj1.y;
		var ay2 = obj1.y + obj1.h;

		var bx1 = obj2.x;
		var bx2 = obj2.x + obj2.w;
		var by1 = obj2.y;
		var by2 = obj2.y + obj2.h;

		var xCol = false;
		var yCol = false;

		if((ax1 >= bx1 && ax1 <= bx2) || (ax2 >= bx1 && ax2 <= bx2) ||
			(bx1 >= ax1 && bx1 <= ax2) || (bx2 >= ax1 && bx2 <= ax2)) {
			xCol = true;
		}

		if((ay1 >= by1 && ay1 <= by2) || (ay2 >= by1 && ay2 <= by2) ||
			(by1 >= ay1 && by1 <= ay2) || (by2 >= ay1 && by2 <= ay2)) {
			yCol = true;
		}

		return (xCol && yCol);
	}

	function spawnObject(x, y, width, height, speed, image) {

		var img = document.createElement("img");
		img.src = image;

		return {
			x: x,
			y: y,
			vx: 1,
			vy: 1,
			speed: speed,
			w: width,
			h: height,
			image: img,
			draw: function(context) {
				context.drawImage(this.image, this.x, this.y, this.w, this.h);
			}
		};
	}

})();