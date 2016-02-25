(function() {

	window.startColorGame = function(canvas) {
		var MAX_WIDTH = canvas.width;
		var MAX_HEIGHT = canvas.height;
		canvas.style.background = "url('colorfull.jpg')";
		canvas.style.backgroundSize = "935px 465px";

		var ctx = canvas.getContext("2d");
		ctx.lineWidth = 125;
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
			ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    	ctx.stroke();
		});
	};

})();