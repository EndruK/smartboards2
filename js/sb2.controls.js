// Possible edit modes: DRAWING, ERASING, SELECTING, TRANSFORMING
edit_mode = "DRAWING";
default_edit_mode = "SELECTING";

$(document).on("keydown", function (evt) {

    var key = (String.fromCharCode(evt.keyCode)).toLowerCase();

    if (key == 'd') {

        set_edit_mode("DRAWING");
        $('#controls #pen').addClass('selected');

    } else if (key == 'e') {

        set_edit_mode("ERASING");
        $('#controls #eraser').addClass('selected');

    } else if (key == 'c') {

        set_edit_mode("SELECTING");
        $('#controls #cursor').addClass('selected');

    } else if (key == 't') {

        set_edit_mode("TRANSFORMING");
    } else if (key == 'i') {

        imageUrlPrompt();

    } else if (key == 'p') {

        project.clear();
        view.update();

    } else if (key == 'o') {

        upload_canvas();

    } else if (evt.keyCode == 46) { // Delete key
		remove_selected_items();
		hide_floatie();
		view.update();
	} else {

        console.log(evt.keyCode)
        //return false;
    }

});

$(document).ready(function() {
    $('#controls #pen').click(function(){set_edit_mode("DRAWING")});
    $('#controls #eraser').click(function(){set_edit_mode("ERASING")});
    $('#controls #cursor').click(function(){set_edit_mode("SELECTING")});

    set_edit_mode(default_edit_mode);
});


function hide_controls(){
    $('#controls').addClass('hidden');
    close_pen_thickness_controls();
    close_color_picker_controls();
}


function show_controls(){
    $('#controls').removeClass('hidden');
}


function imageUrlPrompt(){
    var url = prompt("Please enter image url", "image url");

    if (url != null) {
        var new_img = new Raster(url);
        new_img.position = view.center;
    }
}

// TODO: TIDY THIS UP!
function set_edit_mode(new_edit_mode){

    hide_floatie();

    edit_mode = new_edit_mode;

    // adjust touch & mouse sensitivity
    // min_delta_touch = (edit_mode == "DRAWING") ? 4 : 1;

    // potentially cancel all selection procedures
    if (edit_mode == "DRAWING" || edit_mode == "ERASING"){
        project.deselectAll();
        remove_selection_rects();
		view.update();
    }

    $('#controls div').removeClass('selected');
    $('#controls #pen').toggleClass('selected', edit_mode == "DRAWING");
    $('#controls #eraser').toggleClass('selected', edit_mode == "ERASING");
    $('#controls #cursor').toggleClass('selected', edit_mode == "SELECTING");

    //view.update();
}