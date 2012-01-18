var moderpong = {};
moderpong.pressedKeys = [];
moderpong.moderhead = {
    speed:5,
    x:150,
    y:100,
    directionX:1,
    directionY:1
}

var KEY = {
    UP:38,
    DOWN:40,
    W:87,
    S:83
}

$(function () {
    main();
});

function main() {
    moderpong.timer = setInterval(gameloop, 30);

    $(document).keydown(function (e) {
        moderpong.pressedKeys[e.which] = true;
    });
    $(document).keyup(function (e) {
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
        $("#paddleB").css("top", top - 5);
    }
    if (moderpong.pressedKeys[KEY.DOWN]) {
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top", top + 5);
    }
    if (moderpong.pressedKeys[KEY.W]) {
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top", top - 5);
    }
    if (moderpong.pressedKeys[KEY.S]) {
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top", top + 5);
    }
}

function moveModerhead() {
    // reference useful variables
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var moderhead = moderpong.moderhead;

    // check playground boundary
    // check bottom edge
    if (moderhead.y + moderhead.speed * moderhead.directionY > playgroundHeight) {
        moderhead.directionY = -1;
    }
    // check top edge
    if (moderhead.y + moderhead.speed * moderhead.directionY < 0) {
        moderhead.directionY = 1;
    }

    // check right edge
    if (moderhead.x + moderhead.speed * moderhead.directionX > playgroundWidth) {
        // player B lost.    
        // reset the moderhead;
        moderhead.x = 250;
        moderhead.y = 100;
        $("#moderhead").css({
            "left":moderhead.x,
            "top":moderhead.y
        });
        moderhead.directionX = -1;
    }

    // check left edge
    if (moderhead.x + moderhead.speed * moderhead.directionX < 0) {
        // player A lost.    
        // reset the moderhead;
        moderhead.x = 150;
        moderhead.y = 100;
        $("#moderhead").css({
            "left":moderhead.x,
            "top":moderhead.y
        });
        moderhead.directionX = 1;
    }

    moderhead.x += moderhead.speed * moderhead.directionX;
    moderhead.y += moderhead.speed * moderhead.directionY;

    // check left paddle
    var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));
    if (moderhead.x + moderhead.speed * moderhead.directionX < paddleAX) {
        if (moderhead.y + moderhead.speed * moderhead.directionY <= paddleAYBottom &&
            moderhead.y + moderhead.speed * moderhead.directionY >= paddleAYTop) {
            moderhead.directionX = 1;
        }
    }
    // check right paddle
    var paddleBX = parseInt($("#paddleB").css("left"));
    var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    var paddleBYTop = parseInt($("#paddleB").css("top"));
    if (moderhead.x + moderhead.speed * moderhead.directionX >= paddleBX) {
        if (moderhead.y + moderhead.speed * moderhead.directionY <= paddleBYBottom &&
            moderhead.y + moderhead.speed * moderhead.directionY >= paddleBYTop) {
            moderhead.directionX = -1;
        }
    }

    $("#moderhead").css({
        "left":moderhead.x,
        "top":moderhead.y
    });
}