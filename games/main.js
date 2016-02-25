window.addEventListener("DOMContentLoaded", function() {
	document.getElementById("color").addEventListener("click", function() {
		var footer = document.getElementsByTagName("footer")[0];
		footer.innerHTML = "Credit: <i>Heaven and Hell</i>, by <a href='http://jay-peg.deviantart.com/' target='_blank'>jay-peg</a>";
		window.stopAll();
		window.startColorGame(replaceCanvas());
	});

	document.getElementById("mouse").addEventListener("click", function() {
		var footer = document.getElementsByTagName("footer")[0];
		footer.innerHTML = "";
		window.stopAll();
		window.startMouseGame(replaceCanvas());
	});

	document.getElementById("space").addEventListener("click", function() {
		var footer = document.getElementsByTagName("footer")[0];
		footer.innerHTML = "";
		window.stopAll();
		window.startSpaceGame(replaceCanvas());
	});

	document.getElementById("lander").addEventListener("click", function() {
		var footer = document.getElementsByTagName("footer")[0];
		footer.innerHTML = "";
		window.stopAll();
		window.startLanderGame(replaceCanvas());
	});
});

function stopAll() {
	window.stopMouseGame();
	window.stopSpaceGame();
	window.stopLanderGame();
}

function replaceCanvas() {
	var container = document.getElementById("container");
	var old_canvas = document.getElementById("canvas");
	var new_canvas = document.createElement("canvas");
	new_canvas.width = "935";
	new_canvas.height = "465";
	new_canvas.id = "canvas";

	if(old_canvas !== null) {
		container.removeChild(old_canvas);
	}

	container.appendChild(new_canvas);
	return new_canvas;
}