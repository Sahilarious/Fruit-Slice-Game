     var score = 0;
     var lives = 3;
     var livesLost = 0;
     var running = false;
     var fruits = ["images/apple.png", "images/banana.png", "images/cherries.png", "images/grapes.png", "images/mango.png", "images/orange.png", "images/peach.png", "images/pear.png", "images/watermelon.png"];
     var positionY;
     var fruitFall;
     var startPositionX;
     var sliceFruitAudio = new Audio('audio/slicefruit.mp3');
     var difficulty;
     console.log(difficulty);

     
     var start = function () {
       $("#startScreen").hide();
       $("#gameover").hide();
       score = 0;
       livesLost = 0;
       running = true;
       $("#reset").text("Reset Game");
       $("#scoreValue").text(score);
       refillLives();
       generateFruit();
     };
     
     var reset = function() {
       $("#startScreen").show();
       running = false;
       score = 0;
       $("#scoreValue").text(score);
       $("#lives").empty();
       $("#reset").text("Start");
       $("#gamePanel").empty();
     };
     
     var refillLives = function() {
       $("#lives").empty();
       for(j = 0; j < lives; j++)
         {
           $("#lives").append("<img class='heart' src='images/heart.png'>");
         }
     };

     var startResetButton = function() {
       if (running == false)
         {
           start();
         }
       else if (running == true)
         {
           reset();
         }
       
     };
     
     var takeLife = function() {
       if(livesLost < 3)
         {
           $("#lives img:last-child").remove();
           livesLost++;
           if (livesLost == 3)
           {
             $("#gameover").show();
             $("#gameover p:last-child").text("Your score is " + score);
             reset();
           }
         }
     };
     
     var fruitClick = function() {
       if (running == true)
         {
           sliceFruitAudio.play();
           score++;
           $("#scoreValue").text(score);
     
           $(this).hide("explode");
           clearInterval(fruitFall);
           setTimeout(function() {
             generateFruit();
           }, 500);
         }
       else
       {
         clearInterval(fruitFall);
         reset();
         
       }

     };
     
     var generateFruit = function() {
//       $("#gamePanel").empty();
       
       var fruitType = Math.floor(Math.random() * fruits.length);
       $("#gamePanel").append('<image class="fruit"  ' + 'src=' + fruits[fruitType] + '>');
       
       //resets vertical position of .fruit to origin
       positionY = -60;
       
       //randomly generate the horizontal position of the new .fruit       
       startPositionX = Math.floor(Math.random() * 500);
       
       $(".fruit").css({"left":  startPositionX + "px"});
       
       fruitInterval();

     };
     
     var fruitInterval = function()
     {
         fruitFall = setInterval(function() {

         positionY = positionY + 1*difficulty;
         $(".fruit").css({"top": positionY + "px"});
         if (positionY > 350 && running == true)
         {
           takeLife();
           clearInterval(fruitFall);
           $("#gamePanel").empty();
           generateFruit();
         }
         else if (running == false)
         {
           clearInterval(fruitFall);
           $("#gamePanel").empty();
           reset();
         } 
       }, 5);
       
     }
     
     var changeDifficulty = function() {
       difficulty = $('input[name=difficulty]:checked').val();
     }
     
     
     $(document).ready(function() {
       bgMusic.play();
       $("#reset").on("click", startResetButton);
       $("#r2").attr('checked', true);
       difficulty = parseFloat($('input[name=difficulty]:checked').val());


       $('input[name=difficulty]').on('change', changeDifficulty);
       $("#gamePanel").on("mousedown", ".fruit", fruitClick);
 
     });
    
    