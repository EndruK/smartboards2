// TODO: STILL NEED TO REFACTOR MOST GIF CODE INTO HERE

// small hack to re-update gifs after 5 second
// this is because they don't know their size before they load, and so are displaced incorrectly
$(document).ready(function(){
    window.setTimeout(update_gifs, 1000);

    // a little string contains function
    if (typeof String.prototype.contains === 'undefined') {
		String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
	}
});

function update_gifs(){

	// first empty the gif_container layer
	$('#gifLayer').empty();

	// find all Gifs in project, very simple method, prone to failure
	gif_items = project.getItems({
		class : Raster,
		_image : function(val){
			return val ? $(val).attr("src").contains(".gif") : false;
		}
	});

	// then for each gif raster, make an HTML image copy
	_.each(gif_items.reverse(), function(gif,i){

		var img = $('<img>').attr('src', $(gif._image).attr("src"));
		var gm = gif.getGlobalMatrix();

		// add the image to the dedicated gif layer and copy transform
		img.appendTo('#gifLayer');
		img.css({
			position: "absolute",
			// left: -gif._size.width/2+"px",
			// top: -gif._size.height/2+"px",
			transform:  "matrix("+gm._a+","+gm._c+","+gm._b+","+gm._d+","+gm._tx+","+gm._ty+") translate(-50%,-50%)",
			transformOrigin: "0% 0%"
		})

		// on loading an image, offset it by its size
		// img.load(function() {
		// 	$(this).css({ left: -$(this).width/2+"px", top: -$(this).height/2+"px", })
		// });
	});

	show_gifs();
}

function hide_gifs(){
	$('#gifLayer').hide();
}

function show_gifs(){
	$('#gifLayer').show();
}