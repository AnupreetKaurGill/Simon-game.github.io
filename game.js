var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

var level = 0;

$(document).keypress(function(){
if(!started){

$("#level-title").text("level "+ level );
nextSequence();
started=true;

}

}
);




$(".btn").click(function(){

var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);

}  );




function checkAnswer(currentLevel){
//Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
console.log("success");
if(userClickedPattern.length===gamePattern.length){

setTimeout(function(){
  nextSequence();
},1000);
}

}

else{
  console.log("error");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
$("body").removeClass("game-over");
  },200);

  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}


}

function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
  //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  //Inside nextSequence(), update the h1 with this change in the value of level.
$("#level-title").text("level " + level);

 var randomNumber = Math.floor(Math.random() * 4);
 var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);


$("#" + randomChosenColour  ).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3" );
  audio.play();

}

function animatePress(currentColour){
$("#" + currentColour).addClass("pressed");

setTimeout(function(){
  $("#" + currentColour).removeClass("pressed");
}, 100);
}

function startOver(){
  level= 0;
  gamePattern=[];
  started=false;
}
