var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function (e) { 
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
    
     
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1 )
});

function nextSequence() {
    userClickedPattern = [];

    level++;

    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass('pressed');  
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 500);
        }
    } else {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass('game-over');  
        }, 1000);
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("#level-title").text("Game-over! press any key to restart!");
        gameOver()
    }
}

function gameOver(){
    started = false;
    level = 0;
    gamePattern = [];
}