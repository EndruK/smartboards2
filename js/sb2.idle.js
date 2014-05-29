// make the paper scope global, by injecting it into window:
paper.install(window);

var is_idle = true;

var idle_timeout = moment.duration(20, 'seconds');

function set_busy(){
    if(is_idle){
        show_controls();
        is_idle = false;
    }
}

function set_idle(){

    // can only be idle if no mouse or touches are active
    if ((getNumberOfTouches() == 0) && !isMouseDown){
        is_idle = true;
        set_edit_mode(default_edit_mode);
        hide_controls();
    }
}


$(document).ready(function(){

    var canvas = document.getElementById('myCanvas');

    var debounced_set_idle = _.debounce(set_idle, idle_timeout.asMilliseconds());

    // set busy on any activity (moving mouse)
    canvas.addEventListener("touchmove",  set_busy);
    canvas.addEventListener("mousemove",  set_busy);
    canvas.addEventListener("touchstart", set_busy);
    canvas.addEventListener("mousedown",  set_busy);

    // after a time has passed with no movement
    canvas.addEventListener("mouseup",    debounced_set_idle);
    canvas.addEventListener("mouseout",   debounced_set_idle);
    canvas.addEventListener("touchend",   debounced_set_idle);
    canvas.addEventListener("touchleave", debounced_set_idle);
    canvas.addEventListener("touchmove",  debounced_set_idle);
    canvas.addEventListener("mousemove",  debounced_set_idle);
});