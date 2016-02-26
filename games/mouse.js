(function() {

	var MAX_WIDTH, MAX_HEIGHT, ctx, cheese, mouse, grid, floor, nhom, 
		cursorX, cursorY, animationId, running, center, timeout, last_time;

	window.startMouseGame = function(canvas) {
		MAX_WIDTH = canvas.width;
		MAX_HEIGHT = canvas.height;
		ctx = canvas.getContext("2d");
		center = { x: MAX_WIDTH/2, y: MAX_HEIGHT/2 };

		cheese = spawnObject(0, 0, 50, 50, 5, "cheese.png");
		mouse = spawnObject(0, 0, 80, 80, 3.5, "mouse.png");
		grid = spawnObject(-MAX_WIDTH, -MAX_HEIGHT, MAX_WIDTH*2, MAX_HEIGHT*2, 3, "grid.png");
		floor = spawnObject(-MAX_WIDTH, -MAX_HEIGHT, MAX_WIDTH*2, MAX_HEIGHT*2, 1, "floor2.jpg");
		nhom = spawnObject(0, 0, 100, 50, 0, "nhom.png");
		nhom.visible = false;
		timeout = 300;
		last_time = 0;

		canvas.addEventListener("mousemove", function(event) {
			cursorX = event.clientX - canvas.offsetLeft;
			cursorY = event.clientY - canvas.offsetTop;
		});

		cheeseInRandomPos();
		running = true;
		loop();
	};

	window.stopMouseGame = function() {
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
		moveCheese();
		moveMouse(cursorX, cursorY);

		var now = Date.now();
		if(now - last_time >= timeout) {
			nhom.visible = false;
		}

		if(checkCollision(mouse, cheese)) {
			nhom.x = cheese.x;
			nhom.y = cheese.y;
			nhom.visible = true;
			last_time = now;
			cheeseInRandomPos();
		}	

		backgroundParalax();
	}

	function render() {
		clear();

		floor.draw(ctx);
		grid.draw(ctx);
		cheese.draw(ctx);
		mouse.draw(ctx);

		if(nhom.visible) {
			nhom.draw(ctx);
		}
	}

	function clear() {
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
	}

	function backgroundParalax() {
		if (cursorX > center.x) {
			grid.x -= grid.speed;
			floor.x -= floor.speed;
		} else {
			grid.x += grid.speed;
			floor.x += floor.speed;
		}

		if(grid.x > 0) {
			grid.x = 0;
		} 
		else if (grid.x < -MAX_WIDTH) {
			grid.x = -MAX_WIDTH;
		}
		if(floor.x > 0) {
			floor.x = 0;
		} 
		else if (floor.x < -MAX_WIDTH) {
			floor.x = -MAX_WIDTH;
		}

		if (cursorY > center.y) {
			grid.y -= grid.speed;
			floor.y -= floor.speed;
		} else {
			grid.y += grid.speed;
			floor.y += floor.speed;
		}

		if(grid.y > 0) {
			grid.y = 0;
		} 
		else if (grid.y < -MAX_HEIGHT) {
			grid.y = -MAX_HEIGHT;
		}
		if(floor.y > 0) {
			floor.y = 0;
		} 
		else if (floor.y < -MAX_HEIGHT) {
			floor.y = -MAX_HEIGHT;
		}
	}

	function moveCheese() {
		if(cheese.x >= MAX_WIDTH - cheese.w) {
			cheese.vx = -1;
		}
		else if (cheese.x <= 0) {
			cheese.vx = 1;
		}
		
		cheese.x += cheese.speed * cheese.vx;

		if(cheese.y >= MAX_HEIGHT - cheese.h) {
			cheese.vy = -1;
		}
		else if (cheese.y <= 0) {
			cheese.vy = 1;
		}
		
		cheese.y += cheese.speed * cheese.vy;
	}

	function moveMouse(mouseX, mouseY) {
		var cursorX = mouseX - mouse.w/2;
		var cursorY = mouseY - mouse.h/2;

		mouse.vx = (cursorX >= mouse.x) ? 1 : -1;
		mouse.x += mouse.vx * mouse.speed;

		if(cursorX >= mouse.x - mouse.speed && cursorX <= mouse.x + mouse.speed) {
			mouse.x = cursorX;
		}

		if (mouse.x > MAX_WIDTH - mouse.w) {
			mouse.x = MAX_WIDTH - mouse.w;
		}
		else if (mouse.x < 0) {
			mouse.x = 0;
		}

		mouse.vy = (cursorY >= mouse.y) ? 1 : -1;
		mouse.y += mouse.vy * mouse.speed;
		
		if(cursorY >= mouse.y - mouse.speed && cursorY <= mouse.y + mouse.speed) {
			mouse.y = cursorY;
		}

		if (mouse.y > MAX_HEIGHT - mouse.h) {
			mouse.y = MAX_HEIGHT - mouse.h;
		}
		else if (mouse.y < 0) {
			mouse.y = 0;
		}
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

	function cheeseInRandomPos() {
		var randomX = Math.floor(Math.random() * (MAX_WIDTH - cheese.w));
		var randomY = Math.floor(Math.random() * (MAX_HEIGHT - cheese.y));

		cheese.x = randomX;
		cheese.y = randomY;
		cheese.vx = (randomX % 2 === 0) ? 1 : -1;
		cheese.vy = (randomY % 2 === 0) ? 1 : -1;
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
			visible: true,
			image: img,
			draw: function(context) {
				context.drawImage(this.image, this.x, this.y, this.w, this.h);
			}
		};
	}

})();