window.addEventListener("DOMContentLoaded", function() {
	document.getElementById("color").addEventListener("click", function() {
		window.startColorGame(replaceCanvas());
	});
});

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