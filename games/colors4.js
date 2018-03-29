(function() {

	window.startColorGame = function(container_id, width, height, img1, img2) {
		var container = document.getElementById(container_id);
		var canvas = document.createElement("canvas");
		container.appendChild(canvas);
		canvas.height = height;
		canvas.width = width;
		var MAX_WIDTH = canvas.width;
		var MAX_HEIGHT = canvas.height;
		var on_canvas = false;
		canvas.style.background = "url("+img1+")";
		canvas.style.backgroundSize = width + "px " + height + "px";

		var mouseX = 0;
		var mouseY = 0;

		var ctx = canvas.getContext("2d");

		var photo = document.createElement("img");
		photo.src = img2;
		photo.addEventListener("load", function() {
			reset();
		});

		canvas.addEventListener("mousemove", function(event) {
			on_canvas = true;
			mouseX = event.clientX - canvas.offsetLeft;
			mouseY = event.clientY - canvas.offsetTop;
		});

		canvas.addEventListener("mouseleave", function(event) {
			on_canvas = false;
		});

		canvas.addEventListener("click", function(event) {
			paint();
		});

		function paint() {
			if (!on_canvas) return;
			var gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
			gradient.addColorStop(0, 'rgba(1,1,1,1)');
			gradient.addColorStop(0.6, 'rgba(1,1,1,0.8)');
			gradient.addColorStop(1, 'rgba(1,1,1,0)');
			ctx.beginPath();
			ctx.lineTo(mouseX, mouseY);
   		ctx.fillStyle = gradient;
			ctx.fillRect(mouseX - 300, mouseY - 300, 600, 600);
			ctx.closePath();
		}

		function reset() {
			ctx.globalCompositeOperation = "source-over";
			ctx.drawImage(photo, 0, 0, MAX_WIDTH, MAX_HEIGHT);
			ctx.globalCompositeOperation = "destination-out";
		}

		function loop() {
			reset();
			paint();
			requestAnimationFrame(loop);			
		}

		requestAnimationFrame(loop);
	};

})();
