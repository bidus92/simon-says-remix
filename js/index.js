
$(".simon-says-game").hide(); 

$("#introduction-box").hide();

$("#instruction-box").hide();



//the enter count
var enterCount = 0; 
//theGame object itself
const theNewGame = new NewGame();


 setTimeout(function()
 {
    $("#introduction-box").fadeIn();
 }, "500");


$(document).on("keydown", function(event)
{
  if(event.keyCode == "13")
  {
    switch(enterCount)
    {
        case 0: 
            $("#introduction-box").slideUp();
            setTimeout(function()
            {
                $("#instruction-box").fadeIn();
                enterCount+=1;
            }, "500");
        break;
        case 1: 
            $("#instruction-box").fadeOut();
            setTimeout(() =>
            {
                $(".introduction").hide();
            }, "500");
            setTimeout(() =>
            {
                $(".simon-says-game").fadeIn();
                enterCount+=1;
            }, "1000");
        break;
        case 2: 
            enterCount+=1;
            theNewGame.begin();
            setTimeout(()=>
            {   
                theNewGame.run();
            }, "3000");  
        default:
            if(theNewGame.gameIsOver)
            {
                theNewGame.begin();
                setTimeout(()=>
                {   
                    theNewGame.run();
                }, "3000"); 
            }
    }
}
});



//Mobile Switches

if(theNewGame.screenWidth <= 430)
{
    $(document).on("click", function()
    {
        switch(enterCount)
        {
            case 0: 
                $("#introduction-box").slideUp();
                setTimeout(function()
                {
                    $("#instruction-box").fadeIn();
                    enterCount+=1;
                }, "500");
            break;
            case 1: 
                $("#instruction-box").fadeOut();
                setTimeout(() =>
                {
                    $(".introduction").hide();
                }, "500");
                setTimeout(() =>
                {
                    $(".simon-says-game").fadeIn();
                    enterCount+=1;
                }, "1000");
            break;
            case 2: 
                enterCount+=1;
                theNewGame.begin();
                setTimeout(()=>
                {   
                    theNewGame.run();
                }, "3000"); 
            default:
            if(theNewGame.gameIsOver)
            {
                theNewGame.begin();
                setTimeout(()=>
                {   
                    theNewGame.run();
                }, "3000"); 
            } 
        }
    }); 

   $(".press-command-1").text("Tap the screen to continue!");
   $(".press-command-2").text("Tap the screen and good luck!");
   $("#simon-says-instructions").text("Tap Screen to Play!");
}








