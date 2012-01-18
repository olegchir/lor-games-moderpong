var moderpong = {
    scoreA : 0,
    scoreB : 0
};
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
    alert("Earn 10 points. Fight!");

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
    checkWin();
}

function checkWin() {
    if (moderpong.scoreA>9 || moderpong.scoreB>9) {
        alert("JB WON!");
        location.reload();
    }
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
    // move the moderhead in every 30 milliseconds
    // reference useful varaibles
    var moderheadTop = parseInt($("#moderhead").css("top"));
    var moderheadLeft = parseInt($("#moderhead").css("left"));
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var moderhead = moderpong.moderhead;

    // check playground boundary
    // check bottom
    if (moderheadTop+moderhead.speed*moderhead.directionY > playgroundHeight)
    {
        moderhead.directionY = -1;
    }
    // check top
    if (moderheadTop+moderhead.speed*moderhead.directionY < 0)
    {
        moderhead.directionY = 1;
    }
    // check right
    if (moderheadLeft+moderhead.speed*moderhead.directionX > playgroundWidth)
    {
        // player B lost.		
        moderpong.scoreA++;
        $("#scoreA").html(moderpong.scoreA);

        // reset the moderhead;
        $("#moderhead").css({
            "left":"250px",
            "top" :"100px"
        });

        // update the moderhead location variables;
        moderheadTop = parseInt($("#moderhead").css("top"));
        moderheadLeft = parseInt($("#moderhead").css("left"));
        moderhead.directionX = -1;
    }
    // check left
    if (moderheadLeft + moderhead.speed*moderhead.directionX < 0)
    {
        // player A lost.		
        moderpong.scoreB++;
        $("#scoreB").html(moderpong.scoreB);

        // reset the moderhead;
        $("#moderhead").css({
            "left":"150px",
            "top" :"100px"
        });

        // update the moderhead location variables;
        moderheadTop = parseInt($("#moderhead").css("top"));
        moderheadLeft = parseInt($("#moderhead").css("left"));
        moderhead.directionX = 1;
    }

    // check moving paddle here, later.
    // check left paddle
    var paddleAX = parseInt($("#paddleA").css("left"))+parseInt($("#paddleA").css("width"));
    var paddleAYBottom = parseInt($("#paddleA").css("top"))+parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));
    if (moderheadLeft + moderhead.speed*moderhead.directionX < paddleAX)
    {
        if (moderheadTop + moderhead.speed*moderhead.directionY <= paddleAYBottom &&
            moderheadTop + moderhead.speed*moderhead.directionY >= paddleAYTop)
        {
            moderhead.directionX = 1;
        }
    }

    // check right paddle
    var paddleBX = parseInt($("#paddleB").css("left"));
    var paddleBYBottom = parseInt($("#paddleB").css("top"))+parseInt($("#paddleB").css("height"));
    var paddleBYTop = parseInt($("#paddleB").css("top"));
    if (moderheadLeft + moderhead.speed*moderhead.directionX >= paddleBX)
    {
        if (moderheadTop + moderhead.speed*moderhead.directionY <= paddleBYBottom &&
            moderheadTop + moderhead.speed*moderhead.directionY >= paddleBYTop)
        {
            moderhead.directionX = -1;
        }
    }


    // actually move the moderhead with speed and direction
    $("#moderhead").css({
        "left" : moderheadLeft + moderhead.speed * moderhead.directionX,
        "top" : moderheadTop + moderhead.speed * moderhead.directionY
    });
}