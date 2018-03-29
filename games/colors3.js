(function() {

	window.startColorGame = function(container_id, width, height, image) {
		var container = document.getElementById(container_id);
		var canvas = document.createElement("canvas");
		container.appendChild(canvas);
		canvas.height = height;
		canvas.width = width;
		var MAX_WIDTH = canvas.width;
		var MAX_HEIGHT = canvas.height;
		canvas.style.backgroundSize = width + "px " + height + "px";
		// canvas.style.position = "relative";
		// container.style.position = "relative";

		var canvas_color = "#000";
		var draw = false;
		var x, y;

		var ctx = canvas.getContext("2d");
		ctx.lineWidth = 50;
		ctx.lineJoin = ctx.lineCap = 'round';
		ctx.strokeStyle = canvas_color;
		ctx.save();

		var photo = document.createElement("img");
		photo.src = image;
		photo.addEventListener("load", function() {
			reset();
		});

		function reset() {
			ctx.fillStyle = "#FFF";
			ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
			ctx.drawImage(photo, 0, 0, MAX_WIDTH, MAX_HEIGHT);
		}

		canvas.addEventListener("mousedown", function(event) {
			draw = true;
			x = event.clientX - canvas.offsetLeft;
			y = event.clientY - canvas.offsetTop;
		});

		canvas.addEventListener("mouseleave", function(event) {
			draw = false;
		});

		canvas.addEventListener("mouseup", function(event) {
			draw = false;
		});
		
		canvas.addEventListener("mousemove", function(event) {
			if (draw) {
				ctx.restore();
				ctx.beginPath();
				ctx.strokeStyle = canvas_color;
				ctx.moveTo(x, y);
				x = event.clientX - canvas.offsetLeft;
				y = event.clientY - canvas.offsetTop;
				ctx.lineTo(x, y);
				ctx.stroke();
				ctx.closePath();
				ctx.save();
				ctx.drawImage(photo, 0, 0, MAX_WIDTH, MAX_HEIGHT);
			}
		});

		function makeButton(x, y, color) {
			var colorbutton = document.createElement("div");
			colorbutton.id = "colorbutton_" + color;
			colorbutton.style.width = "25px";
			colorbutton.style.height = "25px";
			colorbutton.style.backgroundColor = color;
			colorbutton.style.border = "1px solid #000";
			colorbutton.style.position = "absolute";
			colorbutton.style.top = x+"px";
			colorbutton.style.left = y+"px";
			colorbutton.style.zIndex = "999";
			colorbutton.addEventListener("click", function() {
				canvas_color = color;
			});
			container.appendChild(colorbutton);
		}

		makeButton(20, 20, "#000");
		makeButton(20, 60, "#00F");
		makeButton(20, 100, "#F00");
	};

})();
