(function() {
	console.log("hi!");

	var canvas, ctx, MAX_WIDTH, MAX_HEIGHT;

	window.addEventListener("DOMContentLoaded", function() {
		loadGlobal();
	});

	function loadGlobal() {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		MAX_WIDTH = canvas.width;
		MAX_HEIGHT = canvas.height;

		ctx.lineWidth = 125;
		// ctx.strokeStyle = "#FFF";
		ctx.strokeStyle = "rgba(1,1,1,1)";
		ctx.lineJoin = ctx.lineCap = 'round';

		var photo = document.createElement("img");
		photo.src = "colorfull.jpg";
		photo.addEventListener("load", function() {
			ctx.drawImage(photo, 0, 0, MAX_WIDTH, MAX_HEIGHT);
			ctx.globalCompositeOperation = "saturation";
			ctx.fillStyle = "#FFF";
			ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
			ctx.globalCompositeOperation = "destination-out";
		});
		
		canvas.addEventListener("mousemove", function(event) {
			mousePaint(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
		});
	}

	function clear() {
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
	}

	function mousePaint(mouseX, mouseY) {
		ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
	}

})();