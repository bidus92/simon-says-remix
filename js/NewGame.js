var theClicks = 1; //global variable to track click counter (which will also track order count in effect)
var outOfOrder = false; //global outOfOrder variable 

//NOTE: FUNCTION CALLBACK DOESN'T WORK TO TRIGGER GAME OVER FUNCTION 
//BECAUSE IT IS A PART OF THE NEW GAME FUNCTION NOT THE COLOR BOX FUNCTION
//IN OTHER WORDS, THEY AREN'T CONNECTED AND RESULTS IN AN EMPTY CALL
//
function TheColor(color, colorIndex) 
{
    this.theColorIndex = colorIndex;
    this.color  = color; //color being highlighted
    this.order = []; //tracks real order of the squares to hit
    this.orderClicked = []; //tracks the actual order of boxes clicked

    this.trackTheClicks = ()=>
    { 
      if(!outOfOrder)
      {
        this.orderClicked.push(theClicks);
        console.log("We are at " + theClicks + " clicks");
        theClicks++;    
        this.checkTheClick(); 
      }
       
    }

    this.resetClicks = ()=>
    {
        this.orderClicked = [];
    }

    this.checkTheClick = ()=>
    {
        for(var x = 0; x < this.order.length + 1; x++)
        {
            if(this.orderClicked[x] != this.order[x] && !outOfOrder)
            {
                console.log("THIS IS OUT OF ORDER!");
                outOfOrder = true; 
                break; 
            }
        }
    }

    

    //function that plays out if click event took place 
    this.boxClick = ()=>
    {
        if(!outOfOrder)
        {
            this.color.addClass("the-press");
            setTimeout(()=>
            {
                this.color.removeClass("the-press");  
            }, "50");   
        }
    }

    this.activateAnimation = ()=>
    {
        this.color.on("click", this.trackTheClicks);
        this.color.on("click", this.boxClick);
    }
}

class NewGame
{
    constructor()
    {
       //intervalIDs
       this.levelIntervalID; 
       this.levelUpIntervalID; 
       this.mainGameLoopIntervalID; 
       this.levelShown = false; 
       this.levelWon = true; //Bool to determine level win
       this.timer = new Timer(); 
       this.level = 1; 
       this.colors = $(".simon-says-box");
       this.allColors = [new TheColor($("#green-box")), new TheColor($("#yellow-box")), new TheColor($("#red-box")), new TheColor($("#pink-box"))];
       this.startColor = Math.floor(Math.random() * 4);
       this.newColor = 0; 
       this.colorIndex = 0; 
       this.clickOrder = 0; 
       this.colorBuffer = [this.startColor];
       this.running = false;
       this.reroll = function()
       {
           var theNewColor = Math.floor(Math.random() * 4);
           return theNewColor; 
       }
       
        //adds numerical click order of boxes: logic should be if click count doesn't match, we donezo
        this.setBoxOrder = (x)=>
        {
            if(!this.allColors[this.colorBuffer[x]].order.includes(x + 1))
            {
                this.allColors[this.colorBuffer[x]].order.push(x + 1); 
            }
        }


//track clicks through boolean, and if the bool is true, 
//then that click index is added to order clicked. If the order clicked and order don't match...game over SON!
       
       
       //the indicator of what to press
       this.flash = function(x)
       {
            this.allColors[this.colorBuffer[x]].color.addClass("the-flash");
            setTimeout(()=>
            {
                this.allColors[this.colorBuffer[x]].color.removeClass("the-flash");  
            }, "500");
       }
       
       //the level logic
       this.theLevel = function (x)
       {
            if(x < this.colorBuffer.length)
            {
                this.flash(x);
                this.setBoxOrder(x);
                this.colorIndex++; 
            }
            else
            {
                this.colorIndex = 0;
                this.levelShown = true;
            }  
        } 

        this.resetTheClicks = ()=>
        {
            theClicks = 1; 
        }
        
       //Did the player win? 
       this.verdict = ()=>
       {
         this.levelUpIntervalID = setInterval(()=>
         {
            if(!outOfOrder && !this.timer.timesUp && this.levelWon)
            {
                for(var x = 0; x < this.allColors.length; x++)
                {
                    this.allColors[x].resetClicks(); 
                }
                this.resetTheClicks(); 
                this.levelUp();
                this.newColor = this.reroll()
                this.colorBuffer.push(this.newColor)
                this.colorIndex = 0; 
                this.timer.resetTimer();  
                this.levelShown = false;
            }
            else
            {
                this.running = false; 
                clearInterval(this.levelUpIntervalID); 
                clearInterval(this.mainGameLoopIntervalID); 
                $("#simon-says-instructions").text("Game Over");
            }     
         }, "10000")           
       }

       this.levelUp = ()=>
       {
         this.level++; 
       }
       
       //main game loop
       this.mainGameLoop = function ()
       { 
            this.mainGameLoopIntervalID = setInterval(()=>
            {
                    $("#simon-says-instructions").text("level " + this.level);
                    if(!this.levelShown)
                    {
                        this.theLevel(this.colorIndex);
                    }
                    this.timer.runTimer();
                    //set timeout for timer count
            }, "1000");   
       }
    
       this.begin = function ()
       {
           this.timer.hideTimer(); 
           $("#simon-says-instructions").css({"fontSize": "3rem"});
           $("#simon-says-instructions").text("3");
           this.running = true;

           setTimeout(function ()
           {
               $("#simon-says-instructions").text("2");
           }, "1000");
           setTimeout(function ()
           { 
               $("#simon-says-instructions").text("1");
           },"2000");
        }
        

        this.run = function ()
        {
            if(this.running)
            {
                this.mainGameLoop(); 
                for(var x = 0; x < this.allColors.length; x++)
                {
                    this.allColors[x].activateAnimation();
                    if(outOfOrder)
                    {
                        this.running = false; 
                        clearInterval(this.levelUpIntervalID); 
                        clearInterval(this.mainGameLoopIntervalID); 
                        $("#simon-says-instructions").text("Game Over");
                        break;
                    }
                }
                if(!outOfOrder)
                {
                    this.verdict(); 
                }
                
            }
        }
    }
}