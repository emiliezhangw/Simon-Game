var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1); 
})

function checkAnswer(currLevel) {
    if (userClickedPattern[currLevel] === gamePattern[currLevel]){
        //console.log("success");
        if (currLevel === gamePattern.length - 1) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        } 
    } else {
        // console.log("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        
        startOver();
    }

}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();   
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}