
$(".simon-says-game").hide(); 

$("#introduction-box").hide();

$("#instruction-box").hide();





var enterCount = 0; 

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
    }
  }  
});








