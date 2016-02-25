(function() {

	function startColorGame(canvas) {
		canvas.style.background = "url('colorfull.jpg')";
		canvas.style.backgroundSize = "935px 465px";

		var MAX_WIDTH = canvas.width;
		var MAX_HEIGHT = canvas.height;
		
		var footer = document.getElementsByTagName("footer")[0];
		footer.innerHTML = "Credit: <i>Heaven and Hell</i>, by <a href='http://jay-peg.deviantart.com/' target='_blank'>jay-peg</a>";

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
			mousePaint(ctx, event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
		});
	}

	function mousePaint(context, mouseX, mouseY) {
		context.lineTo(mouseX, mouseY);
    context.stroke();
	}

	window.startColorGame = startColorGame;

})();