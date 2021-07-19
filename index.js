var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keypress", function() {
    if (started != true){
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level " + level);
    var num = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[num];
    gamePattern.push(randomChosenColor);
    console.log("game: ", gamePattern);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    currentLevel = userClickedPattern.length -1;
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    checkAnswer(currentLevel);
});

function checkAnswer(currentLevel) {
    console.log("user: ", userClickedPattern);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence(),1000);
        }
    } else {
        playSound("wrong");
        $("body").toggleClass("game-over");
        $("#level-title").text("Wrong answer! Press any key to restart");
        startOver();
        setTimeout(function() {
            $("body").toggleClass("game-over")
        },200);
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}

function playSound(color) {
    var audio = new Audio(color + ".mp3");
    audio.play();
}

function animatePressed(color) {
    $("#" + color).toggleClass("pressed");
    setTimeout(function () {
        $("#" + color).toggleClass("pressed")
    },100);
}

