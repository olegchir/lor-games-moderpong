var moderpong = {};
moderpong.pressedKeys = [];
moderpong.moderhead = {
    speed: 5,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
}

var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
}

$(function(){
    main();
});

function main() {
    moderpong.timer = setInterval(gameloop,30);

    $(document).keydown(function(e){
        moderpong.pressedKeys[e.which] = true;
    });
    $(document).keyup(function(e){
        moderpong.pressedKeys[e.which] = false;
    });
}


function gameloop() {
    moveModerhead();
    movePaddles();
}

function movePaddles() {
    if (moderpong.pressedKeys[KEY.UP]) {
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top",top-5);
    }
    if (moderpong.pressedKeys[KEY.DOWN]) {
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top",top+5);
    }
    if (moderpong.pressedKeys[KEY.W]) {
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top",top-5);
    }
    if (moderpong.pressedKeys[KEY.S]) {
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top",top+5);
    }
}

function moveModerhead() {
    // reference useful variables
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var moderhead = moderpong.moderhead;

    // check playground boundary
    // check bottom edge
    if (moderhead.y + moderhead.speed*moderhead.directionY > playgroundHeight)
    {
        moderhead.directionY = -1;
    }
    // check top edge
    if (moderhead.y + moderhead.speed*moderhead.directionY < 0)
    {
        moderhead.directionY = 1;
    }
    // check right edge
    if (moderhead.x + moderhead.speed*moderhead.directionX > playgroundWidth)
    {
        moderhead.directionX = -1;
    }
    // check left edge
    if (moderhead.x + moderhead.speed*moderhead.directionX < 0)
    {
        moderhead.directionX = 1;
    }
    moderhead.x += moderhead.speed * moderhead.directionX;
    moderhead.y += moderhead.speed * moderhead.directionY;

    $("#moderhead").css({
        "left" : moderhead.x,
        "top" : moderhead.y
    });
}