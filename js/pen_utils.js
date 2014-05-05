// make the paper scope global, by injecting it into window:
paper.install(window);

// keep track of touches
var currentTouches = [];  // touches currently active on this frame
var previousTouches = []; // touches that registered last frame

var min_delta = 4;

var path;

var strokes = [];

var SPEED_THRESH = 4;

var SPEED_MIN = 4,
    SPEED_MAX = 10;

var speed_histories = [];
var speed_history_length = 8;

var first_drags = true;

function speed_to_thickness(speed, speed_history_idx){

    speed_history = speed_histories[speed_history_idx];

    // if no history exists for that stroke, create one
    if (!speed_history){
        speed_history = speed_histories[speed_history_idx] = [];
        for(var i = 0; i < speed_history_length; i++)
            speed_history[i] = speed;
        console.log(speed)
    }   

    speed_history.shift();
    speed_history.push(speed);

    var sum = 0;
    for(var i = 0; i < speed_history.length; i++)
        sum += parseInt(speed_history[i]);
    
    return 12-(sum/speed_history.length);
}

function draw_dot(point){

    var path = new Path();
    path.fillColor = '#00000';
    path.closed = true;
    var center = new Point(point.pageX, point.pageY);
    
    for (var i = 0; i < 6; i++) {
        var delta = new Point({
            length: (10 * 0.7) + (Math.random() * 10 * 0.3),
            angle: (360 / 6) * i
        });
        path.add(center.add(delta));
    }
    path.smooth();
}