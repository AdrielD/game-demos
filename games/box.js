(function() {
	console.log("hi!");

	var canvas, context, MAX_WIDTH, MAX_HEIGHT;
	var box;

	window.addEventListener("DOMContentLoaded", function() {
		loadGlobal();
		requestAnimationFrame(loop);
	});

	function loadGlobal() {
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		MAX_WIDTH = canvas.width;
		MAX_HEIGHT = canvas.height;

		box = { color: "#F00", height: 50, width: 50, x: 0, y: 0, speed: 5, direction: 1 };
	}

	function loop() {
		update();
		render();

		requestAnimationFrame(loop);
	}

	function update() {
		if(box.x >= MAX_WIDTH - box.width) {
			box.direction = -1;
		}
		else if(box.x === 0) {
			box.direction = 1;
		}
		
		box.x += box.speed * box.direction;
	}

	function render() {
		clear();
		renderBox();
	}

	function renderBox() {
		context.fillStyle = box.color;
		context.fillRect(box.x, box.y, box.width, box.height);
	}

	function clear() {
		context.fillStyle = "#000";
		context.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
	}

})();