(function() {

	var MAX_WIDTH, MAX_HEIGHT, ctx, ship, bullets, asteroids, cursorX, cursorY, animationId, running, last_time, spawn_time;

	window.startSpaceGame = function(canvas) {
		MAX_WIDTH = canvas.width;
		MAX_HEIGHT = canvas.height;
		ctx = canvas.getContext("2d");

		bullets = [];
		asteroids = [];
		ship = spawnObject(MAX_WIDTH/2 - 25, MAX_HEIGHT - 50, 50, 50, 12, "ship.png");

		canvas.addEventListener("mousemove", function(event) {
			cursorX = event.clientX - canvas.offsetLeft;
			cursorY = event.clientY - canvas.offsetTop;
		});

		canvas.addEventListener("click", function(event) {
			spawnBullet(ship.x + 10, ship.y);
		})

		last_time = 0;
		spawn_time = 0;

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
		moveShip(cursorX, cursorY);

		var now = Date.now();

		if ((now - last_time) >= spawn_time) {
			spawnAsteroid();
			last_time = now;
			spawn_time = Math.random() * (1500 - 800) + 800;
		}

		for(var a in asteroids) {
			asteroids[a].y += asteroids[a].speed;
			if (asteroids[a].y >= MAX_HEIGHT) {
				asteroids[a].destroy = true;
			}
		}

		for(var b in bullets) {
			bullets[b].y -= bullets[b].speed;
			if (bullets[b].y <= 0) {
				bullets[b].destroy = true;
			}
		}

		for(var b2 in bullets) {
			for(var a2 in asteroids) {
				if (checkCollision(asteroids[a2], bullets[b2])) {
					bullets[b2].destroy = true;
					asteroids[a2].destroy = true;
					// console.log("BOOM!");
				}
			}
		}

		var new_asteroids = [];
		for(var c in asteroids) {
			if (!asteroids[c].destroy) {
				new_asteroids.push(asteroids[c]);
			}
		}
		asteroids = new_asteroids;

		var new_bullets = [];
		for(var d in bullets) {
			if (!bullets[d].destroy) {
				new_bullets.push(bullets[d]);
			}
		}
		bullets = new_bullets;
	}

	function render() {
		clear();
		ship.draw(ctx);

		for(var a in asteroids) {
			asteroids[a].draw(ctx);
		}

		for(var b in bullets) {
			bullets[b].draw(ctx);
		}
	}

	function clear() {
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
	}

	function spawnAsteroid() {
		var randomX = Math.floor(Math.random() * (MAX_WIDTH - 70));
		var randomSize = Math.floor(Math.random() * (80 - 50) + 50);
		var speed;
		if(randomSize >= 70) {
			speed = 1;
		}
		else if (randomSize >= 60) {
			speed = 2;
		}
		else {
			speed = 3;
		}
		asteroids.push(spawnObject(randomX, -randomSize, randomSize, randomSize, speed, "asteroid.png"));
	}

	function spawnBullet(originX, originY) {
		bullets.push(spawnObject(originX, originY, 32, 32, 25, "bullet.png"));
	}

	function moveShip(mouseX, mouseY) {
		var cursorX = mouseX - ship.w/2;
		var cursorY = mouseY - ship.h/2;

		ship.vx = (cursorX >= ship.x) ? 1 : -1;
		ship.x += ship.vx * ship.speed;

		if(cursorX >= ship.x - ship.speed && cursorX <= ship.x + ship.speed) {
			ship.x = cursorX;
		}

		if (ship.x > MAX_WIDTH - ship.w) {
			ship.x = MAX_WIDTH - ship.w;
		}
		else if (ship.x < 0) {
			ship.x = 0;
		}

		ship.vy = (cursorY >= ship.y) ? 1 : -1;
		ship.y += ship.vy * ship.speed;
		
		if(cursorY >= ship.y - ship.speed && cursorY <= ship.y + ship.speed) {
			ship.y = cursorY;
		}

		if (ship.y > MAX_HEIGHT - ship.h) {
			ship.y = MAX_HEIGHT - ship.h;
		}
		else if (ship.y < 0) {
			ship.y = 0;
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
			destroy: false,
			draw: function(context) {
				context.drawImage(this.image, this.x, this.y, this.w, this.h);
			}
		};
	}

})();