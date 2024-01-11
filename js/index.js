
$(".simon-says-game").hide(); 

$("#introduction-box").hide();

$("#instruction-box").hide();

var enterCount = 0; 




var theNewGame = new NewGame();


 setTimeout(() =>
 {
    $("#introduction-box").fadeIn();
 }, "500");


$(document).on("keydown", function(event)
{
    if(event.keyCode == "13" && enterCount === 0)
    {
        $("#introduction-box").slideUp();
        setTimeout(() =>
        {
            enterCount+=1;
            $("#instruction-box").fadeIn();
        }, "500");
        
    }
    
});

$(document).on("keydown", function(event)
{
    if(event.keyCode == "13" && enterCount === 1)
    {
        $("#instruction-box").fadeOut();
        setTimeout(() =>
        {
            $(".introduction").hide();
        }, "500");
        setTimeout(() =>
        {
            enterCount+=1;
            $(".simon-says-game").fadeIn();
        }, "1000");
    }   
});




$(document).on("keydown", function(event)
{
    if(event.keyCode == "13" && enterCount === 2 && !theNewGame.gameInMotion)
    {
        theNewGame.gameInMotion = true;
        theNewGame.begin(); 
    } 
});



















