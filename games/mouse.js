(function() {

	var MAX_WIDTH, MAX_HEIGHT, ctx, cheese, mouse, cursorX, cursorY, animationId, running;

	window.startMouseGame = function(canvas) {
		MAX_WIDTH = canvas.width;
		MAX_HEIGHT = canvas.height;
		ctx = canvas.getContext("2d");

		cheese = spawnObject(0, 0, 50, 50, 5, "cheese.png");
		mouse = spawnObject(0, 0, 80, 80, 3.5, "mouse.png");

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
		if(checkCollision(mouse, cheese)) {
			cheeseInRandomPos();
		}
	}

	function render() {
		clear();
		cheese.draw(ctx);
		mouse.draw(ctx);
	}

	function clear() {
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
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
		mouse.vx = (mouseX >= mouse.x) ? 1 : -1;
		mouse.x += mouse.vx * mouse.speed;

		if(mouseX >= mouse.x - mouse.speed && mouseX <= mouse.x + mouse.speed) {
			mouse.x = mouseX;
		}

		if (mouse.x > MAX_WIDTH - mouse.w) {
			mouse.x = MAX_WIDTH - mouse.w;
		}
		else if (mouse.x < 0) {
			mouse.x = 0;
		}

		mouse.vy = (mouseY >= mouse.y) ? 1 : -1;
		mouse.y += mouse.vy * mouse.speed;
		
		if(mouseY >= mouse.y - mouse.speed && mouseY <= mouse.y + mouse.speed) {
			mouse.y = mouseY;
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
			image: img,
			draw: function(context) {
				context.drawImage(this.image, this.x, this.y, this.w, this.h);
			}
		};
	}

})();